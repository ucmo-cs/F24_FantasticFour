import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './Pages/Login';
import AdminDash from './Pages/AdminDash';
import Customer from './Pages/Customer';
import LoanCreator from './Pages/LoanCreator';

function App() {
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
