
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FileUploadZone from '@/components/upload/FileUploadZone';
import PDFPreview from '@/components/upload/PDFPreview';
import { useDocuments } from '@/hooks/useDocuments';
import { ArrowLeft, Upload, CheckCircle, Info } from 'lucide-react';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { uploadDocument } = useDocuments();
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTitle(file.name.replace('.pdf', ''));
    setUploadSuccess(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(25);
      await uploadDocument.mutateAsync({ 
        file: selectedFile, 
        title: title || selectedFile.name.replace('.pdf', '') 
      });
      setUploadProgress(100);
      setUploadSuccess(true);
      
      // Redirect to documents page after successful upload
      setTimeout(() => {
        navigate('/documents');
      }, 2000);
    } catch (error) {
      setUploadProgress(0);
      setUploadSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Uploader un document PDF
          </h1>
          <p className="text-gray-600">
            Ajoutez un nouveau document PDF pour générer des quiz interactifs
          </p>
        </div>

        {uploadSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Document uploadé avec succès ! Le traitement par l'IA est en cours. 
              Vous serez redirigé vers vos documents dans quelques secondes...
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sélectionner un fichier</CardTitle>
                <CardDescription>
                  Uploadez un document PDF pour commencer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  isUploading={uploadDocument.isPending}
                  uploadProgress={uploadProgress}
                />
              </CardContent>
            </Card>

            {selectedFile && !uploadSuccess && (
              <Card>
                <CardHeader>
                  <CardTitle>Détails du document</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre du document</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Entrez un titre pour votre document"
                      className="mt-1"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleUpload}
                    disabled={uploadDocument.isPending || !selectedFile}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadDocument.isPending ? 'Upload en cours...' : 'Uploader le document'}
                  </Button>
                </CardContent>
              </Card>
            )}

            {uploadSuccess && (
              <Card>
                <CardHeader>
                  <CardTitle>Traitement en cours</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Votre document est en cours d'analyse par notre IA. 
                      Cette étape peut prendre quelques minutes. 
                      Vous pourrez générer un quiz une fois le traitement terminé.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="mt-4 space-y-2">
                    <Button variant="outline" asChild className="w-full">
                      <a href="/documents">
                        Voir mes documents
                      </a>
                    </Button>
                    <Button variant="ghost" asChild className="w-full">
                      <a href="/upload">
                        Uploader un autre document
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            {selectedFile && (
              <PDFPreview
                fileName={selectedFile.name}
                fileSize={selectedFile.size}
                contentSummary={
                  uploadDocument.isPending ? 'Analyse en cours...' : 
                  uploadSuccess ? 'Document uploadé avec succès !' : 
                  undefined
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
