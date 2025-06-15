
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

interface QuestionsListProps {
  questions: QuizQuestion[]
}

const QuestionsList = ({ questions }: QuestionsListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Questions du Quiz</h2>
      {questions.map((question: QuizQuestion, index: number) => (
        <Card key={question.id || index}>
          <CardHeader>
            <CardTitle className="text-lg">
              Question {index + 1}
            </CardTitle>
            <CardDescription>
              {question.question}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {question.type === 'qcm' && question.options && (
              <div className="space-y-2">
                {question.options.map((option: string, optionIndex: number) => (
                  <div 
                    key={optionIndex}
                    className={`p-3 rounded-lg border ${
                      optionIndex === question.correctAnswer 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + optionIndex)}. 
                    </span>
                    {option}
                    {optionIndex === question.correctAnswer && (
                      <Badge className="ml-2" variant="secondary">
                        Réponse correcte
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {question.explanation && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-800 mb-1">Explication:</p>
                <p className="text-sm text-blue-700">{question.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default QuestionsList
