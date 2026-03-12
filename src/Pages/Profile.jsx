import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) return null;

  const avatar = user.photoURL 
    ? <img src={user.photoURL} alt={user.name} className="profile-avatar-img" />
    : <div className="profile-avatar-letter">{user.name?.charAt(0).toUpperCase()}</div>;

  return (
    <div className="profile-container">
      {/* Hero Section */}
      <section className="profile-hero">
        <div className="profile-hero-content">
          <h1>My Profile</h1>
          <p>Welcome back, {user.name}!</p>
        </div>
      </section>

      {/* Profile Card */}
      <section className="profile-section">
        <div className="profile-card">
          <div className="avatar-container">
            {avatar}
          </div>

          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>

          <div className="profile-info-grid">
            <div className="info-item">
              <span className="info-label">User ID</span>
              <span className="info-value">{user.uid}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">2025</span>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              className="btn primary-btn large"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
            </button>
            
            <button 
              className="btn secondary-btn large"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;