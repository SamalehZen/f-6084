import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple PDF text extraction function
async function extractTextFromPDF(pdfBuffer: Uint8Array): Promise<string> {
  try {
    // Convert buffer to string for basic text extraction
    const pdfText = new TextDecoder('utf-8', { ignoreBOM: true, fatal: false }).decode(pdfBuffer);
    
    // Extract text between 'stream' and 'endstream' markers (simplified PDF parsing)
    const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
    let extractedText = '';
    let match;
    
    while ((match = streamRegex.exec(pdfText)) !== null) {
      const streamContent = match[1];
      // Clean up the content - remove non-printable characters but keep text
      const cleanContent = streamContent
        .replace(/[^\x20-\x7E\n\r\t]/g, ' ') // Keep only printable ASCII + whitespace
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      if (cleanContent && cleanContent.length > 10) {
        extractedText += cleanContent + ' ';
      }
    }
    
    // Fallback: try to extract any readable text patterns
    if (!extractedText || extractedText.length < 50) {
      const textPatterns = pdfText.match(/[a-zA-Z][a-zA-ZÀ-ÿ\s]{10,}/g);
      if (textPatterns) {
        extractedText = textPatterns.join(' ').substring(0, 2000);
      }
    }
    
    // If still no content, return a message indicating the issue
    if (!extractedText || extractedText.length < 30) {
      return "Contenu PDF non lisible - le fichier pourrait être une image ou protégé. Veuillez utiliser un PDF avec du texte sélectionnable.";
    }
    
    // Limit text length for processing
    return extractedText.substring(0, 3000);
    
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return "Erreur lors de l'extraction du texte PDF. Veuillez réessayer avec un autre fichier.";
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { documentId, filePath } = await req.json()
    
    if (!documentId || !filePath) {
      throw new Error('Document ID and file path are required')
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Processing PDF:', filePath)

    // Download the PDF file from storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('documents')
      .download(filePath)

    if (downloadError) {
      throw new Error(`Failed to download file: ${downloadError.message}`)
    }

    // Convert file to buffer for processing
    const arrayBuffer = await fileData.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    const fileSize = uint8Array.length

    console.log('File size:', fileSize, 'bytes')

    // Extract actual text content from PDF
    const extractedContent = await extractTextFromPDF(uint8Array)
    console.log('Extracted content length:', extractedContent.length)
    console.log('Content preview:', extractedContent.substring(0, 200) + '...')

    // Estimate page count based on content and file size
    const estimatedPages = Math.max(1, Math.floor(fileSize / 50000))
    
    // Generate summary based on actual content
    let summary = '';
    if (extractedContent.length > 100) {
      // Take first few sentences as summary
      const sentences = extractedContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
      summary = sentences.slice(0, 3).join('. ').substring(0, 300) + (sentences.length > 3 ? '...' : '');
    } else {
      summary = "Document PDF traité. Contenu disponible pour la génération de quiz.";
    }

    // Update the document record with processed information including actual content
    const { error: updateError } = await supabaseClient
      .from('documents')
      .update({
        pages_count: estimatedPages,
        content_summary: summary,
        ocr_processed: true,
        updated_at: new Date().toISOString(),
        // Store the extracted content in a new column or use content_summary for full content
        file_content: extractedContent // We'll need to add this column or use existing one
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Update error:', updateError)
      // Try updating without file_content if column doesn't exist
      const { error: fallbackUpdateError } = await supabaseClient
        .from('documents')
        .update({
          pages_count: estimatedPages,
          content_summary: extractedContent.substring(0, 500), // Store content in summary for now
          ocr_processed: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId)

      if (fallbackUpdateError) {
        throw new Error(`Failed to update document: ${fallbackUpdateError.message}`)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        pages_count: estimatedPages,
        summary,
        content_length: extractedContent.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error processing PDF:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
