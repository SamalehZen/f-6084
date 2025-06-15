
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, BookOpen, Target, TrendingUp, Shield, Trash2 } from 'lucide-react'
import { useRoleManagement } from '@/hooks/useUserRoles'
import { useAnalytics } from '@/hooks/useAnalytics'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const AdminDashboard = () => {
  const { allUsers, isLoadingUsers, assignRole, removeRole, isAssigningRole, isRemovingRole } = useRoleManagement()
  const { globalStats, analytics, isLoadingGlobalStats, calculateAnalytics, isCalculatingAnalytics } = useAnalytics()
  
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = allUsers?.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleAssignRole = (userId: string) => {
    if (selectedRole) {
      assignRole({ userId, role: selectedRole as any })
      setSelectedRole('')
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive'
      case 'teacher': return 'default'
      case 'student': return 'secondary'
      default: return 'outline'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur'
      case 'teacher': return 'Enseignant'
      case 'student': return 'Étudiant'
      default: return role
    }
  }

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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{globalStats?.totalUsers || 0}</p>
                <p className="text-sm text-muted-foreground">Utilisateurs totaux</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{globalStats?.totalQuizzes || 0}</p>
                <p className="text-sm text-muted-foreground">Quiz créés</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{globalStats?.totalAttempts || 0}</p>
                <p className="text-sm text-muted-foreground">Tentatives totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{globalStats?.completionRate?.toFixed(1) || 0}%</p>
                <p className="text-sm text-muted-foreground">Taux de complétion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Gestion des utilisateurs</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs et rôles</CardTitle>
              <CardDescription>Gérer les utilisateurs et leurs rôles dans le système</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Barre de recherche */}
                <div className="flex space-x-4">
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>

                {/* Liste des utilisateurs */}
                <div className="space-y-2">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{user.full_name || 'Nom non défini'}</h4>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex space-x-2">
                          {user.user_roles && Array.isArray(user.user_roles) ? user.user_roles.map((userRole: any) => (
                            <div key={userRole.id} className="flex items-center space-x-2">
                              <Badge variant={getRoleBadgeVariant(userRole.role)}>
                                {getRoleLabel(userRole.role)}
                              </Badge>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Supprimer le rôle</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Êtes-vous sûr de vouloir supprimer le rôle "{getRoleLabel(userRole.role)}" 
                                      pour {user.full_name || user.email} ?
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeRole(userRole.id)}>
                                      Supprimer
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )) : null}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">Étudiant</SelectItem>
                            <SelectItem value="teacher">Enseignant</SelectItem>
                            <SelectItem value="admin">Administrateur</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          onClick={() => handleAssignRole(user.id)}
                          disabled={!selectedRole || isAssigningRole}
                          size="sm"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Assigner
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics d'usage</CardTitle>
              <CardDescription>Statistiques détaillées d'utilisation de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Score moyen global</h4>
                      <p className="text-2xl font-bold text-green-600">
                        {globalStats?.averageScore?.toFixed(1) || 0}/20
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Taux de réussite</h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {globalStats?.completionRate?.toFixed(1) || 0}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Historique des analytics */}
                {analytics && analytics.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Historique des 30 derniers jours</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {analytics.map((day) => (
                        <div key={day.id} className="flex items-center justify-between p-3 border rounded">
                          <span className="font-medium">
                            {new Date(day.date).toLocaleDateString('fr-FR')}
                          </span>
                          <div className="flex space-x-4 text-sm">
                            <span>{day.total_users} utilisateurs</span>
                            <span>{day.total_quizzes} quiz</span>
                            <span>{day.total_attempts} tentatives</span>
                            <span>{day.average_completion_rate?.toFixed(1)}% complétion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminDashboard
