
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Info } from 'lucide-react'

interface QuizAnswer {
  questionIndex: number
  answer: number | boolean
  timeSpent: number
}

interface QuizQuestion {
  id: string
  type: string
  question: string
  options?: string[]
  correctAnswer?: number | boolean
  explanation?: string
}

interface QuestionReviewProps {
  questions: QuizQuestion[]
  answers: QuizAnswer[]
}

const QuestionReview = ({ questions, answers }: QuestionReviewProps) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(new Set())

  const toggleQuestion = (index: number) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedQuestions(newExpanded)
  }

  const getAnswerText = (question: QuizQuestion, answer: number | boolean) => {
    if (question.type === 'vrai-faux') {
      return answer ? 'Vrai' : 'Faux'
    }
    if (question.options && typeof answer === 'number') {
      return question.options[answer] || 'Réponse invalide'
    }
    return String(answer)
  }

  const isCorrect = (question: QuizQuestion, userAnswer: number | boolean) => {
    return question.correctAnswer === userAnswer
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}min ${secs}s` : `${secs}s`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revue Détaillée des Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = answers.find(a => a.questionIndex === index)
          const correct = userAnswer ? isCorrect(question, userAnswer.answer) : false
          const isExpanded = expandedQuestions.has(index)

          return (
            <div key={question.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {index + 1}
                    </span>
                    {userAnswer ? (
                      <Badge variant={correct ? "default" : "destructive"}>
                        {correct ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {correct ? 'Correct' : 'Incorrect'}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Non répondu</Badge>
                    )}
                    {userAnswer && (
                      <span className="text-xs text-muted-foreground">
                        {formatTime(userAnswer.timeSpent)}
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium">{question.question}</h4>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleQuestion(index)}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {isExpanded && (
                <div className="space-y-3 pt-3 border-t">
                  {/* Options for QCM */}
                  {question.type === 'qcm' && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer?.answer === optionIndex
                        const isCorrectOption = question.correctAnswer === optionIndex
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              isCorrectOption
                                ? 'bg-green-50 border-green-200'
                                : isUserAnswer && !isCorrectOption
                                ? 'bg-red-50 border-red-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {isCorrectOption && (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                              {isUserAnswer && !isCorrectOption && (
                                <XCircle className="h-4 w-4 text-red-600" />
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Answer summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-muted rounded">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Votre réponse</p>
                      <p className="font-medium">
                        {userAnswer 
                          ? getAnswerText(question, userAnswer.answer)
                          : 'Non répondu'
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Réponse correcte</p>
                      <p className="font-medium text-green-600">
                        {question.correctAnswer !== undefined
                          ? getAnswerText(question, question.correctAnswer)
                          : 'Non définie'
                        }
                      </p>
                    </div>
                  </div>

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Explication</p>
                          <p className="text-sm text-blue-700">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default QuestionReview
