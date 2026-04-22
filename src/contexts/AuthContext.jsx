import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create Auth Context
const AuthContext = createContext();

// Fake users storage (simulates backend)
const getStoredUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check persisted login on mount (JWT token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode JWT payload (base64)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser(payload);
        setIsLoggedIn(true);
      } catch (err) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Login function - simulates axios POST to /api/login with JWT
  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      const storedUser = users.find(u => u.email === email && u.password === password);

      if (!storedUser && !demoLogin(email, password)) {
        throw new Error('Invalid email or password');
      }

      // Use stored or demo user data
      const userData = storedUser || { email, name: 'Demo Student', role: 'student' };

      // Generate fake JWT
      const fakeToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiR7dXNlckRhdGEuZW1haWx9IiwibmFtZSI6IiR7dXNlckRhdGEubmFtZX0iLCJyb2xlIjoidHVkZW50IiwiaWF0IjoxNzMwMDAwMDAwfQ.fakeSignature`;
      localStorage.setItem('token', fakeToken);
      setUser(userData);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      throw err;
    }
  };

  // Demo login for unregistered users
  const demoLogin = (email, password) => {
    return email === 'test@example.com' && password === '123456';
  };

  // Register function - simulates axios POST to /api/register
  const register = async (userData) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = getStoredUsers();
      if (users.find(u => u.email === userData.email)) {
        throw new Error('User already exists');
      }

      const newUser = { ...userData, id: Date.now(), role: 'student' };
      users.push(newUser);
      saveUsers(users);

      // Auto login after register
      await login(userData.email, userData.password);
    } catch (err) {
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/login');
  };

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;

