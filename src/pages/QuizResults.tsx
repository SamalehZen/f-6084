
import React, { useEffect, Suspense } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuizResults } from '@/hooks/useQuizResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Brain, RotateCcw, Share } from 'lucide-react'
import ScoreOverview from '@/components/quiz/results/ScoreOverview'
import ExportActions from '@/components/quiz/results/ExportActions'
import PrintableResults from '@/components/quiz/results/PrintableResults'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { usePerformanceOptimization, usePrefetch } from '@/hooks/usePerformanceOptimization'

// Lazy loaded components
import { 
  LazyPerformanceCharts, 
  LazyAIAnalysis, 
  LazyQuestionReview, 
  LazyImprovementSuggestions 
} from '@/components/quiz/LazyQuizComponents'

const QuizResults = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const [searchParams] = useSearchParams()
  const attemptId = searchParams.get('attempt')
  const navigate = useNavigate()

  // Performance optimizations
  usePerformanceOptimization()
  usePrefetch([
    `/quiz/${quizId}/start`,
    '/dashboard'
  ])

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
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
    <>
      <div className="min-h-screen bg-gray-50 print:hidden">
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
                <ExportActions 
                  results={results} 
                  quizTitle={quiz?.title || 'Quiz'} 
                />
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

            {/* Performance Charts - Lazy loaded */}
            {analysis && (
              <div data-export-charts>
                <Suspense fallback={<LoadingSpinner />}>
                  <LazyPerformanceCharts 
                    analysis={analysis}
                    results={results}
                  />
                </Suspense>
              </div>
            )}

            {/* AI Analysis - Lazy loaded */}
            <Suspense fallback={<LoadingSpinner />}>
              {analysis ? (
                <LazyAIAnalysis analysis={analysis} />
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
            </Suspense>

            {/* Question Review - Lazy loaded */}
            <Suspense fallback={<LoadingSpinner />}>
              <LazyQuestionReview 
                questions={results.questions}
                answers={results.answers}
              />
            </Suspense>

            {/* Improvement Suggestions - Lazy loaded */}
            {analysis && (
              <Suspense fallback={<LoadingSpinner />}>
                <LazyImprovementSuggestions 
                  analysis={analysis}
                  results={results}
                />
              </Suspense>
            )}
          </div>
        </div>
      </div>

      {/* Printable version */}
      <PrintableResults 
        results={results}
        quizTitle={quiz?.title || 'Quiz'}
        analysis={analysis}
      />
    </>
  )
}

export default QuizResults
