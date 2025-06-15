
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Brain, Target, Sparkles } from 'lucide-react'

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

  const progress = ((questionIndex + 1) / totalQuestions) * 100

  return (
    <Card className="w-full border-0 shadow-2xl bg-card/50 backdrop-blur-sm cosmic-glow hover:shadow-3xl transition-all duration-500">
      <CardHeader className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 flex items-center justify-center">
              <Brain className="h-7 w-7 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Question {questionIndex + 1}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                <span className="text-sm text-muted-foreground">sur {totalQuestions}</span>
              </div>
            </div>
          </div>
          
          <Badge className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 text-emerald-700 border border-emerald-200/30">
            <Target className="h-3 w-3 mr-2" />
            {question.type === 'qcm' ? 'QCM' : 'Vrai/Faux'}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8 pb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-100/30 border border-blue-200/30 backdrop-blur-sm">
          <h3 className="text-xl font-semibold leading-relaxed text-blue-900">
            {question.question}
          </h3>
        </div>

        {question.type === 'qcm' && question.options && (
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={handleAnswerChange}
            className="space-y-4"
          >
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              return (
                <div key={index} className="group">
                  <div className={`flex items-start space-x-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                    isSelected 
                      ? 'bg-gradient-to-r from-emerald-50/80 to-emerald-100/50 border-emerald-300/50 shadow-lg' 
                      : 'bg-gradient-to-r from-muted/30 to-muted/10 border-border/30 hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:border-border/50'
                  }`}>
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`}
                      className={`mt-1 ${isSelected ? 'border-emerald-500 text-emerald-600' : ''}`}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className="flex-1 cursor-pointer group-hover:text-foreground transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          isSelected 
                            ? 'bg-emerald-500/20 text-emerald-700' 
                            : 'bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                        }`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-base leading-relaxed">{option}</span>
                        {isSelected && (
                          <div className="ml-auto">
                            <CheckCircle className="h-5 w-5 text-emerald-600" />
                          </div>
                        )}
                      </div>
                    </Label>
                  </div>
                </div>
              )
            })}
          </RadioGroup>
        )}

        {question.type === 'vrai-faux' && (
          <div className="space-y-4">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              <div className="group">
                <div className={`flex items-center space-x-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                  selectedAnswer === true 
                    ? 'bg-gradient-to-r from-emerald-50/80 to-emerald-100/50 border-emerald-300/50 shadow-lg' 
                    : 'bg-gradient-to-r from-muted/30 to-muted/10 border-border/30 hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:border-border/50'
                }`}>
                  <RadioGroupItem 
                    value="true" 
                    id="true"
                    className={selectedAnswer === true ? 'border-emerald-500 text-emerald-600' : ''}
                  />
                  <Label 
                    htmlFor="true" 
                    className="flex-1 cursor-pointer group-hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        selectedAnswer === true 
                          ? 'bg-emerald-500/20' 
                          : 'bg-muted/50 group-hover:bg-muted'
                      }`}>
                        <CheckCircle className={`h-5 w-5 ${
                          selectedAnswer === true ? 'text-emerald-600' : 'text-muted-foreground group-hover:text-foreground'
                        }`} />
                      </div>
                      <span className="text-lg font-medium">Vrai</span>
                      {selectedAnswer === true && (
                        <div className="ml-auto">
                          <CheckCircle className="h-5 w-5 text-emerald-600" />
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              </div>
              
              <div className="group">
                <div className={`flex items-center space-x-4 p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
                  selectedAnswer === false 
                    ? 'bg-gradient-to-r from-red-50/80 to-red-100/50 border-red-300/50 shadow-lg' 
                    : 'bg-gradient-to-r from-muted/30 to-muted/10 border-border/30 hover:bg-gradient-to-r hover:from-muted/50 hover:to-muted/20 hover:border-border/50'
                }`}>
                  <RadioGroupItem 
                    value="false" 
                    id="false"
                    className={selectedAnswer === false ? 'border-red-500 text-red-600' : ''}
                  />
                  <Label 
                    htmlFor="false" 
                    className="flex-1 cursor-pointer group-hover:text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        selectedAnswer === false 
                          ? 'bg-red-500/20' 
                          : 'bg-muted/50 group-hover:bg-muted'
                      }`}>
                        <XCircle className={`h-5 w-5 ${
                          selectedAnswer === false ? 'text-red-600' : 'text-muted-foreground group-hover:text-foreground'
                        }`} />
                      </div>
                      <span className="text-lg font-medium">Faux</span>
                      {selectedAnswer === false && (
                        <div className="ml-auto">
                          <CheckCircle className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default QuestionDisplay
