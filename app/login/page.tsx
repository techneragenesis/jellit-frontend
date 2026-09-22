'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../lib/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register, skipAuth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = isLogin
      ? await login(formData.email, formData.password)
      : await register(formData.email, formData.password, formData.name, formData.phone);

    setIsLoading(false);

    if (result.success) {
      console.log('Authentication successful, redirecting to home...');
      router.replace('/');
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  const handleSkip = () => {
    skipAuth();
    router.replace('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">
            {isLogin ? 'Welcome Back! 🫐' : 'Join the Jelly Fam ✨'}
          </h1>
          <p className="login-subtitle">
            {isLogin 
              ? 'Log in to access your cart and orders' 
              : 'Create an account to start shopping'}
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone (10 digits)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="1234567890"
                  pattern="[0-9]{10}"
                  maxLength={10}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : (isLogin ? 'Login 🚀' : 'Register 🎉')}
          </button>
        </form>

        <div className="login-footer">
          <button
            className="skip-button"
            onClick={handleSkip}
          >
            Skip for now →
          </button>

          <p className="toggle-text">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              className="toggle-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        <div className="back-link">
          <Link href="/">← Back to Home</Link>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: #FFF6E9;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          border: 3px solid #1a1a1a;
          box-shadow: 8px 8px 0 #1a1a1a;
          max-width: 450px;
          width: 100%;
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title {
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .login-subtitle {
          color: #555;
          font-size: 1rem;
          font-weight: 500;
        }

        .error-message {
          background: #FFD0D0;
          border: 2px solid #1a1a1a;
          color: #1a1a1a;
          padding: 0.75rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 700;
          color: #1a1a1a;
          font-size: 0.9rem;
        }

        .form-group input {
          padding: 0.875rem 1rem;
          border: 2px solid #1a1a1a;
          border-radius: 10px;
          font-size: 1rem;
          font-family: inherit;
          background: #FFFDF7;
          transition: all 0.15s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #FF4D8D;
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .password-input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .password-input-container input {
          width: 100%;
          padding-right: 3rem;
        }

        .password-toggle {
          position: absolute;
          right: 0.75rem;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0.25rem;
          transition: transform 0.2s ease;
        }

        .password-toggle:hover {
          transform: scale(1.1);
        }

        .submit-button {
          background: #FF4D8D;
          border: 2px solid #1a1a1a;
          color: white;
          padding: 1rem;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 4px 4px 0 #1a1a1a;
          font-family: inherit;
        }

        .submit-button:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .submit-button:active:not(:disabled) {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #1a1a1a;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: center;
        }

        .skip-button {
          background: white;
          border: 2px solid #1a1a1a;
          color: #1a1a1a;
          padding: 0.65rem 1.75rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .skip-button:hover {
          background: #FFD84D;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .toggle-text {
          color: #666;
          font-size: 0.9rem;
        }

        .toggle-button {
          background: none;
          border: none;
          color: #7B4DFF;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          font-family: inherit;
        }

        .toggle-button:hover {
          color: #FF4D8D;
        }

        .back-link {
          text-align: center;
          margin-top: 1.5rem;
        }

        .back-link a {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          transition: color 0.15s ease;
        }

        .back-link a:hover {
          color: #FF4D8D;
        }

        @media (max-width: 768px) {
          .login-card {
            padding: 2rem;
          }

          .login-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
