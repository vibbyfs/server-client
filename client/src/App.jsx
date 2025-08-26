import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from './features/auth/Login.jsx';
import Register from './features/auth/Register.jsx';
import { RoomsList } from './features/room/RoomsList.jsx';
import Room from './features/room/Room.jsx';
import LandingPage from './components/LandingPage.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import ErrorBoundary from './app/ErrorBoundary.jsx';

function Protected({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
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
                <RoomsList />
              </Protected>
            } />
            <Route path="/rooms/:id" element={
              <Protected>
                <Room />
              </Protected>
            } />
            
            {/* Catch all - redirect authenticated users to rooms, others to landing */}
            <Route path="*" element={<ProtectedRedirect />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRedirect() {
  const { token } = useAuth();
  return <Navigate to={token ? "/rooms" : "/"} replace />;
}
