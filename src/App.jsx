import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Courses from './components/Courses.jsx';
import Cart from './components/Cart.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css';

// Dashboard component - combines courses and cart
const Dashboard = () => (
  <div className="dashboard-container">
    <div className="dashboard-grid">
      <div className="courses-section">
        <h2>Browse Courses</h2>
        <Courses />
      </div>
      <div className="cart-section">
        <h2>Your Cart</h2>
        <Cart />
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/courses" 
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;


