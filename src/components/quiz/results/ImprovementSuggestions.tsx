
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ExternalLink, RotateCcw, TrendingUp, Target, Clock, Lightbulb, Star, Rocket } from 'lucide-react'

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
        action: 'Réviser les bases',
        gradient: 'from-red-500/20 to-red-600/10',
        iconColor: 'text-red-600'
      })
    }
    
    if (conceptsToImprove.length > 0) {
      recommendations.push({
        type: 'focus',
        title: 'Concepts à Travailler',
        description: `Concentrez-vous sur : ${conceptsToImprove.slice(0, 2).join(', ')}`,
        icon: Target,
        action: 'Voir les ressources',
        gradient: 'from-amber-500/20 to-amber-600/10',
        iconColor: 'text-amber-600'
      })
    }
    
    if (results.timeSpent / results.totalQuestions > 180) { // Plus de 3 min par question
      recommendations.push({
        type: 'speed',
        title: 'Améliorer la Rapidité',
        description: 'Travaillez sur la vitesse de réponse',
        icon: Clock,
        action: 'Conseils timing',
        gradient: 'from-blue-500/20 to-blue-600/10',
        iconColor: 'text-blue-600'
      })
    }
    
    if (results.percentage >= 80) {
      recommendations.push({
        type: 'advance',
        title: 'Prêt pour le Niveau Suivant',
        description: 'Excellent travail ! Vous pouvez aborder des sujets plus avancés',
        icon: Rocket,
        action: 'Quiz avancés',
        gradient: 'from-emerald-500/20 to-emerald-600/10',
        iconColor: 'text-emerald-600'
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
        description: 'Revoir les définitions de base',
        gradient: 'from-purple-500/10 to-purple-600/5',
        color: 'text-purple-600'
      },
      {
        title: 'Exercices Pratiques Supplémentaires',
        type: 'Quiz',
        description: 'S\'entraîner sur les points faibles',
        gradient: 'from-blue-500/10 to-blue-600/5',
        color: 'text-blue-600'
      },
      {
        title: 'Ressources Externes',
        type: 'Web',
        description: 'Articles et vidéos complémentaires',
        gradient: 'from-emerald-500/10 to-emerald-600/5',
        color: 'text-emerald-600'
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
    <div className="space-y-8">
      {/* Recommendations */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-orange-600" />
            </div>
            Conseils d'Amélioration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-4 p-6 border border-border/50 rounded-xl bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${rec.gradient} flex items-center justify-center flex-shrink-0`}>
                <rec.icon className={`h-6 w-6 ${rec.iconColor}`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1">{rec.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{rec.description}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl border-border/50 hover:bg-accent/50">
                {rec.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Resources */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            Ressources Suggérées
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <Badge 
                  variant="secondary" 
                  className={`px-3 py-1 rounded-xl bg-gradient-to-r ${resource.gradient} border-border/30`}
                >
                  {resource.type}
                </Badge>
                <div>
                  <h5 className="font-medium">{resource.title}</h5>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="rounded-xl hover:bg-accent/50">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-emerald-600" />
            </div>
            Prochaines Étapes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-gradient-to-r from-emerald-50/50 to-emerald-100/30 rounded-xl border border-emerald-200/30">
            <p className="text-emerald-800 leading-relaxed mb-6">{getNextSteps()}</p>
            <div className="flex gap-4">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <RotateCcw className="mr-2 h-4 w-4" />
                Refaire ce Quiz
              </Button>
              <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50">
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
