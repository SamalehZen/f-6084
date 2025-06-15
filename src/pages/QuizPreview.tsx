
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import QuizHeader from '@/components/quiz/QuizHeader'
import QuizInfo from '@/components/quiz/QuizInfo'
import QuestionsList from '@/components/quiz/QuestionsList'

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

interface QuizSettings {
  difficulty?: string
  questionType?: string
  questionCount?: number
}

const QuizPreview = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      if (!quizId || !user) return null
      
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!quizId && !!user
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
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

  // Type-safe parsing of questions with proper casting through unknown
  const questions: QuizQuestion[] = Array.isArray(quiz.questions) 
    ? (quiz.questions as unknown) as QuizQuestion[]
    : []

  // Type-safe parsing of settings
  const settings: QuizSettings = (quiz.settings && typeof quiz.settings === 'object' && !Array.isArray(quiz.settings))
    ? quiz.settings as QuizSettings
    : {}

  const handleBack = () => navigate('/dashboard')

  return (
    <div className="container mx-auto px-4 py-8">
      <QuizHeader 
        title={quiz.title}
        questionCount={questions.length}
        onBack={handleBack}
      />

      <div className="grid gap-6">
        <QuizInfo 
          isPublished={quiz.is_published}
          questionCount={questions.length}
          settings={settings}
        />

        <QuestionsList questions={questions} />
      </div>
    </div>
  )
}

export default QuizPreview
