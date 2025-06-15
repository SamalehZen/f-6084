
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarDays, Clock, Trophy, Target, Download } from 'lucide-react'
import { useProfile } from '@/hooks/useProfile'
import { useUserRoles } from '@/hooks/useUserRoles'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

const Profile = () => {
  const { profile, quizHistory, userStats, isLoadingProfile, updateProfile, isUpdatingProfile } = useProfile()
  const { primaryRole, isLoadingRoles } = useUserRoles()
  
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || ''
  })

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleDownloadResults = () => {
    // Créer un CSV des résultats
    const csvContent = [
      ['Quiz', 'Score', 'Mode', 'Date', 'Temps passé'],
      ...(quizHistory || []).map(quiz => [
        quiz.quiz.title,
        quiz.score || 'Non terminé',
        quiz.mode || 'learning',
        quiz.completed_at ? new Date(quiz.completed_at).toLocaleDateString('fr-FR') : 'Non terminé',
        quiz.time_spent ? `${Math.floor(quiz.time_spent / 60)}min ${quiz.time_spent % 60}s` : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mes-resultats-quiz.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoadingProfile || isLoadingRoles) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <Button onClick={handleDownloadResults} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Télécharger mes résultats
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations du profil */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={profile?.avatar_url || ''} />
                <AvatarFallback>
                  {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{profile?.full_name || 'Utilisateur'}</CardTitle>
              <CardDescription>{profile?.email}</CardDescription>
              <Badge variant={primaryRole === 'admin' ? 'destructive' : primaryRole === 'teacher' ? 'default' : 'secondary'}>
                {primaryRole === 'admin' ? 'Administrateur' : 
                 primaryRole === 'teacher' ? 'Enseignant' : 'Étudiant'}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Nom complet</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} disabled={isUpdatingProfile}>
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="w-full">
                  Modifier le profil
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistiques et historique */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="stats" className="space-y-4">
            <TabsList>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Target className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.totalQuizzes}</p>
                        <p className="text-sm text-muted-foreground">Quiz tentés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Trophy className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.completedQuizzes}</p>
                        <p className="text-sm text-muted-foreground">Quiz terminés</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Target className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.averageScore.toFixed(1)}/20</p>
                        <p className="text-sm text-muted-foreground">Score moyen</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="text-2xl font-bold">{Math.floor(userStats.totalTimeSpent / 60)}min</p>
                        <p className="text-sm text-muted-foreground">Temps total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des Quiz</CardTitle>
                  <CardDescription>Vos dernières tentatives de quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quizHistory?.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h4 className="font-medium">{quiz.quiz.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <CalendarDays className="h-4 w-4 mr-1" />
                              {quiz.completed_at ? 
                                formatDistanceToNow(new Date(quiz.completed_at), { addSuffix: true, locale: fr }) :
                                'Non terminé'
                              }
                            </span>
                            <Badge variant={quiz.mode === 'exam' ? 'destructive' : 'default'}>
                              {quiz.mode === 'exam' ? 'Examen' : 'Apprentissage'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">
                            {quiz.score ? `${quiz.score}/20` : 'Non terminé'}
                          </p>
                          {quiz.time_spent && (
                            <p className="text-sm text-muted-foreground">
                              {Math.floor(quiz.time_spent / 60)}min {quiz.time_spent % 60}s
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                    {(!quizHistory || quizHistory.length === 0) && (
                      <p className="text-center text-muted-foreground py-8">
                        Aucun quiz tenté pour le moment
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Profile
