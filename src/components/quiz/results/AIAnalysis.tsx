
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

interface AIAnalysisProps {
  analysis: any // From database
}

const AIAnalysis = ({ analysis }: AIAnalysisProps) => {
  const conceptsMastered = analysis.concepts_mastered || []
  const conceptsToImprove = analysis.concepts_to_improve || []
  const suggestions = analysis.ai_suggestions || ''
  const comprehensionRate = analysis.comprehension_rate || 0
  const difficultyLevel = analysis.difficulty_level || 'débutant'

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-500'
      case 'avancé': return 'bg-blue-500'
      default: return 'bg-yellow-500'
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'expert': return 'Expert'
      case 'avancé': return 'Avancé'
      default: return 'Débutant'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Analyse Pédagogique IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comprehension Rate & Level */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Taux de Compréhension</p>
            <p className="text-2xl font-bold">{comprehensionRate.toFixed(1)}%</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Niveau Atteint</p>
            <Badge className={getLevelColor(difficultyLevel)}>
              {getLevelLabel(difficultyLevel)}
            </Badge>
          </div>
        </div>

        {/* Concepts Mastered */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
            <CheckCircle className="h-4 w-4" />
            Concepts Maîtrisés
          </h4>
          {conceptsMastered.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {conceptsMastered.map((concept: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-green-50 text-green-700">
                  {concept}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Aucun concept spécifique identifié</p>
          )}
        </div>

        {/* Concepts to Improve */}
        <div>
          <h4 className="flex items-center gap-2 font-semibold text-orange-700 mb-3">
            <AlertCircle className="h-4 w-4" />
            Concepts à Améliorer
          </h4>
          {conceptsToImprove.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {conceptsToImprove.map((concept: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-orange-50 text-orange-700">
                  {concept}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Tous les concepts semblent bien compris</p>
          )}
        </div>

        {/* AI Suggestions */}
        {suggestions && (
          <div>
            <h4 className="flex items-center gap-2 font-semibold text-blue-700 mb-3">
              <TrendingUp className="h-4 w-4" />
              Recommandations Personnalisées
            </h4>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <p className="text-blue-800">{suggestions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AIAnalysis
