import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData); // For debugging

    try {
      const response = await fetch('https://mv-backend-k53w.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate('/login');
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className='body1'>
      <div className="box1">
        <h1>Join the World of Movies – Discover, Experience, Belong!</h1>
      </div>
      <div className="box2">
        <form onSubmit={handleRegister}>
          <h2>Create Your Account</h2>

          <div className="ipbox">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <img src="../svg/person-outline.svg" alt="xx" className='svg2' />
            <label htmlFor="username">Enter Username</label>
          </div>

          <div className="ipbox">
            <img src="../svg/lock-closed-outline.svg" alt="xx" className='svg2' />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Enter Password</label>
          </div>

          <button type="submit">Continue</button>

          <div className="register">
            <p>Already registered? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
