import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import CodeReview from './pages/CodeReview'
import Contributions from './pages/Contributions'
import Settings from './pages/Settings'
import Landing from './pages/Landing'
import ErrorBoundary from './components/ErrorBoundary'
import { AuthProvider } from './contexts/AuthContext'
import { ProjectProvider } from './contexts/ProjectContext'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <AuthProvider>
          <Landing onLogin={() => setIsAuthenticated(true)} />
        </AuthProvider>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProjectProvider>
          <div className="min-h-screen bg-background">
            <Header onLogout={() => setIsAuthenticated(false)} />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/code-review" element={<CodeReview />} />
                <Route path="/contributions" element={<Contributions />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </ProjectProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
