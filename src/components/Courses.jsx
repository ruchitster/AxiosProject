import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext.jsx';
import axios from 'axios';

// Fake courses data - simulates axios GET /api/courses (protected endpoint)
const fetchCourses = async () => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In real app: const response = await axios.get('/api/courses', { headers: { Authorization: `Bearer ${token}` } });
  return [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Master React hooks, state, and components',
      price: 49.99,
      image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=React'
    },
    {
      id: 2,
      title: 'JavaScript Advanced',
      description: 'Async/await, closures, prototypes deep dive',
      price: 39.99,
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=JS'
    },
    {
      id: 3,
      title: 'Node.js & Express',
      description: 'Build REST APIs with Node and Express',
      price: 59.99,
      image: 'https://via.placeholder.com/300x200/059669/ffffff?text=Node.js'
    },
    {
      id: 4,
      title: 'MongoDB Basics',
      description: 'NoSQL database design and CRUD operations',
      price: 29.99,
      image: 'https://via.placeholder.com/300x200/ef4444/ffffff?text=MongoDB'
    },
    {
      id: 5,
      title: 'Full Stack MERN',
      description: 'Complete MERN stack project from scratch',
      price: 79.99,
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=MERN'
    },
    {
      id: 6,
      title: 'JWT Authentication',
      description: 'Secure your apps with JWT tokens',
      price: 44.99,
      image: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=JWT'
    }
  ];
};

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Load courses on mount - simulates useEffect axios call
  useEffect(() => {
    fetchCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="loading">Loading courses...</div>;
  }

  return (
    <div className="courses-container">
      <h1>Available Courses</h1>
      <p className="courses-subtitle">Add courses to your cart (persists across sessions)</p>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-price">${course.price}</div>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(course)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

