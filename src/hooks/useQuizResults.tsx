
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

interface QuizAnswer {
  questionIndex: number
  answer: number | boolean
  timeSpent: number
}

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number | boolean
  explanation?: string
}

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  answers: QuizAnswer[]
  questions: QuizQuestion[]
}

interface PedagogicalAnalysis {
  conceptsMastered: string[]
  conceptsToImprove: string[]
  aiSuggestions: string
  comprehensionRate: number
  performanceByTopic: Record<string, number>
  timeAnalysis: Record<string, number>
  difficultyLevel: string
}

export const useQuizResults = (quizId: string, attemptId?: string) => {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch quiz attempt and calculate results
  const { data: attempt, isLoading: isLoadingAttempt } = useQuery({
    queryKey: ['quiz-attempt', attemptId],
    queryFn: async () => {
      if (!attemptId || !user) return null
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select('*')
        .eq('id', attemptId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!attemptId && !!user
  })

  // Fetch quiz data
  const { data: quiz, isLoading: isLoadingQuiz } = useQuery({
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

  // Fetch pedagogical analysis
  const { data: analysis, isLoading: isLoadingAnalysis } = useQuery({
    queryKey: ['pedagogical-analysis', attemptId],
    queryFn: async () => {
      if (!attemptId || !user) return null
      
      const { data, error } = await supabase
        .from('pedagogical_analysis')
        .select('*')
        .eq('quiz_attempt_id', attemptId)
        .maybeSingle()

      if (error) throw error
      return data
    },
    enabled: !!attemptId && !!user
  })

  // Calculate quiz results
  const calculateResults = (): QuizResult | null => {
    if (!attempt || !quiz) return null

    const questions: QuizQuestion[] = Array.isArray(quiz.questions) 
      ? (quiz.questions as unknown) as QuizQuestion[]
      : []
    
    const answers: QuizAnswer[] = Array.isArray(attempt.answers)
      ? (attempt.answers as unknown) as QuizAnswer[]
      : []

    let correctAnswers = 0
    
    answers.forEach(answer => {
      const question = questions[answer.questionIndex]
      if (question && question.correctAnswer === answer.answer) {
        correctAnswers++
      }
    })

    const percentage = questions.length > 0 ? (correctAnswers / questions.length) * 100 : 0
    const score = (percentage / 100) * 20 // Score sur 20

    return {
      score,
      percentage,
      correctAnswers,
      totalQuestions: questions.length,
      timeSpent: attempt.time_spent || 0,
      answers,
      questions
    }
  }

  // Generate AI analysis
  const generateAnalysisMutation = useMutation({
    mutationFn: async () => {
      if (!attempt || !quiz || !user) throw new Error('Missing data for analysis')

      const results = calculateResults()
      if (!results) throw new Error('Could not calculate results')

      // Simulate AI analysis generation (replace with actual AI call)
      const mockAnalysis: PedagogicalAnalysis = {
        conceptsMastered: ['Concept A', 'Concept B'],
        conceptsToImprove: ['Concept C', 'Concept D'],
        aiSuggestions: 'Concentrez-vous sur les chapitres 3 et 5 du document pour améliorer votre compréhension.',
        comprehensionRate: results.percentage,
        performanceByTopic: {
          'Chapitre 1': 85,
          'Chapitre 2': 70,
          'Chapitre 3': 45
        },
        timeAnalysis: {
          'Temps moyen par question': results.timeSpent / results.totalQuestions,
          'Questions rapides': 60,
          'Questions lentes': 40
        },
        difficultyLevel: results.percentage >= 80 ? 'expert' : results.percentage >= 60 ? 'avancé' : 'débutant'
      }

      const { data, error } = await supabase
        .from('pedagogical_analysis')
        .insert({
          quiz_attempt_id: attempt.id,
          concepts_mastered: mockAnalysis.conceptsMastered,
          concepts_to_improve: mockAnalysis.conceptsToImprove,
          ai_suggestions: mockAnalysis.aiSuggestions,
          comprehension_rate: mockAnalysis.comprehensionRate,
          performance_by_topic: mockAnalysis.performanceByTopic,
          time_analysis: mockAnalysis.timeAnalysis,
          difficulty_level: mockAnalysis.difficultyLevel
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedagogical-analysis', attemptId] })
      toast({
        title: "Analyse générée",
        description: "L'analyse pédagogique de votre quiz est maintenant disponible.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de générer l'analyse.",
      })
    }
  })

  return {
    attempt,
    quiz,
    analysis,
    results: calculateResults(),
    isLoading: isLoadingAttempt || isLoadingQuiz,
    isLoadingAnalysis,
    generateAnalysis: generateAnalysisMutation.mutate,
    isGeneratingAnalysis: generateAnalysisMutation.isPending
  }
}
