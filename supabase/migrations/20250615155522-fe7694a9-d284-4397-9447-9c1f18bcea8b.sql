
-- Créer le bucket pour les documents PDF
INSERT INTO storage.buckets (id, name, public) 
VALUES ('documents', 'documents', false);

-- Politique RLS pour permettre aux utilisateurs de voir leurs propres documents
CREATE POLICY "Users can view their own documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique RLS pour permettre aux utilisateurs d'uploader leurs documents
CREATE POLICY "Users can upload their own documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique RLS pour permettre aux utilisateurs de supprimer leurs documents
CREATE POLICY "Users can delete their own documents" ON storage.objects
FOR DELETE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Politique RLS pour permettre aux utilisateurs de mettre à jour leurs documents
CREATE POLICY "Users can update their own documents" ON storage.objects
FOR UPDATE USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
