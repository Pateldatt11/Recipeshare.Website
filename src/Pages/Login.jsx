// src/Pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,          // ← added for popup consistency
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  updateProfile,
} from 'firebase/auth';

import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // New states for name prompt (when social login has no displayName)
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [nameInput, setNameInput] = useState('');

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

  const getFriendlyError = (code) => {
    const errors = {
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/operation-not-allowed': 'This sign-in method is not enabled.',
      'auth/account-exists-with-different-credential': 'An account already exists with a different sign-in method.',
      'auth/popup-blocked': 'Popup blocked by browser. Please allow popups.',
      'auth/popup-closed-by-user': 'Sign-in cancelled.',
    };
    return errors[code];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email.trim()) return setError('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return setError('Please enter a valid email');
    if (!formData.password) return setError('Password is required');

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      saveUserToLocalStorage(userCredential.user);

      setSuccess('Welcome back! Redirecting...');
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      setError(getFriendlyError(err.code) || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  // ────────────────────────────────────────────────
  //     IMPROVED SOCIAL LOGIN (popup + redirect)
  // ────────────────────────────────────────────────
  const handleSocialLoginPopup = async (provider) => {
    if (loading) return;
    setError(''); setSuccess(''); setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await handleUserAfterSocial(user);
      }
    } catch (err) {
      if (!['auth/popup-closed-by-user', 'auth/popup-blocked'].includes(err.code)) {
        setError(getFriendlyError(err.code) || 'Social login failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUserAfterSocial = async (user) => {
    if (!user.displayName) {
      // Missing name → show prompt
      setTempUser(user);
      setShowNamePrompt(true);
      return;
    }

    // Has name → finalize
    await finalizeSocialUser(user);
  };

  const finalizeSocialUser = async (user) => {
    saveUserToLocalStorage(user);
    setSuccess('Logged in successfully! Redirecting...');
    setTimeout(() => navigate('/'), 1800);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      setError('Please enter your full name');
      return;
    }

    try {
      setLoading(true);
      await updateProfile(tempUser, {
        displayName: nameInput.trim(),
      });

      // Get fresh user object
      const updatedUser = auth.currentUser;
      saveUserToLocalStorage(updatedUser);

      setShowNamePrompt(false);
      setSuccess('Profile updated! Redirecting...');
      setTimeout(() => navigate('/'), 1800);
    } catch (err) {
      setError(getFriendlyError(err.code) || 'Failed to save name.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect result (for mobile / when popup blocked)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) {
          await handleUserAfterSocial(result.user);
        }
      })
      .catch((err) => {
        if (!['auth/redirect-cancelled-by-user', 'auth/user-cancelled', 'auth/popup-closed-by-user'].includes(err.code)) {
          setError(getFriendlyError(err.code) || 'Social login failed.');
        }
      });
  }, [navigate]);

  // Handlers (now using popup by default – more reliable for name prompt)
  const handleGoogleLogin = () => handleSocialLoginPopup(new GoogleAuthProvider());
  const handleFacebookLogin = () => handleSocialLoginPopup(new FacebookAuthProvider());
  const handleGithubLogin = () => handleSocialLoginPopup(new GithubAuthProvider());
  const handleMicrosoftLogin = () => {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('email');
    provider.addScope('profile');
    handleSocialLoginPopup(provider);
  };
  const handleAppleLogin = () => handleSocialLoginPopup(new OAuthProvider('apple.com'));

  return (
    <div className="login-container">

      <section className="login-hero">
        <div className="login-hero-content">
          <h1>Welcome Back to RecipeShare</h1>
          <p>Log in to continue sharing and discovering delicious recipes!</p>
        </div>
      </section>

      <section className="login-form-section">
        <div className="login-card">
          <h2>Log In</h2>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn primary-btn large" disabled={loading}>
              {loading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
          </div>

          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-buttons">
              <button onClick={handleGoogleLogin} className="social-btn google" disabled={loading}>
                Google
              </button>
              <button onClick={handleFacebookLogin} className="social-btn facebook" disabled={loading}>
                Facebook
              </button>
              <button onClick={handleGithubLogin} className="social-btn github" disabled={loading}>
                GitHub
              </button>
              <button onClick={handleMicrosoftLogin} className="social-btn microsoft" disabled={loading}>
                Microsoft
              </button>
              <button onClick={handleAppleLogin} className="social-btn apple" disabled={loading}>
                Apple
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────── */}
      {/*          Name Prompt (when no displayName)         */}
      {/* ──────────────────────────────────────────────── */}
      {showNamePrompt && (
        <div className="name-prompt-overlay">
          <div className="name-prompt-card">
            <h3>One last step!</h3>
            <p>We couldn't get your name from the provider. Please enter it below:</p>

            {error && <div className="form-error">{error}</div>}

            <form onSubmit={handleNameSubmit}>
              <div className="form-group">
                <label htmlFor="nameInput">Full Name</label>
                <input
                  type="text"
                  id="nameInput"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Patel Datt"
                  required
                  autoFocus
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn primary-btn large"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;