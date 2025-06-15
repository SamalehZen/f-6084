
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

    // Utiliser le vrai contenu du PDF au lieu du contenu simulé
    let pdfContent = document.content_summary || '';
    
    // Si le content_summary est trop court, essayer de récupérer plus de contenu
    if (pdfContent.length < 100) {
      pdfContent = `Document: ${document.title}. Contenu minimal détecté. Génération de questions basiques.`;
    }

    console.log('Using PDF content:', pdfContent.substring(0, 200) + '...')

    // Améliorer le prompt pour utiliser le vrai contenu
    const difficultyMap = {
      'facile': 'questions simples et directes',
      'moyen': 'questions de niveau intermédiaire avec analyse',
      'difficile': 'questions complexes nécessitant une réflexion approfondie'
    };

    const typeMap = {
      'qcm': 'questions à choix multiples avec 4 options',
      'vrai-faux': 'questions vrai/faux avec justification',
      'mixte': 'un mélange de questions QCM et vrai/faux'
    };

    const prompt = `
Tu es un expert pédagogique. Génère exactement ${settings.questionCount || 5} questions basées UNIQUEMENT sur ce contenu PDF réel:

CONTENU DU PDF:
"${pdfContent}"

CONSIGNES STRICTES:
- Crée des ${difficultyMap[settings.difficulty] || 'questions de niveau moyen'}
- Type: ${typeMap[settings.questionType] || 'questions à choix multiples'}
- Les questions DOIVENT être basées sur le contenu fourni ci-dessus
- Ne pas inventer d'informations qui ne sont pas dans le contenu
- Si le contenu est insuffisant, créer des questions sur ce qui est disponible

Format de réponse JSON strict:
{
  "questions": [
    {
      "id": "q1",
      "type": "${settings.questionType === 'mixte' ? 'qcm' : settings.questionType}",
      "question": "Question basée sur le contenu PDF",
      "options": ${settings.questionType === 'vrai-faux' ? '["Vrai", "Faux"]' : '["Option A", "Option B", "Option C", "Option D"]'},
      "correctAnswer": 0,
      "explanation": "Explication basée sur le contenu du PDF"
    }
  ]
}

IMPORTANT: Réponds UNIQUEMENT avec le JSON, sans texte supplémentaire.
`

    console.log('Sending prompt to Gemini...')

    // Appel à l'API Gemini avec le vrai contenu
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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
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
      console.log('Generated text preview:', generatedText.substring(0, 200))
      
      // Nettoyer le texte et extraire le JSON
      const cleanedText = generatedText.replace(/```json\s*|\s*```/g, '').trim()
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0])
        console.log('Successfully parsed quiz data')
      } else {
        throw new Error('No valid JSON found in Gemini response')
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      
      // Fallback avec des questions basées sur le contenu disponible
      const fallbackQuestions = []
      const questionCount = Math.min(settings.questionCount || 5, 3)
      
      for (let i = 0; i < questionCount; i++) {
        if (settings.questionType === 'vrai-faux') {
          fallbackQuestions.push({
            id: `q${i + 1}`,
            type: "vrai-faux",
            question: `Selon le document "${document.title}", les informations présentées sont-elles exactes ?`,
            options: ["Vrai", "Faux"],
            correctAnswer: 0,
            explanation: `Basé sur le contenu extrait: ${pdfContent.substring(0, 100)}...`
          })
        } else {
          fallbackQuestions.push({
            id: `q${i + 1}`,
            type: "qcm",
            question: `Quelle est l'information principale du document "${document.title}" ?`,
            options: [
              "Information extraite du document",
              "Donnée non pertinente",
              "Contenu hors sujet", 
              "Information incorrecte"
            ],
            correctAnswer: 0,
            explanation: `Basé sur le contenu: ${pdfContent.substring(0, 150)}...`
          })
        }
      }
      
      quizData = { questions: fallbackQuestions }
    }

    // Valider que nous avons le bon nombre de questions
    if (!quizData.questions || quizData.questions.length === 0) {
      throw new Error('Aucune question générée')
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

    console.log('Quiz generated successfully:', quiz.id, 'with', quizData.questions.length, 'questions')

    return new Response(
      JSON.stringify({ quiz, questions: quizData.questions }),
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
