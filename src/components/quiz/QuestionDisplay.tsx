
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

interface QuestionDisplayProps {
  question: QuizQuestion
  questionIndex: number
  totalQuestions: number
  selectedAnswer?: number | boolean
  onAnswerSelect: (answer: number | boolean) => void
}

const QuestionDisplay = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect
}: QuestionDisplayProps) => {
  const handleAnswerChange = (value: string) => {
    if (question.type === 'qcm') {
      onAnswerSelect(parseInt(value))
    } else if (question.type === 'vrai-faux') {
      onAnswerSelect(value === 'true')
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">
          Question {questionIndex + 1}/{totalQuestions}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">
          {question.question}
        </div>

        {question.type === 'qcm' && question.options && (
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={handleAnswerChange}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="text-sm font-normal cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  <span className="font-medium mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'vrai-faux' && (
          <div className="space-y-3">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={handleAnswerChange}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="true" />
                <Label 
                  htmlFor="true" 
                  className="text-sm font-normal cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  ✓ Vrai
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="false" />
                <Label 
                  htmlFor="false" 
                  className="text-sm font-normal cursor-pointer flex-1 p-3 rounded-lg border hover:bg-gray-50"
                >
                  ✗ Faux
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuestionDisplay
