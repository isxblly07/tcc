import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import InstitutionalLayout from './components/Layout/InstitutionalLayout'
import ProtectedRoute from './components/UI/ProtectedRoute'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/UI/ErrorBoundary'

// Lazy load components
const InstitutionalHome = React.lazy(() => import('./pages/institutional/Home'))
const About = React.lazy(() => import('./pages/institutional/About'))
const InstitutionalServices = React.lazy(() => import('./pages/institutional/Services'))
const InstitutionalBooking = React.lazy(() => import('./pages/institutional/Booking'))
const Contact = React.lazy(() => import('./pages/institutional/Contact'))
const Design = React.lazy(() => import('./pages/institutional/Design'))
const Hair = React.lazy(() => import('./pages/categories/Hair'))
const Nails = React.lazy(() => import('./pages/categories/Nails'))
const Makeup = React.lazy(() => import('./pages/categories/Makeup'))
const Skincare = React.lazy(() => import('./pages/categories/Skincare'))
const Home = React.lazy(() => import('./pages/Home'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Services = React.lazy(() => import('./pages/Services'))
const Booking = React.lazy(() => import('./pages/Booking'))
const Appointments = React.lazy(() => import('./pages/Appointments'))
const History = React.lazy(() => import('./pages/History'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))
const Review = React.lazy(() => import('./pages/Review'))
const Agenda = React.lazy(() => import('./pages/Agenda'))
const Profile = React.lazy(() => import('./pages/Profile'))
const Settings = React.lazy(() => import('./pages/Settings'))
const Reports = React.lazy(() => import('./pages/Reports'))
const Payment = React.lazy(() => import('./pages/Payment'))
const Reschedule = React.lazy(() => import('./pages/Reschedule'))
const TwoFactorAuth = React.lazy(() => import('./pages/TwoFactorAuth'))
const ServiceManagement = React.lazy(() => import('./pages/admin/ServiceManagement'))
const ChatSupport = React.lazy(() => import('./components/UI/ChatSupport'))

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
          <Routes>
            {/* Institutional Site Routes */}
            <Route path="/" element={<InstitutionalLayout />}>
              <Route index element={<Suspense fallback={<LoadingSpinner />}><InstitutionalHome /></Suspense>} />
              <Route path="sobre" element={<Suspense fallback={<LoadingSpinner />}><About /></Suspense>} />
              <Route path="servicos" element={<Suspense fallback={<LoadingSpinner />}><InstitutionalServices /></Suspense>} />
              <Route path="agendamento" element={<Suspense fallback={<LoadingSpinner />}><InstitutionalBooking /></Suspense>} />
              <Route path="contato" element={<Suspense fallback={<LoadingSpinner />}><Contact /></Suspense>} />
              <Route path="design" element={<Suspense fallback={<LoadingSpinner />}><Design /></Suspense>} />
              <Route path="cabelo" element={<Suspense fallback={<LoadingSpinner />}><Hair /></Suspense>} />
              <Route path="manicure" element={<Suspense fallback={<LoadingSpinner />}><Nails /></Suspense>} />
              <Route path="maquiagem" element={<Suspense fallback={<LoadingSpinner />}><Makeup /></Suspense>} />
              <Route path="cuidados" element={<Suspense fallback={<LoadingSpinner />}><Skincare /></Suspense>} />
            </Route>
            
            {/* App Routes */}
            <Route path="/app/*" element={
              <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="services" element={<Services />} />
                    
                    <Route path="booking/:serviceId" element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="appointments" element={
                      <ProtectedRoute>
                        <Appointments />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="history" element={
                      <ProtectedRoute>
                        <History />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="admin" element={
                      <ProtectedRoute adminOnly>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="review/:appointmentId" element={
                      <ProtectedRoute>
                        <Review />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="agenda" element={
                      <ProtectedRoute>
                        <Agenda />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="reports" element={
                      <ProtectedRoute adminOnly>
                        <Reports />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="payment/:appointmentId" element={
                      <ProtectedRoute>
                        <Payment />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="reschedule/:appointmentId" element={
                      <ProtectedRoute>
                        <Reschedule />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="two-factor" element={
                      <ProtectedRoute>
                        <TwoFactorAuth />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="admin/services" element={
                      <ProtectedRoute adminOnly>
                        <ServiceManagement />
                      </ProtectedRoute>
                    } />
                  </Routes>
                  </Suspense>
                </main>
                <Footer />
                <Suspense fallback={null}>
                  <ChatSupport />
                </Suspense>
              </div>
            } />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Suspense fallback={<LoadingSpinner />}><Login /></Suspense>} />
            <Route path="/register" element={<Suspense fallback={<LoadingSpinner />}><Register /></Suspense>} />
          </Routes>
          
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App