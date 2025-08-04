import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProtectedRoute from './components/UI/ProtectedRoute'
import LoadingSpinner from './components/UI/LoadingSpinner'
import ErrorBoundary from './components/UI/ErrorBoundary'

// Lazy load components
const Home = React.lazy(() => import('./pages/institutional/Home'))
const About = React.lazy(() => import('./pages/institutional/About'))
const Services = React.lazy(() => import('./pages/Services'))
const Contact = React.lazy(() => import('./pages/institutional/Contact'))
const Design = React.lazy(() => import('./pages/institutional/Design'))
const Hair = React.lazy(() => import('./pages/categories/Hair'))
const Nails = React.lazy(() => import('./pages/categories/Nails'))
const Makeup = React.lazy(() => import('./pages/categories/Makeup'))
const Skincare = React.lazy(() => import('./pages/categories/Skincare'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
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
const LGPD = React.lazy(() => import('./pages/LGPD'))
const ChatSupport = React.lazy(() => import('./components/UI/ChatSupport'))

// Admin Pages
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboardNew = React.lazy(() => import('./pages/admin/AdminDashboard'))
const AdminAppointments = React.lazy(() => import('./pages/admin/AdminAppointments'))
const AdminServices = React.lazy(() => import('./pages/admin/AdminServices'))
const AdminReports = React.lazy(() => import('./pages/admin/AdminReports'))

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
              {/* Main Routes */}
              <Route path="/" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Home />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/sobre" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <About />
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
              
              <Route path="/contato" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Contact />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/design" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Design />
                  </Suspense>
                </Layout>
              } />
              
              {/* Category Routes */}
              <Route path="/cabelo" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Hair />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/manicure" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Nails />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/maquiagem" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Makeup />
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/cuidados" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Skincare />
                  </Suspense>
                </Layout>
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
              
              <Route path="/agenda" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <Agenda />
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
              
              <Route path="/lgpd" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute>
                      <LGPD />
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
              
              <Route path="/admin/services" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <ServiceManagement />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              {/* Auth Routes */}
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
              
              {/* Admin Auth Routes */}
              <Route path="/admin/login" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AdminLogin />
                </Suspense>
              } />
              
              <Route path="/admin/dashboard" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <AdminDashboardNew />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/admin/appointments" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <AdminAppointments />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/admin/services" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <AdminServices />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
              
              <Route path="/admin/reports" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner />}>
                    <ProtectedRoute adminOnly>
                      <AdminReports />
                    </ProtectedRoute>
                  </Suspense>
                </Layout>
              } />
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