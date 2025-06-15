
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

    // Récupérer le document
    const { data: document, error: docError } = await supabaseClient
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .single()

    if (docError) {
      throw new Error(`Document not found: ${docError.message}`)
    }

    // Récupérer le contenu du fichier PDF (simulé pour le moment)
    const pdfContent = `Contenu du document: ${document.title}. Ce document contient des informations importantes sur le sujet traité.`

    // Préparer le prompt pour Gemini
    const prompt = `
Génère un quiz de ${settings.questionCount || 5} questions basé sur ce contenu PDF:

${pdfContent}

Paramètres:
- Difficulté: ${settings.difficulty || 'moyen'}
- Type de questions: ${settings.questionType || 'qcm'}
- Langue: français

Format de réponse JSON:
{
  "questions": [
    {
      "id": "q1",
      "type": "qcm",
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explication de la réponse"
    }
  ]
}

Assure-toi que:
- Les questions sont pertinentes au contenu
- Les réponses sont claires et précises
- Une seule réponse correcte par question QCM
- Inclus une explication pour chaque réponse
`

    // Appel à l'API Gemini
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
    console.log('Gemini response:', geminiData)

    let quizData
    try {
      const generatedText = geminiData.candidates[0].content.parts[0].text
      // Extraire le JSON de la réponse
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        quizData = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No valid JSON found in Gemini response')
      }
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      // Fallback avec des questions par défaut
      quizData = {
        questions: [
          {
            id: "q1",
            type: "qcm",
            question: `Question générée à partir du document "${document.title}"`,
            options: ["Option A", "Option B", "Option C", "Option D"],
            correctAnswer: 0,
            explanation: "Ceci est une question d'exemple générée automatiquement."
          }
        ]
      }
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

    console.log('Quiz generated successfully:', quiz.id)

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
