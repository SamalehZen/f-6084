
import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Target, TrendingUp, Shield, Crown, Sparkles } from 'lucide-react'
import { useRoleManagement } from '@/hooks/useUserRoles'
import { useAnalytics } from '@/hooks/useAnalytics'
import StatsCard from '@/components/admin/StatsCard'
import UserManagement from '@/components/admin/UserManagement'
import AnalyticsView from '@/components/admin/AnalyticsView'

const AdminDashboard = () => {
  const { isLoadingUsers } = useRoleManagement()
  const { globalStats, isLoadingGlobalStats, calculateAnalytics, isCalculatingAnalytics } = useAnalytics()

  if (isLoadingUsers || isLoadingGlobalStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95">
        <div className="absolute inset-0 cosmic-grid opacity-30"></div>
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="animate-pulse space-y-6 max-w-4xl w-full px-4">
            <div className="h-16 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gradient-to-br from-muted/50 to-muted/30 rounded-2xl"></div>
              ))}
            </div>
            <div className="h-96 bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
      </div>
      
      <div className="absolute inset-0 cosmic-grid opacity-30"></div>

      <div className="relative container mx-auto p-8 space-y-8">
        {/* Premium header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center shadow-2xl">
                <Shield className="h-10 w-10 text-red-600 icon-glow" />
              </div>
              <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                <Crown className="h-4 w-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent mb-2">
                Dashboard{" "}
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Administrateur
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Contrôle total et analytiques avancées
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => calculateAnalytics()} 
            disabled={isCalculatingAnalytics}
            className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 rounded-full px-8 py-6 font-semibold transition-all duration-300 hover:scale-105 text-lg premium-button"
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Actualiser les Analytics
          </Button>
        </div>

        {/* Premium statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow hover:shadow-primary/10 transition-all duration-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-foreground mb-1">
                {globalStats?.totalUsers || 0}
              </div>
              <p className="text-sm font-medium text-muted-foreground">Utilisateurs totaux</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow hover:shadow-primary/10 transition-all duration-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-foreground mb-1">
                {globalStats?.totalQuizzes || 0}
              </div>
              <p className="text-sm font-medium text-muted-foreground">Quiz créés</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow hover:shadow-primary/10 transition-all duration-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-foreground mb-1">
                {globalStats?.totalAttempts || 0}
              </div>
              <p className="text-sm font-medium text-muted-foreground">Tentatives totales</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow hover:shadow-primary/10 transition-all duration-500 hover:scale-105">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-foreground mb-1">
                {`${globalStats?.completionRate?.toFixed(1) || 0}%`}
              </div>
              <p className="text-sm font-medium text-muted-foreground">Taux de complétion</p>
            </CardContent>
          </Card>
        </div>

        {/* Premium tabs */}
        <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-xl cosmic-glow">
          <Tabs defaultValue="users" className="space-y-6">
            <div className="p-6 pb-0">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger value="users" className="font-semibold">Gestion des utilisateurs</TabsTrigger>
                <TabsTrigger value="analytics" className="font-semibold">Analytics avancées</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="users" className="px-6 pb-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="analytics" className="px-6 pb-6">
              <AnalyticsView />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
