// src/Pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.jsx';
import { sendPasswordResetEmail } from 'firebase/auth';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email.trim()) {
      return setError('Email is required');
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return setError('Please enter a valid email');
    }

    setLoading(true);

    try {
      // Debug logs to confirm what is being sent
      console.log('Attempting password reset for email:', email);
      console.log('Redirect URL:', window.location.origin + '/login');

      const actionCodeSettings = {
        url: window.location.origin + '/login', // Automatic for local & production
        // For strict testing, you can hardcode:
        // url: 'http://localhost:5173/login',
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      console.log('Password reset email sent successfully!');

      setSuccess(
        'Password reset email sent! Please check your inbox (including Spam / Junk folder).'
      );

      // Redirect to login page after 5 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (err) {
      console.error('Password reset failed with error:', {
        code: err.code,
        message: err.message,
        fullError: err,
      });

      let errorMsg = 'Failed to send reset email. Please try again.';

      switch (err.code) {
        case 'auth/invalid-email':
          errorMsg = 'The email address is invalid.';
          break;
        case 'auth/user-not-found':
          errorMsg = 'No user found with this email address.';
          break;
        case 'auth/too-many-requests':
          errorMsg = 'Too many requests. Please wait a few minutes and try again.';
          break;
        case 'auth/operation-not-allowed':
          errorMsg = 'Password reset is not enabled in your Firebase project.';
          break;
        case 'auth/invalid-api-key':
        case 'auth/invalid-credential':
          errorMsg = 'Authentication configuration error. Check Firebase setup.';
          break;
        default:
          errorMsg = err.message || errorMsg;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-container">
      <section className="forgot-hero">
        <div className="forgot-hero-content">
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
      </section>

      <section className="forgot-form-section">
        <div className="forgot-card">
          <h2>Recover Password</h2>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <form onSubmit={handleSubmit} className="forgot-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                placeholder="you@example.com"
                required
                disabled={loading || !!success}
              />
            </div>

            <button
              type="submit"
              className="btn primary-btn large"
              disabled={loading || !!success}
            >
              {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
            </button>
          </form>

          <div className="forgot-footer">
            <p>
              Remember your password? <Link to="/login">Log In</Link>
            </p>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;