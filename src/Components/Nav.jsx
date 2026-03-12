import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <nav className="navbar">
      <div className="logo">RecipeShare</div>

      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="/recipes" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
            Recipes
          </NavLink>
        </li>
        <li>
          <NavLink to="/share" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
            Share Recipe
          </NavLink>
        </li>
        <li>
          <NavLink to="/contactus" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} onClick={closeMenu}>
            Contact Us
          </NavLink>
        </li>
        <li className="search-bar">
          <input type="text" placeholder="Search recipes..." />
          <button type="submit">🔍</button>
        </li>
      </ul>

      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? "auth-btn profile-btn active" : "auth-btn profile-btn"}
            >
              {user?.name ? `Hi, ${user.name}` : 'Profile'}
            </NavLink>
            <button onClick={handleLogout} className="auth-btn logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "auth-btn signup-btn active" : "auth-btn signup-btn"}>
              Sign Up
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "auth-btn login-btn active" : "auth-btn login-btn"}>
              Login
            </NavLink>
          </>
        )}
      </div>

      <button
        className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
};

export default Nav;