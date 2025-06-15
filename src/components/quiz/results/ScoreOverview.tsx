
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Target, TrendingUp, Award } from 'lucide-react'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
}

interface ScoreOverviewProps {
  results: QuizResult
}

const ScoreOverview = ({ results }: ScoreOverviewProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}min ${secs}s`
  }

  const averageTimePerQuestion = Math.floor(results.timeSpent / results.totalQuestions)

  const cards = [
    {
      title: "Score Final",
      value: `${results.score.toFixed(1)}/20`,
      subtitle: `${results.percentage.toFixed(1)}%`,
      icon: Award,
      gradient: "from-amber-500/20 to-amber-600/10",
      iconColor: "text-amber-600"
    },
    {
      title: "Réponses Correctes",
      value: `${results.correctAnswers}/${results.totalQuestions}`,
      subtitle: "questions réussies",
      icon: Target,
      gradient: "from-emerald-500/20 to-emerald-600/10",
      iconColor: "text-emerald-600"
    },
    {
      title: "Temps Total",
      value: formatTime(results.timeSpent),
      subtitle: "durée totale",
      icon: Clock,
      gradient: "from-blue-500/20 to-blue-600/10",
      iconColor: "text-blue-600"
    },
    {
      title: "Temps Moyen",
      value: formatTime(averageTimePerQuestion),
      subtitle: "par question",
      icon: TrendingUp,
      gradient: "from-purple-500/20 to-purple-600/10",
      iconColor: "text-purple-600"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className="border-0 shadow-xl bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:scale-105 cosmic-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
              <card.icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1">
              {card.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {card.subtitle}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ScoreOverview
