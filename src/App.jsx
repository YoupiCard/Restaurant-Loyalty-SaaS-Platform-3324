import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SpinWheelPage from './pages/SpinWheelPage'
import './App.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  return user ? <Navigate to="/dashboard" /> : children
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              
              {/* Spin Wheel - Public but requires establishment ID */}
              <Route path="/spin/:establishmentId" element={<SpinWheelPage />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="establishments" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Établissements</h2>
                    <p className="text-gray-600 mt-2">Page en cours de développement</p>
                  </div>
                } />
                <Route path="rewards" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Récompenses</h2>
                    <p className="text-gray-600 mt-2">Page en cours de développement</p>
                  </div>
                } />
                <Route path="analytics" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Analyses</h2>
                    <p className="text-gray-600 mt-2">Page en cours de développement</p>
                  </div>
                } />
                <Route path="settings" element={
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
                    <p className="text-gray-600 mt-2">Page en cours de développement</p>
                  </div>
                } />
              </Route>
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App