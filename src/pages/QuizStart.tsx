
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Play, Clock, FileText, Target } from 'lucide-react'

const QuizStart = () => {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [mode, setMode] = useState<'learning' | 'exam'>('learning')

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      if (!quizId || !user) return null
      
      const { data, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('id', quizId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!quizId && !!user
  })

  const handleStartQuiz = () => {
    if (!quizId) return
    navigate(`/quiz/${quizId}/take`, { state: { mode } })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
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

  const questions = Array.isArray(quiz.questions) ? quiz.questions : []
  const settings = (quiz.settings && typeof quiz.settings === 'object' && !Array.isArray(quiz.settings))
    ? quiz.settings as any : {}

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/quiz/${quizId}/preview`)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              {quiz.title}
            </CardTitle>
            <CardDescription>
              Préparez-vous à commencer ce quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-600" />
                <div>
                  <span className="font-medium text-muted-foreground">Questions:</span>
                  <p>{questions.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <div>
                  <span className="font-medium text-muted-foreground">Difficulté:</span>
                  <p className="capitalize">{settings.difficulty || 'Non définie'}</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Instructions:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Lisez attentivement chaque question</li>
                <li>• Vous pouvez naviguer entre les questions</li>
                <li>• Vos réponses sont sauvegardées automatiquement</li>
                <li>• Cliquez sur "Terminer" pour soumettre vos réponses</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mode de quiz</CardTitle>
            <CardDescription>
              Choisissez votre mode de passage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={mode} onValueChange={(value: 'learning' | 'exam') => setMode(value)}>
              <div className="space-y-4">
                <div className="flex items-start space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="learning" id="learning" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="learning" className="font-medium cursor-pointer">
                      Mode Apprentissage
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mode détendu pour apprendre. Vous pouvez prendre votre temps et revenir sur vos réponses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value="exam" id="exam" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="exam" className="font-medium cursor-pointer">
                      Mode Examen
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mode chronométré pour tester vos connaissances dans des conditions d'examen.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <Button 
              onClick={handleStartQuiz}
              className="w-full"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Commencer le Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QuizStart
