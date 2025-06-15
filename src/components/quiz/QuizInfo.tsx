
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface QuizSettings {
  difficulty?: string
  questionType?: string
  questionCount?: number
}

interface QuizInfoProps {
  isPublished: boolean
  questionCount: number
  settings: QuizSettings
}

const QuizInfo = ({ isPublished, questionCount, settings }: QuizInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations du Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <span className="text-sm font-medium text-muted-foreground">Statut</span>
            <div className="mt-1">
              <Badge variant={isPublished ? "default" : "secondary"}>
                {isPublished ? "Publié" : "Brouillon"}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Questions</span>
            <p className="text-lg font-semibold">{questionCount}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Difficulté</span>
            <p className="text-lg font-semibold capitalize">
              {settings.difficulty || 'Non définie'}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-muted-foreground">Type</span>
            <p className="text-lg font-semibold">
              {settings.questionType === 'qcm' ? 'QCM' : 
               settings.questionType === 'vrai-faux' ? 'Vrai/Faux' : 
               'Mixte'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuizInfo
