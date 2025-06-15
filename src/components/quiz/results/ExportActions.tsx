
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Download, FileText, Printer } from 'lucide-react'
import { useExport } from '@/hooks/useExport'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  answers: any[]
  questions: any[]
}

interface ExportActionsProps {
  results: QuizResult
  quizTitle: string
}

const ExportActions = ({ results, quizTitle }: ExportActionsProps) => {
  const { exportToPDF, exportToCSV, printResults, isExporting } = useExport()

  const handlePDFExport = () => {
    exportToPDF(results, quizTitle, {
      includeCharts: true,
      includeLogo: true,
      format: 'pdf'
    })
  }

  const handleCSVExport = () => {
    exportToCSV(results, quizTitle)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Export en cours...' : 'Exporter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handlePDFExport}>
          <FileText className="mr-2 h-4 w-4" />
          Export PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCSVExport}>
          <FileText className="mr-2 h-4 w-4" />
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={printResults}>
          <Printer className="mr-2 h-4 w-4" />
          Imprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportActions
