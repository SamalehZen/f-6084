
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
import { ArrowLeft, Upload, CheckCircle, Info, Brain, Sparkles, FileText, Zap } from 'lucide-react';

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
      
      setTimeout(() => {
        navigate('/documents');
      }, 2000);
    } catch (error) {
      setUploadProgress(0);
      setUploadSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-6 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au dashboard
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Uploader un document PDF
              </h1>
              <p className="text-muted-foreground text-lg">
                Transformez vos documents en quiz intelligents avec l'IA de nouvelle génération
              </p>
            </div>
          </div>
        </div>

        {uploadSuccess && (
          <div className="mb-8">
            <Alert className="border-0 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mr-3">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <AlertDescription className="text-emerald-800 dark:text-emerald-200 font-medium">
                Document uploadé avec succès ! Le traitement par l'IA est en cours. 
                Vous serez redirigé vers vos documents dans quelques secondes...
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sélectionner un fichier</CardTitle>
                    <CardDescription>
                      Uploadez un document PDF pour commencer la magie IA
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  isUploading={uploadDocument.isPending}
                  uploadProgress={uploadProgress}
                  isExtracting={uploadDocument.isPending}
                />
              </CardContent>
            </Card>

            {selectedFile && !uploadSuccess && (
              <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Détails du document</CardTitle>
                      <CardDescription>Personnalisez votre document avant le traitement IA</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-medium">Titre du document</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Entrez un titre pour votre document"
                      className="mt-2 rounded-xl border-border/50 bg-background/50"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleUpload}
                    disabled={uploadDocument.isPending || !selectedFile}
                    className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {uploadDocument.isPending ? (
                      <>
                        <Brain className="h-5 w-5 mr-3 animate-pulse" />
                        Analyse par IA en cours...
                      </>
                    ) : (
                      <>
                        <Zap className="h-5 w-5 mr-3" />
                        Lancer le traitement IA
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}

            {uploadSuccess && (
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl">Traitement terminé</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-0 bg-emerald-50 dark:bg-emerald-900/20">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <AlertDescription className="text-emerald-800 dark:text-emerald-200">
                      Votre document a été analysé avec succès par notre IA avancée. 
                      Le contenu textuel a été extrait et vous pouvez maintenant générer un quiz personnalisé.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-3">
                    <Button variant="default" asChild className="w-full rounded-xl">
                      <a href="/documents">
                        <FileText className="mr-2 h-4 w-4" />
                        Voir mes documents
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="w-full rounded-xl">
                      <a href="/upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Uploader un autre document
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
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
