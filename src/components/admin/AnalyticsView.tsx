
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAnalytics } from '@/hooks/useAnalytics'

const AnalyticsView = () => {
  const { globalStats, analytics } = useAnalytics()

  return (
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
  )
}

export default AnalyticsView
