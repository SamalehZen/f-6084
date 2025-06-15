
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  Users, 
  Upload,
  Play,
  BarChart3,
  Clock,
  Eye,
  Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';

const Dashboard = () => {
  const { documents, isLoading, deleteDocument } = useDocuments();

  const documentsCount = documents?.length || 0;
  const processedDocuments = documents?.filter(doc => doc.ocr_processed)?.length || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bienvenue sur Quiz PDF Pro</h1>
          <p className="text-muted-foreground">
            Transformez vos documents en quiz interactifs avec l'IA
          </p>
        </div>
        <Button asChild>
          <Link to="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Nouveau Document
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{documentsCount}</div>
            <p className="text-xs text-muted-foreground">
              Documents uploadés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traités</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processedDocuments}</div>
            <p className="text-xs text-muted-foreground">
              Documents analysés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentatives</CardTitle>
            <Play className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Quiz réalisés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Score Moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Performance globale
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* My Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Mes Documents</CardTitle>
            <CardDescription>
              Vos documents PDF uploadés et leur statut
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : documents && documents.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {documents.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{document.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={document.ocr_processed ? "default" : "secondary"}>
                          {document.ocr_processed ? "Traité" : "En cours..."}
                        </Badge>
                        {document.pages_count && (
                          <span className="text-xs text-muted-foreground">
                            {document.pages_count} page(s)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {document.ocr_processed && (
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/documents/${document.id}`}>
                            <Eye className="h-3 w-3" />
                          </Link>
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => deleteDocument.mutate(document.id)}
                        disabled={deleteDocument.isPending}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucun document uploadé</p>
                <p className="text-xs">
                  Commencez par uploader votre premier document
                </p>
              </div>
            )}
            
            {documents && documents.length > 0 && (
              <Button variant="outline" className="w-full" asChild>
                <Link to="/documents">
                  Voir tous les documents
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Getting Started or Recent Activity */}
        {!documents || documents.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Commencer</CardTitle>
              <CardDescription>
                Suivez ces étapes pour créer votre premier quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Uploadez un document PDF</p>
                    <p className="text-xs text-muted-foreground">
                      Cours, manuel, présentation...
                    </p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/upload">Uploader</Link>
                  </Button>
                </div>

                <div className="flex items-center space-x-3 opacity-50">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Générez un quiz avec l'IA</p>
                    <p className="text-xs text-muted-foreground">
                      Questions automatiques adaptées
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 opacity-50">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-sm font-medium">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Réalisez le quiz</p>
                    <p className="text-xs text-muted-foreground">
                      Mode apprentissage ou examen
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Vos dernières actions sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Activité récente disponible bientôt</p>
                  <p className="text-xs">
                    Historique des quiz et analyses
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-24 flex-col" asChild>
              <Link to="/upload">
                <Upload className="h-6 w-6 mb-2" />
                <span>Nouveau Document</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-24 flex-col" 
              disabled={!documents || documents.length === 0}
              asChild={documents && documents.length > 0}
            >
              {documents && documents.length > 0 ? (
                <Link to="/documents">
                  <Brain className="h-6 w-6 mb-2" />
                  <span>Mes Documents</span>
                </Link>
              ) : (
                <>
                  <Brain className="h-6 w-6 mb-2" />
                  <span>Mes Documents</span>
                </>
              )}
            </Button>
            
            <Button variant="outline" className="h-24 flex-col" disabled>
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Mes Analyses</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
