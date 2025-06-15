
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  answers: any[]
  questions: any[]
}

interface PrintableResultsProps {
  results: QuizResult
  quizTitle: string
  analysis?: any
}

const PrintableResults = ({ results, quizTitle, analysis }: PrintableResultsProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}min ${secs}s`
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-800' }
    if (percentage >= 60) return { label: 'Bien', color: 'bg-yellow-100 text-yellow-800' }
    return { label: 'À améliorer', color: 'bg-red-100 text-red-800' }
  }

  const scoreBadge = getScoreBadge(results.percentage)

  return (
    <div className="print:block hidden print:text-black print:bg-white max-w-4xl mx-auto p-8">
      {/* Header pour impression */}
      <div className="text-center mb-8 print:block">
        <h1 className="text-2xl font-bold mb-2">Résultats du Quiz</h1>
        <h2 className="text-xl text-gray-600 mb-4">{quizTitle}</h2>
        <p className="text-sm text-gray-500">
          Généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
        </p>
      </div>

      {/* Score principal */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Score Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold">
                {results.score.toFixed(1)}/20
              </div>
              <div className="text-lg text-gray-600">
                {results.percentage.toFixed(1)}%
              </div>
            </div>
            <Badge className={scoreBadge.color}>
              {scoreBadge.label}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques détaillées */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Réponses Correctes</h4>
            <p className="text-2xl font-bold">
              {results.correctAnswers}/{results.totalQuestions}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Temps Total</h4>
            <p className="text-2xl font-bold">
              {formatTime(results.timeSpent)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analyse pédagogique */}
      {analysis && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Analyse Pédagogique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysis.concepts_mastered && analysis.concepts_mastered.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Concepts Maîtrisés</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.concepts_mastered.map((concept: string, index: number) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {analysis.concepts_to_improve && analysis.concepts_to_improve.length > 0 && (
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Concepts à Améliorer</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.concepts_to_improve.map((concept: string, index: number) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {analysis.ai_suggestions && (
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Recommandations</h4>
                  <p className="text-blue-800 text-sm bg-blue-50 p-3 rounded-md">
                    {analysis.ai_suggestions}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Détail des questions */}
      <Card>
        <CardHeader>
          <CardTitle>Détail des Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {results.questions.map((question: any, index: number) => {
              const userAnswer = results.answers.find(a => a.questionIndex === index)
              const isCorrect = question.correctAnswer === userAnswer?.answer
              
              return (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium mb-2">
                    Question {index + 1}: {question.question}
                  </h4>
                  
                  {question.options && (
                    <div className="ml-4 space-y-1">
                      {question.options.map((option: string, optionIndex: number) => (
                        <div 
                          key={optionIndex}
                          className={`p-2 rounded text-sm ${
                            optionIndex === question.correctAnswer 
                              ? 'bg-green-100 text-green-800' 
                              : optionIndex === userAnswer?.answer && !isCorrect
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-50'
                          }`}
                        >
                          {String.fromCharCode(65 + optionIndex)}. {option}
                          {optionIndex === question.correctAnswer && (
                            <span className="ml-2 font-semibold">(Correct)</span>
                          )}
                          {optionIndex === userAnswer?.answer && (
                            <span className="ml-2 font-semibold">(Votre réponse)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-2 text-sm text-gray-600">
                    Résultat: {isCorrect ? '✓ Correct' : '✗ Incorrect'} | 
                    Temps: {userAnswer?.timeSpent || 0}s
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default PrintableResults
