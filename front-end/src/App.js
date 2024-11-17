import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import AdminDash from './pages/AdminDash';
import Customer from './pages/Customer';
import LoanCreator from './pages/LoanCreator';
import SpecificLoan from './pages/SpecificLoan';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Handle tab/window close
    const handleBeforeUnload = () => {
      localStorage.removeItem('user');
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);

    };
  }, []);

  // Function to check user auth status and return appropriate redirect
  const getHomeRedirect = () => {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return <Navigate to="/login" />;
    }
    const user = JSON.parse(userString);
    return user.user_type ? <Navigate to="/admindash" /> : <Navigate to="/customer" />;
  };

  return (
    <Routes>
      {/* Root route */}
      <Route path="/" element={getHomeRedirect()} />

      {/* Auth route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route 
        path="/admindash" 
        element={
          <PrivateRoute requiredRole={true}>
            <AdminDash />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/customer" 
        element={
          <PrivateRoute requiredRole={false}>
            <Customer />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/loan/:loanid" 
        element={
          <PrivateRoute requiredRole={true}>
            <SpecificLoan />
          </PrivateRoute>
        } 
      />
        
      <Route 
        path="/loancreator" 
        element={
          <PrivateRoute requiredRole={true}>
            <LoanCreator />
          </PrivateRoute>
        } 
      />

      {/* Catch all for invalid routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
