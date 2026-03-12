import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
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
  const location = useLocation();

  // Jyathi aavyo hato tyae moklo, otherwise home
  const from = location.state?.from || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [nameInput, setNameInput] = useState('');

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
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(getFriendlyError(err.code) || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLoginPopup = async (provider) => {
    if (loading) return;
    setError(''); setSuccess(''); setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) await handleUserAfterSocial(result.user);
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
      setTempUser(user);
      setShowNamePrompt(true);
      return;
    }
    await finalizeSocialUser(user);
  };

  const finalizeSocialUser = async (user) => {
    saveUserToLocalStorage(user);
    setSuccess('Logged in! Redirecting...');
    setTimeout(() => navigate(from, { replace: true }), 1500);
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return setError('Please enter your full name');
    try {
      setLoading(true);
      await updateProfile(tempUser, { displayName: nameInput.trim() });
      saveUserToLocalStorage(auth.currentUser);
      setShowNamePrompt(false);
      setSuccess('Profile updated! Redirecting...');
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setError(getFriendlyError(err.code) || 'Failed to save name.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result?.user) await handleUserAfterSocial(result.user);
      })
      .catch((err) => {
        if (!['auth/redirect-cancelled-by-user', 'auth/popup-closed-by-user'].includes(err.code)) {
          setError(getFriendlyError(err.code) || 'Social login failed.');
        }
      });
  }, []);

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
              <button onClick={handleGoogleLogin} className="social-btn google" disabled={loading}>Google</button>
              <button onClick={handleFacebookLogin} className="social-btn facebook" disabled={loading}>Facebook</button>
              <button onClick={handleGithubLogin} className="social-btn github" disabled={loading}>GitHub</button>
              <button onClick={handleMicrosoftLogin} className="social-btn microsoft" disabled={loading}>Microsoft</button>
              <button onClick={handleAppleLogin} className="social-btn apple" disabled={loading}>Apple</button>
            </div>
          </div>
        </div>
      </section>

      {showNamePrompt && (
        <div className="name-prompt-overlay">
          <div className="name-prompt-card">
            <h3>One last step!</h3>
            <p>Please enter your name:</p>
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
              <button type="submit" className="btn primary-btn large" disabled={loading}>
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