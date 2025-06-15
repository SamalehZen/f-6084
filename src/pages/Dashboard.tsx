
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
  Trash2,
  Sparkles,
  Target,
  Award,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocuments } from '@/hooks/useDocuments';

const Dashboard = () => {
  const { documents, isLoading, deleteDocument } = useDocuments();

  const documentsCount = documents?.length || 0;
  const processedDocuments = documents?.filter(doc => doc.ocr_processed)?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-8 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Bienvenue sur Quiz PDF Pro
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Transformez vos documents en quiz intelligents avec l'IA de nouvelle génération
                  </p>
                </div>
              </div>
            </div>
            <Button size="lg" className="rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-5 w-5" />
                Créer un Quiz
              </Link>
            </Button>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Documents Uploadés</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{documentsCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Documents dans votre bibliothèque
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">IA Traités</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{processedDocuments}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Analysés par notre IA avancée
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Quiz Réalisés</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sessions d'apprentissage actives
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Performance</CardTitle>
              <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">-</div>
              <p className="text-xs text-muted-foreground mt-1">
                Score moyen global
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Documents Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Ma Bibliothèque</CardTitle>
                      <CardDescription>Vos documents PDF et leur statut d'analyse</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" className="rounded-xl" asChild>
                    <Link to="/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Ajouter
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 rounded-xl bg-muted/50 animate-pulse">
                        <div className="h-12 w-12 bg-muted rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : documents && documents.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                    {documents.map((document) => (
                      <div key={document.id} className="group flex items-center justify-between p-4 rounded-xl border bg-card/50 hover:bg-card/80 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{document.title}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge 
                                variant={document.ocr_processed ? "default" : "secondary"}
                                className="rounded-full text-xs"
                              >
                                {document.ocr_processed ? (
                                  <><Zap className="w-3 h-3 mr-1" /> Analysé</>
                                ) : (
                                  <><Clock className="w-3 h-3 mr-1" /> En cours</>
                                )}
                              </Badge>
                              {document.pages_count && (
                                <span className="text-xs text-muted-foreground">
                                  {document.pages_count} page(s)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {document.ocr_processed && (
                            <Button size="sm" variant="outline" className="rounded-lg" asChild>
                              <Link to={`/documents/${document.id}`}>
                                <Eye className="h-3 w-3" />
                              </Link>
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground"
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
                  <div className="text-center py-12">
                    <div className="h-20 w-20 mx-auto rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
                      <FileText className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Aucun document</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Commencez par uploader votre premier document PDF
                    </p>
                    <Button className="rounded-xl" asChild>
                      <Link to="/upload">
                        <Upload className="mr-2 h-4 w-4" />
                        Uploader un document
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Section */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Actions Rapides</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start rounded-xl h-12" asChild>
                  <Link to="/upload">
                    <Upload className="mr-3 h-5 w-5" />
                    <span className="font-medium">Nouveau Document</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start rounded-xl h-12" 
                  disabled={!documents || documents.length === 0}
                  asChild={documents && documents.length > 0}
                >
                  {documents && documents.length > 0 ? (
                    <Link to="/documents">
                      <Brain className="mr-3 h-5 w-5" />
                      <span className="font-medium">Mes Documents</span>
                    </Link>
                  ) : (
                    <>
                      <Brain className="mr-3 h-5 w-5" />
                      <span className="font-medium">Mes Documents</span>
                    </>
                  )}
                </Button>
                
                <Button variant="outline" className="w-full justify-start rounded-xl h-12" disabled>
                  <BarChart3 className="mr-3 h-5 w-5" />
                  <span className="font-medium">Mes Analyses</span>
                </Button>
              </CardContent>
            </Card>

            {/* Getting Started */}
            {(!documents || documents.length === 0) && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Commencer</CardTitle>
                  </div>
                  <CardDescription>
                    Guide rapide pour votre premier quiz
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Uploadez un PDF</p>
                        <p className="text-xs text-muted-foreground">
                          Cours, manuel, présentation...
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 opacity-60">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">IA génère le quiz</p>
                        <p className="text-xs text-muted-foreground">
                          Questions adaptées automatiquement
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 opacity-60">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Passez le quiz</p>
                        <p className="text-xs text-muted-foreground">
                          Mode apprentissage ou examen
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl mt-4" asChild>
                    <Link to="/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Commencer maintenant
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
