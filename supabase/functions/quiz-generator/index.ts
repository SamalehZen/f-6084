
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { documentId, settings } = await req.json()
    console.log('Generating quiz for document:', documentId, 'with settings:', settings)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Récupérer le document avec son contenu
    const { data: document, error: docError } = await supabaseClient
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (docError) {
      throw new Error(`Document not found: ${docError.message}`)
    }

    // Utiliser le vrai contenu du PDF
    let pdfContent = document.content_summary || '';
    
    console.log('Document title:', document.title)
    console.log('Content length:', pdfContent.length)
    console.log('Content preview:', pdfContent.substring(0, 300))
    
    // Vérifier si le contenu est valide et exploitable
    const isValidContent = pdfContent.length > 50 && 
                          !pdfContent.includes('Erreur lors de') &&
                          !pdfContent.includes('PDF traité mais') &&
                          !pdfContent.match(/^[^a-zA-ZÀ-ÿ\s]+$/);

    if (!isValidContent) {
      console.log('Invalid content detected, cannot generate meaningful quiz')
      throw new Error(`Le contenu du PDF n'est pas exploitable pour générer un quiz. 
                      Raison: ${pdfContent.length < 50 ? 'Contenu trop court' : 'Contenu illisible ou corrompu'}.
                      Veuillez essayer avec un PDF contenant du texte sélectionnable.`)
    }

    // Améliorer le prompt pour utiliser le vrai contenu
    const difficultyMap = {
      'facile': 'questions simples et directes basées sur les faits du document',
      'moyen': 'questions de niveau intermédiaire nécessitant une compréhension du contenu',
      'difficile': 'questions complexes nécessitant une analyse approfondie du contenu'
    };

    const typeMap = {
      'qcm': 'questions à choix multiples avec 4 options pertinentes',
      'vrai-faux': 'questions vrai/faux avec justification basée sur le contenu',
      'mixte': 'un mélange équilibré de questions QCM et vrai/faux'
    };

    const prompt = `
Tu es un expert pédagogique spécialisé dans la création de quiz éducatifs. 

CONTENU DU DOCUMENT À ANALYSER:
"""
${pdfContent}
"""

CONSIGNES STRICTES:
1. Génère exactement ${settings.questionCount || 5} questions basées UNIQUEMENT sur le contenu ci-dessus
2. Type de questions: ${typeMap[settings.questionType] || 'questions à choix multiples'}
3. Niveau de difficulté: ${difficultyMap[settings.difficulty] || 'questions de niveau moyen'}
4. Chaque question DOIT être directement extraite du contenu fourni
5. Les réponses incorrectes doivent être plausibles mais clairement distinguables de la bonne réponse
6. Les explications doivent citer des éléments précis du document

FORMAT DE RÉPONSE JSON OBLIGATOIRE:
{
  "questions": [
    {
      "id": "q1",
      "type": "${settings.questionType === 'mixte' ? 'qcm' : settings.questionType}",
      "question": "Question précise basée sur le contenu du document",
      "options": ${settings.questionType === 'vrai-faux' ? '["Vrai", "Faux"]' : '["Réponse correcte tirée du document", "Option plausible mais incorrecte", "Autre option incorrecte", "Dernière option incorrecte"]'},
      "correctAnswer": 0,
      "explanation": "Explication détaillée avec référence au contenu du document"
    }
  ]
}

IMPORTANT: 
- Réponds UNIQUEMENT avec le JSON valide, sans texte supplémentaire
- Assure-toi que toutes les questions sont pertinentes au contenu fourni
- Vérifie que les réponses sont cohérentes avec le document
`

    console.log('Sending improved prompt to Gemini with real PDF content...')

    // Appel à l'API Gemini avec le contenu réel
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${Deno.env.get('GEMINI_API_KEY')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3, // Plus bas pour plus de cohérence
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 2048,
        }
      })
    })

    if (!geminiResponse.ok) {
      throw new Error(`Gemini API error: ${geminiResponse.statusText}`)
    }

    const geminiData = await geminiResponse.json()
    console.log('Gemini response received')

    let quizData
    try {
      const generatedText = geminiData.candidates[0].content.parts[0].text
      console.log('Generated text preview:', generatedText.substring(0, 300))
      
      // Nettoyer le texte et extraire le JSON
      const cleanedText = generatedText.replace(/```json\s*|\s*```/g, '').trim()
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0])
        console.log('Successfully parsed quiz data with', quizData.questions?.length || 0, 'questions')
        
        // Valider que les questions sont basées sur le contenu
        if (quizData.questions && quizData.questions.length > 0) {
          console.log('Quiz generation successful with real content-based questions')
        } else {
          throw new Error('No valid questions generated')
        }
      } else {
        throw new Error('No valid JSON found in Gemini response')
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      throw new Error(`Impossible de générer un quiz cohérent à partir du contenu du PDF. 
                      Le contenu pourrait être trop technique ou mal structuré. 
                      Erreur technique: ${parseError.message}`)
    }

    // Sauvegarder le quiz en base
    const { data: quiz, error: quizError } = await supabaseClient
      .from('quizzes')
      .insert({
        document_id: documentId,
        user_id: document.user_id,
        title: `Quiz - ${document.title}`,
        settings: settings,
        questions: quizData.questions,
        is_published: false
      })
      .select()
      .single()

    if (quizError) {
      throw new Error(`Failed to save quiz: ${quizError.message}`)
    }

    console.log('Quiz generated successfully:', quiz.id, 'with', quizData.questions.length, 'content-based questions')

    return new Response(
      JSON.stringify({ 
        quiz, 
        questions: quizData.questions,
        contentUsed: pdfContent.substring(0, 200) + '...'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in quiz-generator:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
