
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, Play, Share } from 'lucide-react'

const QuizPreview = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      if (!quizId || !user) return null
      
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!quizId && !!user
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Quiz non trouvé</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  const questions = quiz.questions || []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground">
              {questions.length} question{questions.length > 1 ? 's' : ''}
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
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Tester le Quiz
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations du Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Statut</span>
                <div className="mt-1">
                  <Badge variant={quiz.is_published ? "default" : "secondary"}>
                    {quiz.is_published ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Questions</span>
                <p className="text-lg font-semibold">{questions.length}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Difficulté</span>
                <p className="text-lg font-semibold capitalize">
                  {quiz.settings?.difficulty || 'Non définie'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Type</span>
                <p className="text-lg font-semibold">
                  {quiz.settings?.questionType === 'qcm' ? 'QCM' : 
                   quiz.settings?.questionType === 'vrai-faux' ? 'Vrai/Faux' : 
                   'Mixte'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Questions du Quiz</h2>
          {questions.map((question: any, index: number) => (
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
      </div>
    </div>
  )
}

export default QuizPreview
