
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Basic PDF analysis - in a real implementation, you would use a PDF library
    // For now, we'll simulate basic processing
    const fileSize = uint8Array.length
    
    // Estimate page count (very rough estimation)
    const estimatedPages = Math.max(1, Math.floor(fileSize / 50000)) // Rough estimate
    
    // Generate a basic summary (in production, use actual AI/OCR)
    const summary = `Document PDF analysé automatiquement. Contient environ ${estimatedPages} page(s). Prêt pour la génération de quiz.`

    // Update the document record with processed information
    const { error: updateError } = await supabaseClient
      .from('documents')
      .update({
        pages_count: estimatedPages,
        content_summary: summary,
        ocr_processed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (updateError) {
      throw new Error(`Failed to update document: ${updateError.message}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        pages_count: estimatedPages,
        summary 
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
