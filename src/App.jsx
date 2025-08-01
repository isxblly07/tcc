import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import InstitutionalLayout from './components/Layout/InstitutionalLayout'
import ProtectedRoute from './components/UI/ProtectedRoute'

// Institutional Pages
import InstitutionalHome from './pages/institutional/Home'
import About from './pages/institutional/About'
import InstitutionalServices from './pages/institutional/Services'
import InstitutionalBooking from './pages/institutional/Booking'
import Contact from './pages/institutional/Contact'
import Design from './pages/institutional/Design'

// App Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Appointments from './pages/Appointments'
import History from './pages/History'
import AdminDashboard from './pages/AdminDashboard'
import Review from './pages/Review'
import ChatSupport from './components/UI/ChatSupport'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Institutional Site Routes */}
            <Route path="/" element={<InstitutionalLayout />}>
              <Route index element={<InstitutionalHome />} />
              <Route path="sobre" element={<About />} />
              <Route path="servicos" element={<InstitutionalServices />} />
              <Route path="agendamento" element={<InstitutionalBooking />} />
              <Route path="contato" element={<Contact />} />
              <Route path="design" element={<Design />} />
            </Route>
            
            {/* App Routes */}
            <Route path="/app/*" element={
              <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1">
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
                  </Routes>
                </main>
                <Footer />
                <ChatSupport />
              </div>
            } />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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
  )
}

export default App