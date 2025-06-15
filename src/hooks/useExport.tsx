
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  answers: any[]
  questions: any[]
}

interface ExportOptions {
  includeCharts: boolean
  includeLogo: boolean
  format: 'pdf' | 'csv' | 'print'
}

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const exportToPDF = async (results: QuizResult, quizTitle: string, options: ExportOptions = {
    includeCharts: true,
    includeLogo: true,
    format: 'pdf'
  }) => {
    setIsExporting(true)
    try {
      // Dynamically import jsPDF to avoid loading it on initial bundle
      const { default: jsPDF } = await import('jspdf')
      const { default: html2canvas } = await import('html2canvas')
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      
      // Add logo if requested
      if (options.includeLogo) {
        pdf.setFontSize(20)
        pdf.text('Quiz Results', 20, 30)
      }
      
      // Add quiz title
      pdf.setFontSize(16)
      pdf.text(quizTitle, 20, 50)
      
      // Add results summary
      pdf.setFontSize(12)
      const summary = [
        `Score: ${results.score.toFixed(1)}/20 (${results.percentage.toFixed(1)}%)`,
        `Questions réussies: ${results.correctAnswers}/${results.totalQuestions}`,
        `Temps total: ${Math.floor(results.timeSpent / 60)}min ${results.timeSpent % 60}s`,
        `Date: ${new Date().toLocaleDateString('fr-FR')}`
      ]
      
      summary.forEach((line, index) => {
        pdf.text(line, 20, 70 + (index * 10))
      })
      
      // Add charts if requested and available
      if (options.includeCharts) {
        const chartElement = document.querySelector('[data-export-charts]')
        if (chartElement) {
          const canvas = await html2canvas(chartElement as HTMLElement)
          const imgData = canvas.toDataURL('image/png')
          const imgWidth = pageWidth - 40
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          
          if (imgHeight < pageHeight - 140) {
            pdf.addImage(imgData, 'PNG', 20, 120, imgWidth, imgHeight)
          }
        }
      }
      
      pdf.save(`quiz-results-${Date.now()}.pdf`)
      
      toast({
        title: "Export réussi",
        description: "Les résultats ont été exportés en PDF.",
      })
    } catch (error) {
      console.error('Export PDF failed:', error)
      toast({
        variant: "destructive",
        title: "Erreur d'export",
        description: "Impossible d'exporter en PDF.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = (results: QuizResult, quizTitle: string) => {
    setIsExporting(true)
    try {
      const headers = ['Question', 'Réponse donnée', 'Réponse correcte', 'Correct', 'Temps (s)']
      const csvData = [
        headers,
        ...results.answers.map((answer, index) => {
          const question = results.questions[index]
          const isCorrect = question?.correctAnswer === answer.answer
          
          return [
            `"Question ${index + 1}"`,
            `"${answer.answer}"`,
            `"${question?.correctAnswer || 'N/A'}"`,
            isCorrect ? 'Oui' : 'Non',
            answer.timeSpent?.toString() || '0'
          ]
        }),
        [],
        ['Résumé'],
        ['Score', `${results.score.toFixed(1)}/20`],
        ['Pourcentage', `${results.percentage.toFixed(1)}%`],
        ['Questions correctes', `${results.correctAnswers}/${results.totalQuestions}`],
        ['Temps total', `${results.timeSpent}s`],
        ['Date', new Date().toLocaleDateString('fr-FR')]
      ]
      
      const csvContent = csvData.map(row => row.join(',')).join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `quiz-results-${Date.now()}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: "Export réussi",
        description: "Les résultats ont été exportés en CSV.",
      })
    } catch (error) {
      console.error('Export CSV failed:', error)
      toast({
        variant: "destructive",
        title: "Erreur d'export",
        description: "Impossible d'exporter en CSV.",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const printResults = () => {
    window.print()
  }

  return {
    exportToPDF,
    exportToCSV,
    printResults,
    isExporting
  }
}
