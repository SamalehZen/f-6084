
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { pdfDataUri } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log('Starting PDF text extraction with OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Tu es un expert en extraction de texte à partir de documents PDF.

Analyse le document PDF fourni et extrait tout le contenu textuel de manière précise et structurée.

Instructions:
1. Extrait TOUT le texte visible dans le document PDF
2. Préserve la structure et la hiérarchie du contenu autant que possible
3. Ignore les éléments purement décoratifs
4. Si le PDF contient des tableaux, extrait le contenu de manière lisible
5. Si le PDF est scanné ou contient des images avec du texte, utilise OCR pour extraire le texte

Retourne le résultat au format JSON avec:
- extractedText: le contenu textuel complet du PDF
- success: true si l'extraction a réussi, false sinon
- error: message d'erreur si applicable

Assure-toi que le texte extrait est exploitable pour générer des questions de quiz pertinentes.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyse ce document PDF et extrait tout son contenu textuel:'
              },
              {
                type: 'image_url',
                image_url: {
                  url: pdfDataUri
                }
              }
            ]
          }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    console.log('PDF text extraction completed. Text length:', result.extractedText?.length || 0);

    return new Response(JSON.stringify({
      extractedText: result.extractedText || '',
      success: result.success || true,
      error: result.error
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in PDF text extraction:', error);
    return new Response(JSON.stringify({
      extractedText: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
