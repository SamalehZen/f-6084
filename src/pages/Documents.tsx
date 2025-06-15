
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Upload,
  Eye,
  Trash2,
  ArrowLeft,
  Brain,
  Download,
  RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';

const Documents = () => {
  const navigate = useNavigate();
  const { documents, isLoading, deleteDocument } = useDocuments();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleGenerateQuiz = (documentId: string) => {
    navigate(`/document/${documentId}/quiz-settings`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mes Documents
              </h1>
              <p className="text-gray-600">
                Gérez vos documents PDF et générez des quiz
              </p>
            </div>
            
            <Button asChild>
              <Link to="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Nouveau Document
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{document.title}</CardTitle>
                      <CardDescription className="mt-1">
                        Uploadé le {formatDate(document.created_at)}
                      </CardDescription>
                    </div>
                    <Badge variant={document.ocr_processed ? "default" : "secondary"}>
                      {document.ocr_processed ? "Traité" : "En cours"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taille :</span>
                      <span>{document.file_size ? formatFileSize(document.file_size) : 'N/A'}</span>
                    </div>
                    {document.pages_count && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pages :</span>
                        <span>{document.pages_count}</span>
                      </div>
                    )}
                    {document.content_summary && (
                      <div className="text-sm">
                        <p className="text-muted-foreground mb-1">Résumé :</p>
                        <p className="text-xs bg-gray-50 p-2 rounded">
                          {document.content_summary}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    {document.ocr_processed ? (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleGenerateQuiz(document.id)}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Générer Quiz
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1" disabled>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Traitement...
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => deleteDocument.mutate(document.id)}
                      disabled={deleteDocument.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-16">
              <div className="text-center">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">Aucun document</h3>
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore uploadé de documents PDF.
                </p>
                <Button asChild>
                  <Link to="/upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Uploader votre premier document
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Documents;
