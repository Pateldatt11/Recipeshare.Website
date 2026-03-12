// src/Pages/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
} from 'firebase/auth';

import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ==================== LOCALSTORAGE SAVE HELPER ====================
  const saveUserToLocalStorage = (firebaseUser) => {
    if (!firebaseUser) return;
    const userData = {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL || null,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    window.dispatchEvent(new Event('storage'));
  };
  // =================================================================

  useEffect(() => {
    console.log("Firebase Auth in SignUp:", auth);
  }, []);

  const getFriendlyError = (code) => {
    const map = {
      'auth/email-already-in-use': 'This email is already registered. Try logging in.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/weak-password': 'Password should be at least 6 characters long.',
      'auth/operation-not-allowed': 'This sign-up method is not enabled.',
      'auth/network-request-failed': 'Network error.',
      'auth/too-many-requests': 'Too many attempts.',
      'auth/popup-blocked': 'Popup blocked by browser.',
      'auth/account-exists-with-different-credential': 'Account exists with different credential.',
    };
    return map[code];
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');

    if (!formData.fullName.trim()) return setError('Full name is required');
    if (!formData.email.trim()) return setError('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setError('Invalid email');
    if (formData.password.length < 6) return setError('Password must be at least 6 characters');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match');
    if (!formData.agreeTerms) return setError('You must agree to terms');

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.fullName.trim() });

      saveUserToLocalStorage(userCredential.user);

      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      setError(getFriendlyError(err.code) || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider) => {
    if (loading) return;
    setError(''); setSuccess(''); setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        saveUserToLocalStorage(result.user);
        setSuccess("Success! Redirecting to home...");
        setTimeout(() => navigate('/'), 1800);
      }
    } catch (err) {
      setError(getFriendlyError(err.code) || 'Social signup failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => handleSocialSignUp(new GoogleAuthProvider());
  const handleFacebook = () => handleSocialSignUp(new FacebookAuthProvider());
  const handleGithub = () => handleSocialSignUp(new GithubAuthProvider());
  const handleMicrosoft = () => {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('email'); provider.addScope('profile');
    handleSocialSignUp(provider);
  };
  const handleApple = () => handleSocialSignUp(new OAuthProvider('apple.com'));

  return (
    <div className="signup-container">
      {/* FULL ORIGINAL JSX */}
      <section className="signup-hero">
        <div className="signup-hero-content">
          <h1>Join RecipeShare</h1>
          <p>Create your account and start sharing your favorite recipes today!</p>
        </div>
      </section>

      <section className="signup-form-section">
        <div className="signup-card">
          <h2>Create Account</h2>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <form onSubmit={handleSubmit} className="signup-form" noValidate>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Patel Datt" required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required disabled={loading} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" required disabled={loading} />
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="agreeTerms" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} disabled={loading} />
              <label htmlFor="agreeTerms">I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link></label>
            </div>

            <button type="submit" className="btn primary-btn large" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </div>

          <div className="social-signup">
            <p>Or sign up with</p>
            <div className="social-buttons">
              <button onClick={handleGoogle} className="social-btn google" disabled={loading}>Google</button>
              <button onClick={handleFacebook} className="social-btn facebook" disabled={loading}>Facebook</button>
              <button onClick={handleGithub} className="social-btn github" disabled={loading}>GitHub</button>
              <button onClick={handleMicrosoft} className="social-btn microsoft" disabled={loading}>Microsoft</button>
              <button onClick={handleApple} className="social-btn apple" disabled={loading}>Apple</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;