import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Info, Eye, Clock } from 'lucide-react'

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
    <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 flex items-center justify-center">
            <Eye className="h-5 w-5 text-indigo-600" />
          </div>
          Revue Détaillée des Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {questions.map((question, index) => {
          const userAnswer = answers.find(a => a.questionIndex === index)
          const correct = userAnswer ? isCorrect(question, userAnswer.answer) : false
          const isExpanded = expandedQuestions.has(index)

          return (
            <div key={question.id} className="border border-border/50 rounded-xl p-6 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="outline" className="px-3 py-1 rounded-full border-border/50">
                      Question {index + 1}
                    </Badge>
                    {userAnswer ? (
                      <Badge 
                        variant={correct ? "default" : "destructive"}
                        className={`px-3 py-1 rounded-full ${
                          correct 
                            ? 'bg-emerald-500 hover:bg-emerald-600' 
                            : 'bg-red-500 hover:bg-red-600'
                        }`}
                      >
                        {correct ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {correct ? 'Correct' : 'Incorrect'}
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="px-3 py-1 rounded-full bg-muted">
                        Non répondu
                      </Badge>
                    )}
                    {userAnswer && (
                      <Badge variant="outline" className="px-3 py-1 rounded-full text-xs border-border/50">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(userAnswer.timeSpent)}
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-medium text-lg leading-relaxed">{question.question}</h4>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleQuestion(index)}
                  className="rounded-xl hover:bg-accent/50"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {isExpanded && (
                <div className="space-y-4 pt-4 border-t border-border/30">
                  {/* Options for QCM */}
                  {question.type === 'qcm' && question.options && (
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer?.answer === optionIndex
                        const isCorrectOption = question.correctAnswer === optionIndex
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-4 rounded-xl border transition-all duration-200 ${
                              isCorrectOption
                                ? 'bg-emerald-50/50 border-emerald-200/50 shadow-sm'
                                : isUserAnswer && !isCorrectOption
                                ? 'bg-red-50/50 border-red-200/50 shadow-sm'
                                : 'bg-muted/30 border-border/30 hover:bg-muted/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {isCorrectOption && (
                                <div className="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                                </div>
                              )}
                              {isUserAnswer && !isCorrectOption && (
                                <div className="h-8 w-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </div>
                              )}
                              {!isCorrectOption && !isUserAnswer && (
                                <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center">
                                  <span className="text-sm font-medium text-muted-foreground">
                                    {String.fromCharCode(65 + optionIndex)}
                                  </span>
                                </div>
                              )}
                              <span className="font-medium">{option}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Answer summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-xl border border-border/30">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Votre réponse</p>
                      <div className="flex items-center gap-2">
                        {userAnswer && (
                          <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            correct ? 'bg-emerald-500/20' : 'bg-red-500/20'
                          }`}>
                            {correct ? (
                              <CheckCircle className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <XCircle className="h-3 w-3 text-red-600" />
                            )}
                          </div>
                        )}
                        <p className="font-medium">
                          {userAnswer 
                            ? getAnswerText(question, userAnswer.answer)
                            : 'Non répondu'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Réponse correcte</p>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-emerald-600" />
                        </div>
                        <p className="font-medium text-emerald-700">
                          {question.correctAnswer !== undefined
                            ? getAnswerText(question, question.correctAnswer)
                            : 'Non définie'
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Explanation */}
                  {question.explanation && (
                    <div className="p-4 bg-gradient-to-r from-blue-50/50 to-blue-100/30 rounded-xl border border-blue-200/30">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Info className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-blue-800">Explication</p>
                          <p className="text-sm text-blue-700 leading-relaxed">{question.explanation}</p>
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
