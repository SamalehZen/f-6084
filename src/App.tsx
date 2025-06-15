
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/hooks/useAuth'
import AppLayout from '@/components/layout/AppLayout'
import Index from '@/pages/Index'
import Auth from '@/pages/Auth'
import Dashboard from '@/pages/Dashboard'
import Documents from '@/pages/Documents'
import Upload from '@/pages/Upload'
import QuizSettings from '@/pages/QuizSettings'
import QuizPreview from '@/pages/QuizPreview'
import QuizStart from '@/pages/QuizStart'
import QuizTake from '@/pages/QuizTake'
import QuizResults from '@/pages/QuizResults'
import Profile from '@/pages/Profile'
import AdminDashboard from '@/pages/AdminDashboard'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Documents />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Upload />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Profile />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AppLayout>
                    <AdminDashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/settings"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <QuizSettings />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/preview"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <QuizPreview />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/start"
              element={
                <ProtectedRoute>
                  <QuizStart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/take"
              element={
                <ProtectedRoute>
                  <QuizTake />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:quizId/results"
              element={
                <ProtectedRoute>
                  <QuizResults />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user } = useAuth()

  if (!user) {
    window.location.href = '/auth'
    return null
  }

  // Note: Pour l'instant, on ne vérifie pas le rôle admin côté route
  // Cette vérification pourrait être ajoutée plus tard avec un hook useUserRoles

  return <>{children}</>
}

export default App
