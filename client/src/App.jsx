import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router'
import Login from './features/auth/Login.jsx'
import Register from './features/auth/Register.jsx'
import Rooms from './features/rooms/Rooms.jsx'
import Room from './features/room/Room.jsx'
import LandingPage from './components/LandingPage.jsx'
import { useAuth } from './contexts/AuthContext.jsx'
import ErrorBoundary from './app/ErrorBoundary.jsx'

function Protected({ children }){
  const { token } = useAuth()
  if(!token) return <Navigate to="/login" replace />
  return children
}

function AuthenticatedHeader() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-semibold text-slate-700 cursor-pointer" onClick={() => navigate('/rooms')}>
          Arisan Realtime
        </div>
        <div className="flex items-center gap-3">
          {user && <span className="text-slate-600 text-sm">Hai, {user.name}</span>}
          {user && <button onClick={logout} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm">Logout</button>}
        </div>
      </div>
    </header>
  )
}

export default function App(){
  return (
    <div className="min-h-screen">
      <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/rooms" element={
            <Protected>
              <AuthenticatedHeader />
              <main className="max-w-6xl mx-auto px-4 py-6">
                <Rooms />
              </main>
            </Protected>
          } />
          <Route path="/rooms/:id" element={
            <Protected>
              <AuthenticatedHeader />
              <main className="max-w-6xl mx-auto px-4 py-6">
                <Room />
              </main>
            </Protected>
          } />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}
