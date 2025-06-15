
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useQuizAttempt } from '@/hooks/useQuizAttempt'
import QuestionDisplay from '@/components/quiz/QuestionDisplay'
import QuizNavigation from '@/components/quiz/QuizNavigation'
import Timer from '@/components/quiz/Timer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Save, Brain, Clock, Target, Trophy, Sparkles } from 'lucide-react'

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

const QuizTake = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const { attemptData, isStarted, startAttempt, saveAnswer, goToQuestion, saveAttempt, isSaving } = useQuizAttempt()
  
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date())
  const mode = location.state?.mode || 'learning'

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

  // Démarrer l'attempt au chargement
  useEffect(() => {
    if (quiz && !isStarted && quizId) {
      startAttempt(quizId, mode)
    }
  }, [quiz, isStarted, quizId, mode, startAttempt])

  // Réinitialiser le timer de question quand on change de question
  useEffect(() => {
    setQuestionStartTime(new Date())
  }, [attemptData?.currentQuestionIndex])

  if (isLoading || !attemptData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-20 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl w-1/3"></div>
            <div className="h-96 bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl backdrop-blur-sm"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow">
            <CardContent className="py-16">
              <div className="text-center">
                <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center mb-6">
                  <Trophy className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Quiz non trouvé</h3>
                <p className="text-muted-foreground mb-6">Le quiz que vous recherchez n'existe pas ou n'est plus disponible.</p>
                <Button onClick={() => navigate('/dashboard')} className="rounded-xl hover:scale-105 transition-all duration-300">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour au tableau de bord
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const questions: QuizQuestion[] = Array.isArray(quiz.questions) 
    ? (quiz.questions as unknown) as QuizQuestion[]
    : []

  const currentQuestion = questions[attemptData.currentQuestionIndex]
  const currentAnswer = attemptData.answers.find(a => a.questionIndex === attemptData.currentQuestionIndex)
  const answeredQuestions = attemptData.answers.map(a => a.questionIndex)

  const handleAnswerSelect = (answer: number | boolean) => {
    const questionTime = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000)
    saveAnswer(attemptData.currentQuestionIndex, answer, questionTime)
  }

  const handlePrevious = () => {
    if (attemptData.currentQuestionIndex > 0) {
      goToQuestion(attemptData.currentQuestionIndex - 1)
    }
  }

  const handleNext = () => {
    if (attemptData.currentQuestionIndex < questions.length - 1) {
      goToQuestion(attemptData.currentQuestionIndex + 1)
    }
  }

  const handleFinish = async () => {
    try {
      const result = await saveAttempt()
      if (result?.id) {
        navigate(`/quiz/${quizId}/results?attempt=${result.id}`)
      } else {
        navigate(`/quiz/${quizId}/results`)
      }
    } catch (error) {
      console.error('Error saving attempt:', error)
      navigate(`/quiz/${quizId}/results`)
    }
  }

  const canGoPrevious = attemptData.currentQuestionIndex > 0
  const canGoNext = attemptData.currentQuestionIndex < questions.length - 1
  const isLastQuestion = attemptData.currentQuestionIndex === questions.length - 1

  const getModeColor = (mode: string) => {
    return mode === 'exam' 
      ? 'from-red-500/20 to-red-600/10 border-red-200/30' 
      : 'from-blue-500/20 to-blue-600/10 border-blue-200/30'
  }

  const getModeTextColor = (mode: string) => {
    return mode === 'exam' ? 'text-red-700' : 'text-blue-700'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Header */}
      <div className="relative backdrop-blur-sm bg-card/30 border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate(`/quiz/${quizId}/start`)}
                className="rounded-xl hover:bg-accent/50 hover:scale-105 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quitter
              </Button>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {quiz.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Quiz interactif</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${getModeColor(mode)} border backdrop-blur-sm`}>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
                    <Clock className="h-3 w-3 text-emerald-600" />
                  </div>
                  <Timer 
                    startTime={attemptData.startTime}
                    className={`font-mono font-medium ${getModeTextColor(mode)}`}
                  />
                </div>
              </div>
              <Badge className={`px-4 py-2 rounded-xl text-sm font-medium ${getModeTextColor(mode)} bg-gradient-to-r ${getModeColor(mode)} border`}>
                <Target className="h-3 w-3 mr-2" />
                Mode {mode === 'exam' ? 'Examen' : 'Apprentissage'}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              questionIndex={attemptData.currentQuestionIndex}
              totalQuestions={questions.length}
              selectedAnswer={currentAnswer?.answer}
              onAnswerSelect={handleAnswerSelect}
            />
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-card/80 border-t border-border/50">
        <div className="container mx-auto px-4">
          <QuizNavigation
            currentQuestion={attemptData.currentQuestionIndex}
            totalQuestions={questions.length}
            answeredQuestions={answeredQuestions}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onFinish={handleFinish}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            isLastQuestion={isLastQuestion}
          />
        </div>
      </div>

      {/* Spacing for fixed footer */}
      <div className="h-20"></div>
    </div>
  )
}

export default QuizTake
