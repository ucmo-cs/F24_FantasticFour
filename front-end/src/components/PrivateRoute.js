import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, requiredRole }) {
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userString);
  
  // Check if user has required role
  if (requiredRole !== undefined && user.user_type !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default PrivateRoute; 