
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
  RefreshCw,
  Sparkles,
  Zap,
  Clock,
  Target
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-6 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au dashboard
          </Button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                  Ma Bibliothèque
                </h1>
                <p className="text-muted-foreground text-lg">
                  Gérez vos documents PDF et générez des quiz intelligents
                </p>
              </div>
            </div>
            
            <Button asChild className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
              <Link to="/upload">
                <Upload className="h-5 w-5 mr-2" />
                Nouveau Document
              </Link>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-xl bg-card/50 backdrop-blur-sm animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : documents && documents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {documents.map((document) => (
              <Card key={document.id} className="group border-0 shadow-xl bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cosmic-glow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{document.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {formatDate(document.created_at)}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant={document.ocr_processed ? "default" : "secondary"}
                      className="rounded-full"
                    >
                      {document.ocr_processed ? (
                        <><Zap className="w-3 h-3 mr-1" /> Traité</>
                      ) : (
                        <><Clock className="w-3 h-3 mr-1" /> En cours</>
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <span className="font-medium text-muted-foreground">Taille:</span>
                        <p className="text-xs">{document.file_size ? formatFileSize(document.file_size) : 'N/A'}</p>
                      </div>
                    </div>
                    {document.pages_count && (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <span className="font-medium text-muted-foreground">Pages:</span>
                          <p className="text-xs">{document.pages_count}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {document.content_summary && (
                    <div className="p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/20 border border-border/50">
                      <p className="text-muted-foreground text-xs mb-1 font-medium">Résumé IA:</p>
                      <p className="text-xs leading-relaxed">
                        {document.content_summary.length > 120 
                          ? `${document.content_summary.substring(0, 120)}...` 
                          : document.content_summary
                        }
                      </p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-2">
                    {document.ocr_processed ? (
                      <Button 
                        size="sm" 
                        className="flex-1 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                        onClick={() => handleGenerateQuiz(document.id)}
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Générer Quiz
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="flex-1 rounded-xl" disabled>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Traitement...
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
          <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center mb-6">
                  <FileText className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Aucun document</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Vous n'avez pas encore uploadé de documents PDF. Commencez par ajouter votre premier document pour créer des quiz intelligents.
                </p>
                <Button asChild className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" size="lg">
                  <Link to="/upload">
                    <Sparkles className="h-5 w-5 mr-2" />
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
