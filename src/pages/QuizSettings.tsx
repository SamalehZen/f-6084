
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDocuments } from '@/hooks/useDocuments'
import { useQuizGeneration } from '@/hooks/useQuizGeneration'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Sparkles, FileText } from 'lucide-react'

const QuizSettings = () => {
  const { documentId } = useParams<{ documentId: string }>()
  const navigate = useNavigate()
  const { documents } = useDocuments()
  const { generateQuiz, isGenerating } = useQuizGeneration()

  const [settings, setSettings] = useState({
    questionCount: 5,
    difficulty: 'moyen' as 'facile' | 'moyen' | 'difficile',
    questionType: 'qcm' as 'qcm' | 'vrai-faux' | 'mixte'
  })

  const document = documents?.find(doc => doc.id === documentId)

  const handleGenerate = async () => {
    if (!documentId) return
    
    try {
      const result = await generateQuiz.mutateAsync({ 
        documentId, 
        settings 
      })
      
      // Rediriger vers la page de prévisualisation du quiz
      navigate(`/quiz/${result.quiz.id}/preview`)
    } catch (error) {
      console.error('Error generating quiz:', error)
    }
  }

  if (!document) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Document non trouvé</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

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
        
        <div className="flex items-center gap-3 mb-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Générer un Quiz IA</h1>
        </div>
        <p className="text-muted-foreground">
          Document: {document.title}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              Paramètres du Quiz
            </CardTitle>
            <CardDescription>
              Configurez les paramètres pour générer votre quiz personnalisé
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Nombre de questions: {settings.questionCount}</Label>
              <Slider
                value={[settings.questionCount]}
                onValueChange={(value) => setSettings(prev => ({ ...prev, questionCount: value[0] }))}
                min={3}
                max={20}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>3</span>
                <span>20</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Difficulté</Label>
              <RadioGroup 
                value={settings.difficulty} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="facile" id="facile" />
                  <Label htmlFor="facile">Facile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moyen" id="moyen" />
                  <Label htmlFor="moyen">Moyen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="difficile" id="difficile" />
                  <Label htmlFor="difficile">Difficile</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Type de questions</Label>
              <Select 
                value={settings.questionType} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, questionType: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qcm">Questions à choix multiples</SelectItem>
                  <SelectItem value="vrai-faux">Vrai/Faux</SelectItem>
                  <SelectItem value="mixte">Mixte</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu de la configuration</CardTitle>
            <CardDescription>
              Vérifiez vos paramètres avant de générer le quiz
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Document:</span>
                <p className="truncate">{document.title}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Questions:</span>
                <p>{settings.questionCount}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Difficulté:</span>
                <p className="capitalize">{settings.difficulty}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Type:</span>
                <p>{settings.questionType === 'qcm' ? 'QCM' : settings.questionType === 'vrai-faux' ? 'Vrai/Faux' : 'Mixte'}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Génération en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Générer le Quiz IA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default QuizSettings
