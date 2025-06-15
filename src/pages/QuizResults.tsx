
import React, { useEffect } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuizResults } from '@/hooks/useQuizResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Brain, RotateCcw, Share, Trophy, TrendingUp } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-6xl mx-auto p-8">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded-xl w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-2xl"></div>
              ))}
            </div>
            <div className="h-64 bg-muted rounded-2xl"></div>
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
    if (percentage >= 80) return 'text-emerald-600'
    if (percentage >= 60) return 'text-amber-600'
    return 'text-red-500'
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { label: 'Excellent', variant: 'default' as const, color: 'bg-emerald-500' }
    if (percentage >= 60) return { label: 'Bien', variant: 'secondary' as const, color: 'bg-amber-500' }
    return { label: 'À améliorer', variant: 'destructive' as const, color: 'bg-red-500' }
  }

  const scoreBadge = getScoreBadge(results.percentage)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Header */}
      <div className="relative backdrop-blur-sm bg-card/30 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBackToDashboard}
              className="rounded-xl hover:bg-accent/50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleRetakeQuiz}
                className="rounded-xl border-border/50 hover:bg-accent/50"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Refaire le quiz
              </Button>
              <Button 
                variant="outline"
                className="rounded-xl border-border/50 hover:bg-accent/50"
              >
                <Share className="mr-2 h-4 w-4" />
                Partager
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                <Trophy className="h-10 w-10 text-purple-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                  Résultats du Quiz
                </h1>
                <p className="text-muted-foreground text-lg">{quiz?.title}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-5xl font-bold ${getScoreColor(results.percentage)} mb-2`}>
                {results.score.toFixed(1)}/20
              </div>
              <Badge 
                variant={scoreBadge.variant} 
                className={`${scoreBadge.color} text-white px-4 py-2 rounded-xl text-sm font-medium`}
              >
                {scoreBadge.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto p-8">
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
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
              <CardContent className="py-16">
                <div className="text-center">
                  <div className="h-24 w-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mb-6">
                    <Brain className="h-12 w-12 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isGeneratingAnalysis ? 
                      "Analyse IA en cours..." : 
                      "Analyse pédagogique"
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    {isGeneratingAnalysis ? 
                      "Notre IA analyse vos réponses pour vous fournir des conseils personnalisés" : 
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
