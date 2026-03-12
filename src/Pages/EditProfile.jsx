// src/Pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: '',
    photoURL: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const u = JSON.parse(stored);
      setUserData({
        name: u.name || '',
        photoURL: u.photoURL || ''
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error("User not logged in");

      // Firebase ma update
      await updateProfile(currentUser, {
        displayName: userData.name,
        photoURL: userData.photoURL || null
      });

      // LocalStorage ma update
      const updatedUser = {
        ...JSON.parse(localStorage.getItem('user')),
        name: userData.name,
        photoURL: userData.photoURL || null
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('storage'));

      setSuccess('Profile updated successfully!');

      setTimeout(() => {
        navigate('/profile');
      }, 1500);

    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-card">
        <h1>Edit Profile</h1>

        {success && <div className="success-msg">{success}</div>}
        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Profile Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={userData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/your-photo.jpg"
            />
            <small>Paste direct image link (optional)</small>
          </div>

          <div className="button-group">
            <button 
              type="button" 
              className="btn secondary-btn"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;