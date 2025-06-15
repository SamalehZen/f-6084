

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

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

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    console.log('Starting PDF text extraction with Gemini...');

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Tu es un expert en extraction de texte à partir de documents PDF.

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

Assure-toi que le texte extrait est exploitable pour générer des questions de quiz pertinentes.

Analyse ce document PDF et extrait tout son contenu textuel:`
          },
          {
            inline_data: {
              mime_type: "application/pdf",
              data: pdfDataUri.split(',')[1] // Remove data:application/pdf;base64, prefix
            }
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 4000,
          response_mime_type: "application/json"
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.candidates[0].content.parts[0].text);

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

