
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useDocuments = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: documents,
    isLoading,
    error
  } = useQuery({
    queryKey: ['documents', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const uploadDocument = useMutation({
    mutationFn: async ({ file, title }: { file: File; title?: string }) => {
      if (!user) throw new Error('User not authenticated');

      // Upload file to storage
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { data, error: dbError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          title: title || file.name.replace('.pdf', ''),
          file_path: fileName,
          file_size: file.size
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Process PDF (call edge function)
      const { error: processError } = await supabase.functions.invoke('process-pdf', {
        body: { documentId: data.id, filePath: fileName }
      });

      if (processError) {
        console.warn('PDF processing failed:', processError);
        // Don't throw error as the document is still uploaded
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Document uploadé",
        description: "Votre document PDF a été uploadé avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur d'upload",
        description: error.message || "Une erreur est survenue lors de l'upload.",
      });
    }
  });

  const deleteDocument = useMutation({
    mutationFn: async (documentId: string) => {
      if (!user) throw new Error('User not authenticated');

      // Get document to delete file
      const { data: document, error: fetchError } = await supabase
        .from('documents')
        .select('file_path')
        .eq('id', documentId)
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete document record
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId)
        .eq('user_id', user.id);

      if (dbError) throw dbError;

      return documentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur de suppression",
        description: error.message || "Une erreur est survenue lors de la suppression.",
      });
    }
  });

  return {
    documents,
    isLoading,
    error,
    uploadDocument,
    deleteDocument
  };
};
