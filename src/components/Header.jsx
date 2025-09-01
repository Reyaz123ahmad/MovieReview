


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css'; 

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          <Link to="/" className="logo">MovieReviews</Link>
          
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/movies" className="nav-link">Movies</Link>
            {currentUser && (
              <Link to={`/profile/${currentUser.id}`} className="nav-link">Profile</Link>
            )}
          </nav>

          <div className="user-section">
            {currentUser ? (
              <div className="user-menu">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="user-button"
                >
                  <div className="user-avatar">
                    {currentUser.username?.charAt(0).toUpperCase()}
                  </div>
                  <span>{currentUser.username}</span>
                </button>

                {isMenuOpen && (
                  <div className="dropdown">
                    <Link 
                      to={`/profile/${currentUser.id}`} 
                      className="dropdown-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
