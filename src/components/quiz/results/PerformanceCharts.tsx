
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
}

interface PedagogicalAnalysis {
  comprehensionRate: number
  performanceByTopic: Record<string, number>
  timeAnalysis: Record<string, number>
}

interface PerformanceChartsProps {
  analysis: any // From database
  results: QuizResult
}

const PerformanceCharts = ({ analysis, results }: PerformanceChartsProps) => {
  // Transform performance by topic data for charts
  const topicData = analysis.performance_by_topic ? 
    Object.entries(analysis.performance_by_topic as Record<string, number>).map(([topic, score]) => ({
      topic,
      score
    })) : []

  // Pie chart data for correct/incorrect answers
  const pieData = [
    { name: 'Correctes', value: results.correctAnswers, color: '#22c55e' },
    { name: 'Incorrectes', value: results.totalQuestions - results.correctAnswers, color: '#ef4444' }
  ]

  // Radar chart data for skills assessment
  const radarData = topicData.map(item => ({
    subject: item.topic,
    score: item.score,
    fullMark: 100
  }))

  const COLORS = ['#22c55e', '#ef4444']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance by Topic */}
      <Card>
        <CardHeader>
          <CardTitle>Performance par Thématique</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="topic" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
              />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Success Rate Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Réponses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Radar Chart */}
      {radarData.length > 0 && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analyse des Compétences</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PerformanceCharts
