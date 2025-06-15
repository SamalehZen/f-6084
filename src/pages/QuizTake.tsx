
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
import { ArrowLeft, Save } from 'lucide-react'

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
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Quiz non trouvé</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
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

  const handleFinish = () => {
    saveAttempt()
    navigate(`/quiz/${quizId}/results`)
  }

  const canGoPrevious = attemptData.currentQuestionIndex > 0
  const canGoNext = attemptData.currentQuestionIndex < questions.length - 1
  const isLastQuestion = attemptData.currentQuestionIndex === questions.length - 1

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate(`/quiz/${quizId}/start`)}
                size="sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quitter
              </Button>
              <h1 className="text-xl font-semibold">{quiz.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Timer 
                startTime={attemptData.startTime}
                className="text-muted-foreground"
              />
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Mode {mode === 'exam' ? 'Examen' : 'Apprentissage'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
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
