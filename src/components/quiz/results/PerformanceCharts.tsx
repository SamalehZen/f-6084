
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react'

interface QuizResult {
  score: number
  percentage: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
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
    { name: 'Correctes', value: results.correctAnswers, color: '#10b981' },
    { name: 'Incorrectes', value: results.totalQuestions - results.correctAnswers, color: '#ef4444' }
  ]

  // Radar chart data for skills assessment
  const radarData = topicData.map(item => ({
    subject: item.topic,
    score: item.score,
    fullMark: 100
  }))

  const COLORS = ['#10b981', '#ef4444']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Performance by Topic */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            Performance par Thématique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="topic" 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Score']}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Success Rate Pie Chart */}
      <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center">
              <PieChartIcon className="h-5 w-5 text-emerald-600" />
            </div>
            Répartition des Réponses
          </CardTitle>
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
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Skills Radar Chart */}
      {radarData.length > 0 && (
        <Card className="lg:col-span-2 border-0 shadow-xl bg-card/50 backdrop-blur-sm cosmic-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              Analyse des Compétences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default PerformanceCharts
