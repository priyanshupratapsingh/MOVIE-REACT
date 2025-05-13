import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/login.css';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request starts

    try {
      const response = await fetch('https://mv-backend-k53w.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        login(result.token); // Save token via AuthContext
        navigate('/'); // Navigate to home
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false); // Set loading to false when request ends
    }
  };

  return (
    <div className='body1'>
      <div className="box1">
        <h1>Welcome to the World of Movies – Continue, Explore, Enjoy!</h1>
      </div>
      <div className="box2">
        <form onSubmit={handleLogin}>
          <h2>Log in</h2>

          <div className="ipbox">
            <img src="../svg/person-outline.svg" alt="user" className='svg2' />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="username">Username</label>
          </div>

          <div className="ipbox">
            <img src="../svg/lock-closed-outline.svg" alt="password" className='svg2' />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? (
              <div className="loader">
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Logging in...</span>
              </div>
            ) : (
              'Log in'
            )}
          </button>

          
          <div className="register">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
