import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, login, logout, loading } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} replace />} />
        <Route path="/login" element={user ? <Navigate to="/profile" replace /> : <Login login={login} />} />
        <Route path="/signup" element={user ? <Navigate to="/profile" replace /> : <Signup />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Profile user={user} logout={logout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
