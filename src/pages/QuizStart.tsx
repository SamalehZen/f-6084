
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Play, Clock, FileText, Target, Brain, Zap, Sparkles } from 'lucide-react'

const QuizStart = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mode, setMode] = useState<'learning' | 'exam'>('learning')

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      if (!quizId || !user) return null
      
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!quizId && !!user
  })

  const handleStartQuiz = () => {
    if (!quizId) return
    navigate(`/quiz/${quizId}/take`, { state: { mode } })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-pulse space-y-6 max-w-4xl w-full px-4">
          <div className="h-12 bg-muted rounded-xl w-1/3"></div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="h-96 bg-muted rounded-2xl"></div>
            <div className="h-96 bg-muted rounded-2xl"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 flex items-center justify-center mb-6">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz non trouvé</h3>
          <p className="text-muted-foreground mb-6">Ce quiz n'existe pas ou vous n'y avez pas accès.</p>
          <Button onClick={() => navigate('/dashboard')} className="rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  const questions = Array.isArray(quiz.questions) ? quiz.questions : []
  const settings = (quiz.settings && typeof quiz.settings === 'object' && !Array.isArray(quiz.settings))
    ? quiz.settings as any : {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/quiz/${quizId}/preview`)}
            className="mb-6 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
              <Play className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Commencer le Quiz
              </h1>
              <p className="text-muted-foreground text-lg">
                Préparez-vous pour cette session d'apprentissage
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">{quiz.title}</CardTitle>
                  <CardDescription>
                    Informations sur ce quiz
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-purple-600/5">
                  <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Questions</span>
                    <p className="text-2xl font-bold">{questions.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Difficulté</span>
                    <p className="text-lg font-bold capitalize">{settings.difficulty || 'Moyenne'}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/30">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200">Instructions</h4>
                </div>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                    Lisez attentivement chaque question avant de répondre
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                    Vous pouvez naviguer librement entre les questions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                    Vos réponses sont sauvegardées automatiquement
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                    Cliquez sur "Terminer" pour finaliser votre quiz
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Mode de passage</CardTitle>
                  <CardDescription>
                    Choisissez votre expérience d'apprentissage
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <RadioGroup value={mode} onValueChange={(value: 'learning' | 'exam') => setMode(value)}>
                <div className="space-y-4">
                  <div className="group relative">
                    <div className="flex items-start space-x-4 p-6 rounded-2xl border-2 border-border/50 hover:border-primary/30 transition-all duration-200 bg-card/30 hover:bg-card/60">
                      <RadioGroupItem value="learning" id="learning" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="learning" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                          <Brain className="h-5 w-5 text-blue-600" />
                          Mode Apprentissage
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          Apprenez à votre rythme avec un environnement détendu. 
                          Prenez le temps nécessaire pour réfléchir et comprendre chaque question.
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                          <Clock className="h-3 w-3" />
                          Temps illimité
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="flex items-start space-x-4 p-6 rounded-2xl border-2 border-border/50 hover:border-primary/30 transition-all duration-200 bg-card/30 hover:bg-card/60">
                      <RadioGroupItem value="exam" id="exam" className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor="exam" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          Mode Examen
                        </Label>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          Testez vos connaissances dans des conditions d'examen. 
                          Environnement chronométré pour évaluer vos performances.
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-purple-600 dark:text-purple-400">
                          <Zap className="h-3 w-3" />
                          Conditions d'examen
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <Button 
                onClick={handleStartQuiz}
                className="w-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                <Play className="mr-3 h-5 w-5" />
                Commencer le Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuizStart
