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
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
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
          background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-card {
          background: white;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
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
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .login-subtitle {
          color: #666;
          font-size: 1rem;
        }

        .error-message {
          background: #fee;
          color: #c33;
          padding: 0.75rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 0.9rem;
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
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }

        .form-group input {
          padding: 0.875rem 1rem;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: #c44cff;
          box-shadow: 0 0 0 3px rgba(196, 76, 255, 0.1);
        }

        .submit-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          border: none;
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(196, 76, 255, 0.3);
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(196, 76, 255, 0.4);
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
          background: transparent;
          border: 2px solid #c44cff;
          color: #c44cff;
          padding: 0.75rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .skip-button:hover {
          background: #c44cff;
          color: white;
        }

        .toggle-text {
          color: #666;
          font-size: 0.9rem;
        }

        .toggle-button {
          background: none;
          border: none;
          color: #c44cff;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
        }

        .toggle-button:hover {
          color: #ff6b9d;
        }

        .back-link {
          text-align: center;
          margin-top: 1.5rem;
        }

        .back-link a {
          color: #666;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .back-link a:hover {
          color: #c44cff;
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
