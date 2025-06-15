
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface QuizSettings {
  questionCount: number
  difficulty: 'facile' | 'moyen' | 'difficile'
  questionType: 'qcm' | 'vrai-faux' | 'mixte'
}

export const useQuizGeneration = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const generateQuiz = useMutation({
    mutationFn: async ({ documentId, settings }: { documentId: string; settings: QuizSettings }) => {
      console.log('Generating quiz for document:', documentId, 'with settings:', settings)

      const { data, error } = await supabase.functions.invoke('quiz-generator', {
        body: { documentId, settings }
      })

      if (error) {
        console.error('Edge function error:', error)
        throw error
      }

      return data
    },
    onSuccess: (data) => {
      toast({
        title: "Quiz généré avec succès",
        description: `Le quiz "${data.quiz.title}" a été créé avec ${data.questions.length} questions.`,
      })
      queryClient.invalidateQueries({ queryKey: ['quizzes'] })
    },
    onError: (error: any) => {
      console.error('Quiz generation error:', error)
      toast({
        variant: "destructive",
        title: "Erreur de génération",
        description: error.message || "Une erreur est survenue lors de la génération du quiz.",
      })
    }
  })

  return {
    generateQuiz,
    isGenerating: generateQuiz.isPending
  }
}
