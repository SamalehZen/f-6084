
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  role: string | null
  subscription_plan: string | null
  avatar_url: string | null
  last_login: string | null
  quiz_completed_count: number
  average_score: number
  created_at: string | null
  updated_at: string | null
}

interface QuizHistory {
  id: string
  quiz_id: string
  completed_at: string | null
  score: number | null
  mode: string | null
  time_spent: number | null
  quiz: {
    title: string
    created_at: string
  }
}

export const useProfile = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Récupérer le profil de l'utilisateur connecté
  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      return data as Profile
    },
    enabled: !!user
  })

  // Récupérer l'historique des quiz de l'utilisateur
  const { data: quizHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['quiz-history', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .select(`
          id,
          quiz_id,
          completed_at,
          score,
          mode,
          time_spent,
          quizzes!inner (
            title,
            created_at
          )
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false })

      if (error) throw error
      
      // Transformer les données pour correspondre à l'interface QuizHistory
      const transformedData = data?.map(item => ({
        id: item.id,
        quiz_id: item.quiz_id,
        completed_at: item.completed_at,
        score: item.score,
        mode: item.mode,
        time_spent: item.time_spent,
        quiz: {
          title: (item.quizzes as any).title,
          created_at: (item.quizzes as any).created_at
        }
      })) || []

      return transformedData as QuizHistory[]
    },
    enabled: !!user
  })

  // Mettre à jour le profil
  const updateProfileMutation = useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('User not authenticated')
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] })
      toast({
        title: "Profil mis à jour",
        description: "Votre profil a été mis à jour avec succès.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le profil.",
      })
    }
  })

  // Calculer les statistiques utilisateur
  const userStats = {
    totalQuizzes: quizHistory?.length || 0,
    completedQuizzes: quizHistory?.filter(q => q.completed_at).length || 0,
    averageScore: profile?.average_score || 0,
    totalTimeSpent: quizHistory?.reduce((total, quiz) => total + (quiz.time_spent || 0), 0) || 0
  }

  return {
    profile,
    quizHistory,
    userStats,
    isLoadingProfile,
    isLoadingHistory,
    updateProfile: updateProfileMutation.mutate,
    isUpdatingProfile: updateProfileMutation.isPending
  }
}
