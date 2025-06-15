
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, BookOpen, Target, TrendingUp } from 'lucide-react'
import { useRoleManagement } from '@/hooks/useUserRoles'
import { useAnalytics } from '@/hooks/useAnalytics'
import StatsCard from '@/components/admin/StatsCard'
import UserManagement from '@/components/admin/UserManagement'
import AnalyticsView from '@/components/admin/AnalyticsView'

const AdminDashboard = () => {
  const { isLoadingUsers } = useRoleManagement()
  const { globalStats, isLoadingGlobalStats, calculateAnalytics, isCalculatingAnalytics } = useAnalytics()

  if (isLoadingUsers || isLoadingGlobalStats) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <Button onClick={() => calculateAnalytics()} disabled={isCalculatingAnalytics}>
          <TrendingUp className="h-4 w-4 mr-2" />
          Actualiser les Analytics
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          icon={Users}
          value={globalStats?.totalUsers || 0}
          label="Utilisateurs totaux"
          iconColor="text-blue-600"
        />
        <StatsCard
          icon={BookOpen}
          value={globalStats?.totalQuizzes || 0}
          label="Quiz créés"
          iconColor="text-green-600"
        />
        <StatsCard
          icon={Target}
          value={globalStats?.totalAttempts || 0}
          label="Tentatives totales"
          iconColor="text-purple-600"
        />
        <StatsCard
          icon={TrendingUp}
          value={`${globalStats?.completionRate?.toFixed(1) || 0}%`}
          label="Taux de complétion"
          iconColor="text-orange-600"
        />
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsView />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard
