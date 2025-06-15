
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const usePdfTextExtraction = () => {
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const convertFileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const extractText = async (file: File): Promise<string> => {
    setIsExtracting(true);
    
    try {
      console.log('Converting PDF to Data URI...');
      const pdfDataUri = await convertFileToDataUri(file);
      
      console.log('Extracting text with OpenAI via Edge Function...');
      const { data, error } = await supabase.functions.invoke('extract-pdf-text', {
        body: { pdfDataUri }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to extract text');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to extract text');
      }
      
      console.log('Text extraction successful. Length:', data.extractedText.length);
      
      toast({
        title: "Extraction réussie",
        description: `Texte extrait avec succès (${data.extractedText.length} caractères)`,
      });
      
      return data.extractedText;
    } catch (error) {
      console.error('PDF text extraction error:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'extraction",
        description: error instanceof Error ? error.message : "Impossible d'extraire le texte du PDF",
      });
      throw error;
    } finally {
      setIsExtracting(false);
    }
  };

  return {
    extractText,
    isExtracting
  };
};
