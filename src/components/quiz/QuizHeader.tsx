
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, Play, Share } from 'lucide-react'

interface QuizHeaderProps {
  title: string
  questionCount: number
  quizId?: string
  onBack: () => void
}

const QuizHeader = ({ title, questionCount, quizId, onBack }: QuizHeaderProps) => {
  const navigate = useNavigate()

  const handleTestQuiz = () => {
    if (quizId) {
      navigate(`/quiz/${quizId}/start`)
    }
  }

  return (
    <div className="mb-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>
      
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground">
            {questionCount} question{questionCount > 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="outline">
            <Share className="mr-2 h-4 w-4" />
            Partager
          </Button>
          <Button onClick={handleTestQuiz}>
            <Play className="mr-2 h-4 w-4" />
            Tester le Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuizHeader
