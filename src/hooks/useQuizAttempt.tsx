
import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

interface QuizAnswer {
  questionIndex: number
  answer: number | boolean
  timeSpent: number
}

interface QuizAttemptData {
  quizId: string
  mode: 'exam' | 'learning'
  answers: QuizAnswer[]
  startTime: Date
  currentQuestionIndex: number
  timeSpent: number
}

export const useQuizAttempt = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const [attemptData, setAttemptData] = useState<QuizAttemptData | null>(null)
  const [isStarted, setIsStarted] = useState(false)

  // Démarrer une nouvelle tentative
  const startAttempt = (quizId: string, mode: 'exam' | 'learning' = 'learning') => {
    const newAttempt: QuizAttemptData = {
      quizId,
      mode,
      answers: [],
      startTime: new Date(),
      currentQuestionIndex: 0,
      timeSpent: 0
    }
    
    setAttemptData(newAttempt)
    setIsStarted(true)
  }

  // Sauvegarder une réponse
  const saveAnswer = (questionIndex: number, answer: number | boolean, timeSpent: number) => {
    if (!attemptData) return

    const updatedAnswers = [...attemptData.answers]
    const existingIndex = updatedAnswers.findIndex(a => a.questionIndex === questionIndex)
    
    const answerData: QuizAnswer = { questionIndex, answer, timeSpent }
    
    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = answerData
    } else {
      updatedAnswers.push(answerData)
    }

    setAttemptData(prev => prev ? {
      ...prev,
      answers: updatedAnswers
    } : null)
  }

  // Naviguer vers une question
  const goToQuestion = (index: number) => {
    if (!attemptData) return
    
    setAttemptData(prev => prev ? {
      ...prev,
      currentQuestionIndex: index
    } : null)
  }

  // Sauvegarder la tentative en base de données
  const saveAttemptMutation = useMutation({
    mutationFn: async () => {
      if (!attemptData || !user) throw new Error('No attempt data or user')

      const totalTimeSpent = Math.floor((new Date().getTime() - attemptData.startTime.getTime()) / 1000)
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          quiz_id: attemptData.quizId,
          user_id: user.id,
          answers: attemptData.answers,
          mode: attemptData.mode,
          time_spent: totalTimeSpent,
          completed_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast({
        title: "Quiz terminé",
        description: "Vos réponses ont été sauvegardées avec succès.",
      })
      queryClient.invalidateQueries({ queryKey: ['quiz-attempts'] })
      setAttemptData(null)
      setIsStarted(false)
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur de sauvegarde",
        description: error.message || "Une erreur est survenue lors de la sauvegarde.",
      })
    }
  })

  return {
    attemptData,
    isStarted,
    startAttempt,
    saveAnswer,
    goToQuestion,
    saveAttempt: saveAttemptMutation.mutate,
    isSaving: saveAttemptMutation.isPending
  }
}
