
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Improved PDF text extraction function
async function extractTextFromPDF(pdfBuffer: Uint8Array): Promise<string> {
  try {
    // Convert buffer to string for analysis
    const pdfText = new TextDecoder('latin1').decode(pdfBuffer);
    
    console.log('PDF buffer size:', pdfBuffer.length);
    console.log('PDF header check:', pdfText.substring(0, 10));
    
    // Check if it's a valid PDF
    if (!pdfText.startsWith('%PDF-')) {
      return "Fichier PDF invalide ou corrompu. Veuillez vérifier que le fichier est un PDF valide.";
    }
    
    let extractedText = '';
    
    // Method 1: Extract text from text objects (BT...ET blocks)
    const textObjectRegex = /BT\s+(.*?)\s+ET/gs;
    let textMatches = pdfText.match(textObjectRegex);
    
    if (textMatches) {
      for (const textBlock of textMatches) {
        // Extract text from Tj commands
        const tjRegex = /\((.*?)\)\s*Tj/g;
        let tjMatch;
        while ((tjMatch = tjRegex.exec(textBlock)) !== null) {
          const text = tjMatch[1];
          if (text && text.length > 1) {
            extractedText += text + ' ';
          }
        }
        
        // Extract text from TJ commands (array format)
        const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
        let tjArrayMatch;
        while ((tjArrayMatch = tjArrayRegex.exec(textBlock)) !== null) {
          const arrayContent = tjArrayMatch[1];
          // Extract strings from the array
          const stringRegex = /\((.*?)\)/g;
          let stringMatch;
          while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
            const text = stringMatch[1];
            if (text && text.length > 1) {
              extractedText += text + ' ';
            }
          }
        }
      }
    }
    
    // Method 2: Look for readable text patterns in the entire PDF
    if (extractedText.length < 50) {
      console.log('Method 1 failed, trying method 2...');
      
      // Find text between parentheses (common PDF text format)
      const parenthesesRegex = /\(([^)]+)\)/g;
      let match;
      while ((match = parenthesesRegex.exec(pdfText)) !== null) {
        const text = match[1];
        // Filter out obvious non-text content
        if (text.length > 2 && 
            !text.match(/^[0-9\s\.]+$/) && 
            !text.match(/^[^a-zA-ZÀ-ÿ]+$/) &&
            text.match(/[a-zA-ZÀ-ÿ]/)) {
          extractedText += text + ' ';
        }
      }
    }
    
    // Method 3: Search for readable words in the raw content
    if (extractedText.length < 50) {
      console.log('Method 2 failed, trying method 3...');
      
      // Look for sequences of readable characters
      const wordRegex = /[a-zA-ZÀ-ÿ]{3,}[\s\w\À-ÿ]*[a-zA-ZÀ-ÿ]/g;
      const words = pdfText.match(wordRegex);
      
      if (words) {
        // Filter and join meaningful words
        const meaningfulWords = words.filter(word => 
          word.length >= 3 && 
          word.length <= 50 &&
          !word.match(/^[^a-zA-ZÀ-ÿ]*$/)
        );
        
        if (meaningfulWords.length > 5) {
          extractedText = meaningfulWords.slice(0, 100).join(' ');
        }
      }
    }
    
    // Clean up the extracted text
    if (extractedText) {
      extractedText = extractedText
        .replace(/\\n/g, ' ')
        .replace(/\\r/g, ' ')
        .replace(/\\t/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      console.log('Successfully extracted text, length:', extractedText.length);
      console.log('Text preview:', extractedText.substring(0, 200));
      
      return extractedText.substring(0, 3000);
    }
    
    // If all methods fail, return a helpful message
    return `PDF traité mais le contenu textuel n'est pas accessible. 
           Le fichier pourrait être:
           - Un PDF scanné (image) nécessitant un OCR
           - Un PDF protégé par mot de passe
           - Un PDF avec encodage spécial
           
           Veuillez essayer avec un PDF contenant du texte sélectionnable.`;
    
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return `Erreur lors de l'extraction du texte PDF: ${error.message}. 
           Veuillez vérifier que le fichier est un PDF valide et non corrompu.`;
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
    console.log('Final extracted content length:', extractedContent.length)
    console.log('Final content preview:', extractedContent.substring(0, 300) + '...')

    // Estimate page count based on content and file size
    const estimatedPages = Math.max(1, Math.floor(fileSize / 50000))
    
    // Generate summary based on actual content
    let summary = '';
    if (extractedContent.length > 100 && !extractedContent.includes('Erreur') && !extractedContent.includes('PDF traité mais')) {
      // Take first few sentences as summary
      const sentences = extractedContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
      summary = sentences.slice(0, 3).join('. ').substring(0, 300) + (sentences.length > 3 ? '...' : '');
    } else {
      summary = extractedContent.substring(0, 500);
    }

    // Update the document record with processed information
    const { error: updateError } = await supabaseClient
      .from('documents')
      .update({
        pages_count: estimatedPages,
        content_summary: extractedContent, // Store the full extracted content
        ocr_processed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Update error:', updateError)
      throw new Error(`Failed to update document: ${updateError.message}`)
    }

    console.log('Document updated successfully with extracted content')

    return new Response(
      JSON.stringify({ 
        success: true, 
        pages_count: estimatedPages,
        summary,
        content_length: extractedContent.length,
        content_preview: extractedContent.substring(0, 200)
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
