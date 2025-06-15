
import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight, Target, Users } from 'lucide-react'

interface QuizNavigationProps {
  currentQuestion: number
  totalQuestions: number
  answeredQuestions: number[]
  onPrevious: () => void
  onNext: () => void
  onFinish: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  isLastQuestion: boolean
}

const QuizNavigation = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  onPrevious,
  onNext,
  onFinish,
  canGoNext,
  canGoPrevious,
  isLastQuestion
}: QuizNavigationProps) => {
  const progressPercentage = (answeredQuestions.length / totalQuestions) * 100

  return (
    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md border-t border-border/50">
      <div className="flex items-center gap-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="rounded-xl border-border/50 hover:bg-accent/50 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Précédent
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-sm">
            <div className="font-medium">Question {currentQuestion + 1} sur {totalQuestions}</div>
            <div className="text-muted-foreground">Navigation du quiz</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {answeredQuestions.length}/{totalQuestions} répondues
            </div>
            <div className="text-xs text-muted-foreground">
              {progressPercentage.toFixed(0)}% complété
            </div>
          </div>
        </div>
        
        {isLastQuestion ? (
          <Button 
            onClick={onFinish} 
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Terminer le quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuizNavigation
