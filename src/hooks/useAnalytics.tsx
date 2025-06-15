
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/hooks/use-toast'

interface UsageAnalytics {
  id: string
  date: string
  total_users: number
  total_quizzes: number
  total_attempts: number
  average_completion_rate: number
  average_success_rate: number
  created_at: string
}

export const useAnalytics = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Récupérer les analytics d'usage avec RPC pour éviter les problèmes de types
  const { data: analytics, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ['usage-analytics'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_usage_analytics', { days_limit: 30 })
      if (error) throw error
      return data as UsageAnalytics[]
    }
  })

  // Calculer les analytics quotidiennes
  const calculateAnalyticsMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.rpc('calculate_daily_analytics')
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usage-analytics'] })
      toast({
        title: "Analytics calculées",
        description: "Les statistiques ont été mises à jour.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de calculer les analytics.",
      })
    }
  })

  // Récupérer les statistiques globales en temps réel
  const { data: globalStats, isLoading: isLoadingGlobalStats } = useQuery({
    queryKey: ['global-stats'],
    queryFn: async () => {
      // Compter les utilisateurs actifs
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Compter les quiz créés
      const { count: quizzesCount } = await supabase
        .from('quizzes')
        .select('*', { count: 'exact', head: true })

      // Compter les tentatives
      const { count: attemptsCount } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true })

      // Calculer le taux de complétion
      const { count: completedCount } = await supabase
        .from('quiz_attempts')
        .select('*', { count: 'exact', head: true })
        .not('completed_at', 'is', null)

      const completionRate = attemptsCount ? (completedCount / attemptsCount) * 100 : 0

      // Calculer le score moyen
      const { data: avgScoreData } = await supabase
        .from('quiz_attempts')
        .select('score')
        .not('score', 'is', null)
        .not('completed_at', 'is', null)

      const averageScore = avgScoreData?.length 
        ? avgScoreData.reduce((sum, item) => sum + (item.score || 0), 0) / avgScoreData.length
        : 0

      return {
        totalUsers: usersCount || 0,
        totalQuizzes: quizzesCount || 0,
        totalAttempts: attemptsCount || 0,
        completionRate,
        averageScore
      }
    }
  })

  return {
    analytics,
    globalStats,
    isLoadingAnalytics,
    isLoadingGlobalStats,
    calculateAnalytics: calculateAnalyticsMutation.mutate,
    isCalculatingAnalytics: calculateAnalyticsMutation.isPending
  }
}
