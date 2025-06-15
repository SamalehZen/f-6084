
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, RotateCcw, TrendingUp, Target, Clock } from 'lucide-react'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
}

interface ImprovementSuggestionsProps {
  analysis: any // From database
  results: QuizResult
}

const ImprovementSuggestions = ({ analysis, results }: ImprovementSuggestionsProps) => {
  const difficultyLevel = analysis.difficulty_level || 'débutant'
  const conceptsToImprove = analysis.concepts_to_improve || []
  
  const getRecommendations = () => {
    const recommendations = []
    
    if (results.percentage < 60) {
      recommendations.push({
        type: 'study',
        title: 'Révision Approfondie Recommandée',
        description: 'Reprenez les concepts de base avant de continuer',
        icon: BookOpen,
        action: 'Réviser les bases'
      })
    }
    
    if (conceptsToImprove.length > 0) {
      recommendations.push({
        type: 'focus',
        title: 'Concepts à Travailler',
        description: `Concentrez-vous sur : ${conceptsToImprove.slice(0, 2).join(', ')}`,
        icon: Target,
        action: 'Voir les ressources'
      })
    }
    
    if (results.timeSpent / results.totalQuestions > 180) { // Plus de 3 min par question
      recommendations.push({
        type: 'speed',
        title: 'Améliorer la Rapidité',
        description: 'Travaillez sur la vitesse de réponse',
        icon: Clock,
        action: 'Conseils timing'
      })
    }
    
    if (results.percentage >= 80) {
      recommendations.push({
        type: 'advance',
        title: 'Prêt pour le Niveau Suivant',
        description: 'Excellent travail ! Vous pouvez aborder des sujets plus avancés',
        icon: TrendingUp,
        action: 'Quiz avancés'
      })
    }
    
    return recommendations
  }

  const recommendations = getRecommendations()

  const getSuggestedResources = () => {
    const resources = [
      {
        title: 'Chapitre 3 : Concepts Fondamentaux',
        type: 'PDF',
        description: 'Revoir les définitions de base'
      },
      {
        title: 'Exercices Pratiques Supplémentaires',
        type: 'Quiz',
        description: 'S\'entraîner sur les points faibles'
      },
      {
        title: 'Ressources Externes',
        type: 'Web',
        description: 'Articles et vidéos complémentaires'
      }
    ]
    
    return resources
  }

  const suggestedResources = getSuggestedResources()

  const getNextSteps = () => {
    if (difficultyLevel === 'expert') {
      return 'Félicitations ! Vous maîtrisez parfaitement le sujet. Vous pouvez maintenant créer vos propres quiz ou aider d\'autres étudiants.'
    }
    if (difficultyLevel === 'avancé') {
      return 'Très bon niveau ! Continuez avec des quiz plus complexes pour atteindre l\'expertise.'
    }
    return 'Bon début ! Concentrez-vous sur les concepts de base avant de passer au niveau suivant.'
  }

  return (
    <div className="space-y-6">
      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Conseils d'Amélioration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
              <rec.icon className="h-5 w-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold">{rec.title}</h4>
                <p className="text-muted-foreground text-sm">{rec.description}</p>
              </div>
              <Button variant="outline" size="sm">
                {rec.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Ressources Suggérées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestedResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{resource.type}</Badge>
                <div>
                  <h5 className="font-medium">{resource.title}</h5>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Prochaines Étapes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
            <p className="text-gray-700">{getNextSteps()}</p>
            <div className="flex gap-2 mt-4">
              <Button>
                <RotateCcw className="mr-2 h-4 w-4" />
                Refaire ce Quiz
              </Button>
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Nouveaux Quiz
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ImprovementSuggestions
