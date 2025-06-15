
import React, { useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuizResults } from '@/hooks/useQuizResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Brain, RotateCcw, Share } from 'lucide-react'
import ScoreOverview from '@/components/quiz/results/ScoreOverview'
import QuestionReview from '@/components/quiz/results/QuestionReview'
import PerformanceCharts from '@/components/quiz/results/PerformanceCharts'
import AIAnalysis from '@/components/quiz/results/AIAnalysis'
import ImprovementSuggestions from '@/components/quiz/results/ImprovementSuggestions'

const QuizResults = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const [searchParams] = useSearchParams()
  const attemptId = searchParams.get('attempt')
  const navigate = useNavigate()

  const { 
    quiz, 
    results, 
    analysis, 
    isLoading, 
    isLoadingAnalysis,
    generateAnalysis,
    isGeneratingAnalysis 
  } = useQuizResults(quizId!, attemptId!)

  // Generate analysis if not exists
  useEffect(() => {
    if (results && !analysis && !isLoadingAnalysis && !isGeneratingAnalysis) {
      generateAnalysis()
    }
  }, [results, analysis, isLoadingAnalysis, isGeneratingAnalysis, generateAnalysis])

  if (isLoading || !results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const handleRetakeQuiz = () => {
    navigate(`/quiz/${quizId}/start`)
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { label: 'Excellent', variant: 'default' as const }
    if (percentage >= 60) return { label: 'Bien', variant: 'secondary' as const }
    return { label: 'À améliorer', variant: 'destructive' as const }
  }

  const scoreBadge = getScoreBadge(results.percentage)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="mb-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleRetakeQuiz}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Refaire le quiz
              </Button>
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Résultats du Quiz</h1>
              <p className="text-muted-foreground text-lg">{quiz?.title}</p>
            </div>
            
            <div className="text-right">
              <div className={`text-4xl font-bold ${getScoreColor(results.percentage)}`}>
                {results.score.toFixed(1)}/20
              </div>
              <Badge variant={scoreBadge.variant} className="mt-1">
                {scoreBadge.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Score Overview */}
          <ScoreOverview results={results} />

          {/* Performance Charts */}
          {analysis && (
            <PerformanceCharts 
              analysis={analysis}
              results={results}
            />
          )}

          {/* AI Analysis */}
          {analysis ? (
            <AIAnalysis analysis={analysis} />
          ) : (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {isGeneratingAnalysis ? 
                      "Génération de l'analyse pédagogique en cours..." : 
                      "Analyse pédagogique non disponible"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Review */}
          <QuestionReview 
            questions={results.questions}
            answers={results.answers}
          />

          {/* Improvement Suggestions */}
          {analysis && (
            <ImprovementSuggestions 
              analysis={analysis}
              results={results}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default QuizResults
