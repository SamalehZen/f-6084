
import React from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react'

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
  return (
    <div className="flex items-center justify-between p-4 border-t bg-white">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Précédent
        </Button>
        
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} sur {totalQuestions}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {answeredQuestions.length}/{totalQuestions} répondues
        </span>
        
        {isLastQuestion ? (
          <Button onClick={onFinish} className="ml-2">
            <CheckCircle className="h-4 w-4 mr-2" />
            Terminer le quiz
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="ml-2"
          >
            Suivant
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default QuizNavigation
