import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated } = useAuth();

  // If user came from a protected route, we'll redirect them back after login
  const redirectTo = location.state?.from || '/';

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');

  // If already authenticated, redirect away
  if (isAuthenticated) {
    navigate(redirectTo, { replace: true });
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isForgotPassword) {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsResetSent(true);
      }, 1500);
    } else {
      // Login or Register
      setTimeout(() => {
        const userData = {
          name: isLogin ? formEmail.split('@')[0] : formName,
          email: formEmail,
        };

        if (isLogin) {
          login(userData);
        } else {
          register(userData);
        }

        setIsSubmitting(false);
        // Redirect to intended page (e.g., /book/:id) or home
        navigate(redirectTo, { replace: true });
      }, 1000);
    }
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsResetSent(false);
  };

  // Reset Sent Screen
  if (isResetSent) {
    return (
      <div className="auth-container">
        <div className="reset-sent-card">
          <div className="success-icon-wrapper">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="reset-title">Check Your Email</h2>
          <p className="reset-message">We've sent a password reset link to your email address.</p>
          <button
            onClick={() => { 
              setIsForgotPassword(false); 
              setIsResetSent(false); 
              setIsLogin(true); 
            }}
            className="back-to-login-btn"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // Main Auth Form
  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* Redirect Notice */}
        {location.state?.from && (
          <div className="auth-redirect-notice">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Please sign in or register to continue with your booking.</span>
          </div>
        )}

        {/* Header */}
        <div className="auth-header">
          <h1 className="auth-title">
            {isForgotPassword ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="auth-subtitle">
            {isForgotPassword 
              ? 'Enter your email to receive a recovery link' 
              : isLogin ? 'Sign in to access your dashboard' : 'Join our community of professionals'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Login/Register Toggle */}
          {!isForgotPassword && (
            <div className="form-toggle">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`toggle-btn ${isLogin ? 'toggle-btn-active' : ''}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`toggle-btn ${!isLogin ? 'toggle-btn-active' : ''}`}
              >
                Register
              </button>
            </div>
          )}

          {/* Full Name Field (Register only) */}
          {!isLogin && !isForgotPassword && (
            <div className="form-group form-group-animate">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Rohan Sharma"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="rohan@example.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field (Login/Register only) */}
          {!isForgotPassword && (
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Forgot Password Link (Login only) */}
          {isLogin && !isForgotPassword && (
            <div className="forgot-password-wrapper">
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="forgot-password-btn"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-btn ${isSubmitting ? 'submit-btn-loading' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="spinner-icon" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              isForgotPassword ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Join Now'
            )}
          </button>

          {/* Back to Login Button (Forgot Password only) */}
          {isForgotPassword && (
            <button
              type="button"
              onClick={toggleForgotPassword}
              className="back-btn"
            >
              ← Back to Login
            </button>
          )}
        </form>

        {/* Sign Up / Sign In Toggle (Not on Forgot Password) */}
        {!isForgotPassword && (
          <div className="auth-footer">
            <p className="footer-text">
              {isLogin ? "New to Working Space?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="footer-link"
              >
                {isLogin ? 'Create Account' : 'Sign In instead'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;