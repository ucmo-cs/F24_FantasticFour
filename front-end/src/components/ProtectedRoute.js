import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requireAdmin }) {
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userString);
  
  if (requireAdmin && !user.user_type) {
    return <Navigate to="/customer" />;
  }

  if (!requireAdmin && user.user_type) {
    return <Navigate to="/admindash" />;
  }

  return children;
} 