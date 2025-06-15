
import { definePrompt } from '@genkit-ai/ai';

export const extractTextFromPdfPrompt = definePrompt(
  {
    name: 'extractTextFromPdf',
    description: 'Extract text content from a PDF document',
    inputSchema: {
      type: 'object',
      properties: {
        pdfDataUri: {
          type: 'string',
          description: 'PDF file as data URI (base64 encoded)'
        }
      },
      required: ['pdfDataUri']
    },
    outputSchema: {
      type: 'object',
      properties: {
        extractedText: {
          type: 'string',
          description: 'The extracted text content from the PDF'
        },
        success: {
          type: 'boolean',
          description: 'Whether the extraction was successful'
        },
        error: {
          type: 'string',
          description: 'Error message if extraction failed'
        }
      },
      required: ['extractedText', 'success']
    }
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
