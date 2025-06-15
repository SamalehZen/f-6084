
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'

type AppRole = 'student' | 'teacher' | 'admin'

interface UserRole {
  id: string
  user_id: string
  role: AppRole
  assigned_at: string
  assigned_by?: string
}

export const useUserRoles = () => {
  const { user } = useAuth()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Récupérer les rôles de l'utilisateur connecté avec RPC
  const { data: userRoles, isLoading: isLoadingRoles } = useQuery({
    queryKey: ['user-roles', user?.id],
    queryFn: async () => {
      if (!user) return []
      
      const { data, error } = await supabase.rpc('get_user_roles', { _user_id: user.id })
      if (error) throw error
      return data as UserRole[]
    },
    enabled: !!user
  })

  // Récupérer le rôle principal de l'utilisateur
  const { data: primaryRole } = useQuery({
    queryKey: ['primary-role', user?.id],
    queryFn: async () => {
      if (!user) return null
      
      const { data, error } = await supabase
        .rpc('get_user_primary_role', { _user_id: user.id })

      if (error) throw error
      return data as AppRole | null
    },
    enabled: !!user
  })

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: AppRole): boolean => {
    return userRoles?.some(userRole => userRole.role === role) || false
  }

  // Vérifier si l'utilisateur est admin
  const isAdmin = hasRole('admin')
  
  // Vérifier si l'utilisateur est enseignant ou admin
  const isTeacherOrAdmin = hasRole('teacher') || hasRole('admin')

  return {
    userRoles,
    primaryRole,
    isLoadingRoles,
    hasRole,
    isAdmin,
    isTeacherOrAdmin
  }
}

// Hook pour la gestion des rôles (admin seulement)
export const useRoleManagement = () => {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Récupérer tous les utilisateurs avec leurs rôles avec RPC
  const { data: allUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['all-users-with-roles'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_all_users_with_roles')
      if (error) throw error
      return data
    }
  })

  // Assigner un rôle à un utilisateur avec RPC
  const assignRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string, role: AppRole }) => {
      const { data, error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      })
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users-with-roles'] })
      queryClient.invalidateQueries({ queryKey: ['user-roles'] })
      toast({
        title: "Rôle assigné",
        description: "Le rôle a été assigné avec succès.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible d'assigner le rôle.",
      })
    }
  })

  // Supprimer un rôle d'un utilisateur avec RPC
  const removeRoleMutation = useMutation({
    mutationFn: async (roleId: string) => {
      const { error } = await supabase.rpc('remove_user_role', { _role_id: roleId })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-users-with-roles'] })
      queryClient.invalidateQueries({ queryKey: ['user-roles'] })
      toast({
        title: "Rôle supprimé",
        description: "Le rôle a été supprimé avec succès.",
      })
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer le rôle.",
      })
    }
  })

  return {
    allUsers,
    isLoadingUsers,
    assignRole: assignRoleMutation.mutate,
    removeRole: removeRoleMutation.mutate,
    isAssigningRole: assignRoleMutation.isPending,
    isRemovingRole: removeRoleMutation.isPending
  }
}
