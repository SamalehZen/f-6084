
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDocuments } from '@/hooks/useDocuments'
import { useQuizGeneration } from '@/hooks/useQuizGeneration'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Sparkles, FileText, Brain, Target, Settings, Zap } from 'lucide-react'

const QuizSettings = () => {
  const { documentId, quizId } = useParams<{ documentId?: string; quizId?: string }>()
  const navigate = useNavigate()
  const { documents } = useDocuments()
  const { generateQuiz, isGenerating } = useQuizGeneration()

  const [settings, setSettings] = useState({
    questionCount: 5,
    difficulty: 'moyen' as 'facile' | 'moyen' | 'difficile',
    questionType: 'qcm' as 'qcm' | 'vrai-faux' | 'mixte'
  })

  const currentDocumentId = documentId || (quizId ? 'quiz-document' : null)
  const document = documents?.find(doc => doc.id === documentId)

  const handleGenerate = async () => {
    if (!documentId) return
    
    try {
      const result = await generateQuiz.mutateAsync({ 
        documentId, 
        settings 
      })
      
      navigate(`/quiz/${result.quiz.id}/preview`)
    } catch (error) {
      console.error('Error generating quiz:', error)
    }
  }

  if (documentId && !document) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Document non trouvé</p>
          <Button onClick={() => navigate('/documents')} className="rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux documents
          </Button>
        </div>
      </div>
    )
  }

  const pageTitle = documentId ? 'Générer un Quiz IA' : 'Paramètres du Quiz'
  const documentTitle = document?.title || 'Document non trouvé'

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(documentId ? '/documents' : '/dashboard')}
            className="mb-6 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                {pageTitle}
              </h1>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Document: {documentTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Configuration du Quiz</CardTitle>
                  <CardDescription>
                    Personnalisez les paramètres pour votre quiz IA
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Nombre de questions</Label>
                  <span className="text-2xl font-bold text-primary">{settings.questionCount}</span>
                </div>
                <Slider
                  value={[settings.questionCount]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, questionCount: value[0] }))}
                  min={3}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>3 questions</span>
                  <span>20 questions</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Niveau de difficulté</Label>
                <RadioGroup 
                  value={settings.difficulty} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value as any }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-xl border bg-card/30 hover:bg-card/60 transition-colors">
                    <RadioGroupItem value="facile" id="facile" />
                    <Label htmlFor="facile" className="flex-1 cursor-pointer font-medium">
                      Facile
                      <span className="block text-xs text-muted-foreground">Questions basiques et directes</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl border bg-card/30 hover:bg-card/60 transition-colors">
                    <RadioGroupItem value="moyen" id="moyen" />
                    <Label htmlFor="moyen" className="flex-1 cursor-pointer font-medium">
                      Moyen
                      <span className="block text-xs text-muted-foreground">Questions d'analyse et de compréhension</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-xl border bg-card/30 hover:bg-card/60 transition-colors">
                    <RadioGroupItem value="difficile" id="difficile" />
                    <Label htmlFor="difficile" className="flex-1 cursor-pointer font-medium">
                      Difficile
                      <span className="block text-xs text-muted-foreground">Questions complexes et critiques</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Type de questions</Label>
                <Select 
                  value={settings.questionType} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, questionType: value as any }))}
                >
                  <SelectTrigger className="rounded-xl border-border/50 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qcm">Questions à choix multiples (QCM)</SelectItem>
                    <SelectItem value="vrai-faux">Questions Vrai/Faux</SelectItem>
                    <SelectItem value="mixte">Format mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Aperçu de la configuration</CardTitle>
                  <CardDescription>
                    Vérifiez vos paramètres avant la génération
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Document</span>
                  </div>
                  <span className="text-sm text-muted-foreground truncate max-w-32">{documentTitle}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Questions</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{settings.questionCount}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                    <Brain className="h-5 w-5 text-emerald-600" />
                    <span className="font-medium">Difficulté</span>
                  </div>
                  <span className="capitalize font-medium">{settings.difficulty}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-black/20">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-amber-600" />
                    <span className="font-medium">Type</span>
                  </div>
                  <span className="font-medium">
                    {settings.questionType === 'qcm' ? 'QCM' : 
                     settings.questionType === 'vrai-faux' ? 'Vrai/Faux' : 'Mixte'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                {documentId ? (
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Brain className="mr-3 h-5 w-5 animate-pulse" />
                        IA en cours de génération...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-5 w-5" />
                        Générer le Quiz avec l'IA
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="text-center p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Paramètres du quiz existant
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuizSettings
