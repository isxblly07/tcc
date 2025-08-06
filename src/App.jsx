import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProtectedRoute from './components/UI/ProtectedRoute'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/UI/ErrorBoundary'

// Pages
const Home = React.lazy(() => import('./pages/Home'))
const Services = React.lazy(() => import('./pages/Services'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Booking = React.lazy(() => import('./pages/Booking'))
const Appointments = React.lazy(() => import('./pages/Appointments'))
const History = React.lazy(() => import('./pages/History'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Settings = React.lazy(() => import('./pages/Settings'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))
const Reports = React.lazy(() => import('./pages/Reports'))
const ChatSupport = React.lazy(() => import('./components/UI/ChatSupport'))

const Layout = ({ children }) => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    <main className="flex-grow-1">{children}</main>
    <Footer />
    <Suspense fallback={null}>
      <ChatSupport />
    </Suspense>
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Home />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/services" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Services />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/login" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Login />
                </Suspense>
              } />
              
              <Route path="/register" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <Register />
                </Suspense>
              } />
              
              {/* Protected Routes */}
              <Route path="/booking/:serviceId" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <Booking />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/appointments" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <Appointments />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/history" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <History />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/profile" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/settings" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/reports" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <Reports />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
            </Routes>
            

          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App