'use client';

import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-emoji">🫐</span>
          <span className="logo-text">Jellit</span>
        </Link>

        <div className="navbar-links">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/products" className="nav-link">
            Products
          </Link>
          <Link href="/blog" className="nav-link">
            Blog
          </Link>
          {isAuthenticated && (
            <Link href="/orders" className="nav-link">
              Orders
            </Link>
          )}
          {isAdmin && (
            <Link href="/admin" className="nav-link admin-link">
              Admin ⚡
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="login-button">
              Login
            </Link>
          )}

          <button
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          padding: 1rem 2rem;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        .logo-emoji {
          font-size: 2rem;
        }

        .navbar-links {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          transition: all 0.3s ease;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .admin-link {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }

        .logout-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .login-button {
          background: white;
          color: #c44cff;
          text-decoration: none;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .cart-button {
          background: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          cursor: pointer;
          font-size: 1.5rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .cart-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .cart-icon {
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ff4757;
          color: white;
          font-size: 0.75rem;
          font-weight: bold;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid white;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem 1rem;
          }

          .navbar-container {
            flex-wrap: wrap;
            gap: 0.5rem;
          }

          .navbar-links {
            gap: 0.5rem;
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .nav-link {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
          }

          .navbar-logo {
            font-size: 1.5rem;
          }

          .logo-emoji {
            font-size: 1.5rem;
          }

          .navbar-actions {
            gap: 0.5rem;
          }

          .user-name {
            display: none;
          }

          .logout-button {
            padding: 0.4rem 0.8rem;
            font-size: 0.75rem;
          }

          .login-button {
            padding: 0.4rem 1rem;
            font-size: 0.8rem;
          }

          .cart-button {
            padding: 0.5rem 1rem;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .nav-link {
            font-size: 0.8rem;
            padding: 0.35rem 0.6rem;
          }

          .navbar-links {
            gap: 0.25rem;
          }
        }
      `}</style>
    </nav>
  );
}
