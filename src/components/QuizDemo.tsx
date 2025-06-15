
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Brain, CheckCircle2 } from 'lucide-react';

const QuizDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Upload PDF",
      content: (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Glissez votre PDF ici</h3>
          <p className="text-muted-foreground mb-4">Ou cliquez pour sélectionner un fichier</p>
          <Button variant="outline" size="sm">Choisir un fichier</Button>
        </div>
      )
    },
    {
      title: "Analyse IA",
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h4 className="font-medium">Introduction à la Physique Quantique</h4>
              <p className="text-sm text-muted-foreground">15 pages • Analysé par IA</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm">Extraction des concepts clés...</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-1000"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Quiz Généré",
      content: (
        <div className="space-y-4">
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-medium mb-3">Question 1/5</h4>
            <p className="mb-4">Quel est le principe fondamental de la mécanique quantique ?</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <input type="radio" name="q1" className="text-primary" />
                <span>La dualité onde-particule</span>
              </label>
              <label className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <input type="radio" name="q1" className="text-primary" />
                <span>La relativité générale</span>
              </label>
              <label className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                <input type="radio" name="q1" className="text-primary" />
                <span>La thermodynamique</span>
              </label>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm">Précédent</Button>
            <Button size="sm">Suivant</Button>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Steps Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-medium text-foreground">Création de Quiz</h3>
        <div className="flex items-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="flex-1">
        <div className="mb-4">
          <h4 className="text-lg font-medium flex items-center gap-2">
            {currentStep === steps.length - 1 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
            {steps[currentStep].title}
          </h4>
        </div>
        <div className="h-96">
          {steps[currentStep].content}
        </div>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center gap-2 mt-6">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizDemo;
