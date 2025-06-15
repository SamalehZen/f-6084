
import { lazy } from 'react'

// Lazy loading des composants quiz lourds
export const LazyPerformanceCharts = lazy(() => import('@/components/quiz/results/PerformanceCharts'))
export const LazyAIAnalysis = lazy(() => import('@/components/quiz/results/AIAnalysis'))
export const LazyQuestionReview = lazy(() => import('@/components/quiz/results/QuestionReview'))
export const LazyImprovementSuggestions = lazy(() => import('@/components/quiz/results/ImprovementSuggestions'))

// Lazy loading des pages
export const LazyQuizTake = lazy(() => import('@/pages/QuizTake'))
export const LazyQuizResults = lazy(() => import('@/pages/QuizResults'))
export const LazyAdminDashboard = lazy(() => import('@/pages/AdminDashboard'))
