
import { ai, model } from '../genkit';
import { z } from 'zod';
import { extractTextFromPdfPrompt } from '../prompts/extract-text-prompt';

export const extractTextFromPdf = ai.defineFlow(
  {
    name: 'extractTextFromPdf',
    inputSchema: z.object({
      pdfDataUri: z.string().describe('PDF file as data URI')
    }),
    outputSchema: z.object({
      extractedText: z.string(),
      success: z.boolean(),
      error: z.string().optional()
    })
  },
  async (input) => {
    try {
      console.log('Starting PDF text extraction with Genkit/Gemini...');
      
      const response = await extractTextFromPdfPrompt({
        pdfDataUri: input.pdfDataUri
      });

      // Extract the actual output data from the response
      const result = response.output;
      console.log('PDF text extraction completed. Text length:', result.extractedText?.length || 0);
      
      if (!result.success || !result.extractedText) {
        throw new Error(result.error || 'Failed to extract text from PDF');
      }

      return {
        extractedText: result.extractedText,
        success: true
      };
    } catch (error) {
      console.error('Error in PDF text extraction:', error);
      return {
        extractedText: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
);
