import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="../svg/popcorn.png" alt="MovieVerse Logo" className="footer-logo-img" />
            <h3>MovieVerse</h3>
          </div>
          <p>Your ultimate destination for movies and TV shows</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/mylist">My List</Link></li>
            <li><Link to="/">Movies</Link></li>
            <li><Link to="/">TV Shows</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/">Trending Now</Link></li>
            <li><Link to="/">Popular Movies</Link></li>
            <li><Link to="/">Top Rated</Link></li>
            <li><Link to="/">Coming Soon</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="#"><i className="fa-brands fa-facebook"></i></a>
            <a href="#"><i className="fa-brands fa-twitter"></i></a>
            <a href="#"><i className="fa-brands fa-instagram"></i></a>
            <a href="#"><i className="fa-brands fa-youtube"></i></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MovieVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
