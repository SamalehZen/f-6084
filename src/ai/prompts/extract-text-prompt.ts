
import { ai } from '../genkit';
import { z } from 'zod';

export const extractTextFromPdfPrompt = ai.definePrompt(
  {
    name: 'extractTextFromPdf',
    inputSchema: z.object({
      pdfDataUri: z.string().describe('PDF file as data URI (base64 encoded)')
    }),
    outputSchema: z.object({
      extractedText: z.string().describe('The extracted text content from the PDF'),
      success: z.boolean().describe('Whether the extraction was successful'),
      error: z.string().optional().describe('Error message if extraction failed')
    })
  },
  `
Tu es un expert en extraction de texte à partir de documents PDF.

Analyse le document PDF fourni et extrait tout le contenu textuel de manière précise et structurée.

PDF à analyser: {{media url=pdfDataUri}}

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
`
);
