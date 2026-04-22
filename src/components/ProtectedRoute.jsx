import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;

