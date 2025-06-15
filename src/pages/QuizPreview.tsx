
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Sparkles, FileText, Target, Play } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-pulse space-y-6 max-w-4xl w-full px-4">
          <div className="h-12 bg-muted rounded-xl w-1/3"></div>
          <div className="h-48 bg-muted rounded-2xl"></div>
          <div className="h-96 bg-muted rounded-2xl"></div>
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

  const questions = Array.isArray(quiz.questions) 
    ? (quiz.questions as unknown) as any[]
    : []

  const settings = (quiz.settings && typeof quiz.settings === 'object' && !Array.isArray(quiz.settings))
    ? quiz.settings as any
    : {}

  const handleBack = () => navigate('/dashboard')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack}
            className="mb-6 rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Aperçu du Quiz
              </h1>
              <p className="text-muted-foreground text-lg">
                {quiz.title}
              </p>
            </div>
          </div>
        </div>

        <QuizHeader 
          title={quiz.title}
          questionCount={questions.length}
          quizId={quizId}
          onBack={handleBack}
        />

        <div className="grid gap-8 mt-8">
          <QuizInfo 
            isPublished={quiz.is_published}
            questionCount={questions.length}
            settings={settings}
          />

          <QuestionsList questions={questions} />
        </div>
      </div>
    </div>
  )
}

export default QuizPreview
