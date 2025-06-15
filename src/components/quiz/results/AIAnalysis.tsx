import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, CheckCircle, AlertCircle, TrendingUp, Sparkles, Target } from 'lucide-react'

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
      case 'expert': return 'bg-emerald-500'
      case 'avancé': return 'bg-blue-500'
      default: return 'bg-amber-500'
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
    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <span className="text-xl font-bold">Analyse Pédagogique IA</span>
            <div className="flex items-center gap-2 mt-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">Alimenté par l'Intelligence Artificielle</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Comprehension Rate & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Taux de Compréhension</h4>
            </div>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {comprehensionRate.toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">Niveau de maîtrise global</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-200/20">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 text-emerald-600" />
              <h4 className="font-semibold text-emerald-900">Niveau Atteint</h4>
            </div>
            <Badge className={`${getLevelColor(difficultyLevel)} text-white px-4 py-2 rounded-xl text-lg font-medium`}>
              {getLevelLabel(difficultyLevel)}
            </Badge>
            <p className="text-sm text-muted-foreground mt-2">Votre niveau actuel</p>
          </div>
        </div>

        {/* Concepts Mastered */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50/50 to-emerald-100/30 border border-emerald-200/30">
          <h4 className="flex items-center gap-3 font-bold text-emerald-800 mb-4">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            Concepts Maîtrisés
          </h4>
          {conceptsMastered.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {conceptsMastered.map((concept: string, index: number) => (
                <Badge 
                  key={index} 
                  className="bg-emerald-500/10 text-emerald-700 border border-emerald-200 hover:bg-emerald-500/20 transition-all duration-200 px-3 py-2 rounded-xl"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {concept}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic">Aucun concept spécifique identifié</p>
          )}
        </div>

        {/* Concepts to Improve */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/50 to-amber-100/30 border border-amber-200/30">
          <h4 className="flex items-center gap-3 font-bold text-amber-800 mb-4">
            <div className="h-8 w-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-amber-600" />
            </div>
            Concepts à Améliorer
          </h4>
          {conceptsToImprove.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {conceptsToImprove.map((concept: string, index: number) => (
                <Badge 
                  key={index} 
                  className="bg-amber-500/10 text-amber-700 border border-amber-200 hover:bg-amber-500/20 transition-all duration-200 px-3 py-2 rounded-xl"
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {concept}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm italic">Tous les concepts semblent bien compris ! 🎉</p>
          )}
        </div>

        {/* AI Suggestions */}
        {suggestions && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-blue-100/30 border border-blue-200/30">
            <h4 className="flex items-center gap-3 font-bold text-blue-800 mb-4">
              <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              Recommandations Personnalisées
            </h4>
            <div className="bg-blue-500/5 rounded-xl p-4 border-l-4 border-blue-500">
              <p className="text-blue-800 leading-relaxed">{suggestions}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AIAnalysis
