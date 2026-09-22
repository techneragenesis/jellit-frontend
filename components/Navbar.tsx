'use client';

import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';

const tickerItems = [
  'TURN ANY LIQUID INTO JELLY',
  '✶',
  'JELLIT',
  '✶',
  'NO CAP. JUST JELLY',
  '✶',
  'POUR. MIX. WOBBLE.',
  '✶',
];

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const ticker = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="nav-wrap">
      <div className="ticker">
        <div className="ticker-track">
          {ticker.map((item, i) => (
            <span key={i} className="ticker-item">{item}</span>
          ))}
        </div>
      </div>
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/" className="navbar-logo">
            <span className="logo-emoji">🫐</span>
            <span className="logo-text">JELLIT</span>
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
      </nav>

      <style jsx>{`
        .nav-wrap {
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .ticker {
          background: #1a1a1a;
          color: #FFF6E9;
          overflow: hidden;
          padding: 0.4rem 0;
          border-bottom: 2px solid #1a1a1a;
        }

        .ticker-track {
          display: flex;
          gap: 2rem;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
          width: max-content;
        }

        .ticker-item {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.15em;
        }

        .navbar {
          background: #FFF6E9;
          padding: 0.9rem 2rem;
          border-bottom: 3px solid #1a1a1a;
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
          color: #1a1a1a;
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          letter-spacing: -0.02em;
        }

        .logo-emoji {
          font-size: 1.8rem;
        }

        .logo-text {
          color: #FF4D8D;
          text-shadow: 2px 2px 0 #1a1a1a;
        }

        .navbar-links {
          display: flex;
          gap: 0.75rem;
        }

        .nav-link {
          color: #1a1a1a;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.45rem 1rem;
          border-radius: 50px;
          border: 2px solid transparent;
          transition: all 0.15s ease;
        }

        .nav-link:hover {
          border-color: #1a1a1a;
          background: #FFD84D;
          box-shadow: 3px 3px 0 #1a1a1a;
          transform: translate(-1px, -1px);
        }

        .admin-link {
          background: #1a1a1a;
          color: #FFF6E9;
          border: 2px solid #1a1a1a;
        }

        .admin-link:hover {
          background: #7B4DFF;
          color: white;
          box-shadow: 3px 3px 0 #1a1a1a;
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
          font-weight: 700;
          font-size: 0.9rem;
          color: #1a1a1a;
        }

        .login-button {
          background: #1a1a1a;
          color: #FFF6E9;
          border: none;
          padding: 0.55rem 1.4rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.15s ease;
        }

        .login-button:hover {
          background: #FF4D8D;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .logout-button {
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .logout-button:hover {
          background: #1a1a1a;
          color: #FFF6E9;
        }

        .cart-button {
          position: relative;
          background: #FFD84D;
          border: 2px solid #1a1a1a;
          font-size: 1.3rem;
          cursor: pointer;
          padding: 0.5rem 1.1rem;
          border-radius: 50px;
          transition: all 0.15s ease;
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .cart-button:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #FF4D8D;
          color: white;
          border: 2px solid #1a1a1a;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
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
            gap: 0.4rem;
            order: 3;
            width: 100%;
            justify-content: center;
          }

          .nav-link {
            font-size: 0.85rem;
            padding: 0.35rem 0.7rem;
          }

          .navbar-logo {
            font-size: 1.4rem;
          }

          .logo-emoji {
            font-size: 1.4rem;
          }

          .navbar-actions {
            gap: 0.5rem;
          }

          .user-name {
            display: none;
          }

          .logout-button {
            padding: 0.35rem 0.7rem;
            font-size: 0.75rem;
          }

          .login-button {
            padding: 0.45rem 1rem;
            font-size: 0.8rem;
          }

          .cart-button {
            padding: 0.4rem 0.9rem;
            font-size: 1.1rem;
          }

          .ticker-item {
            font-size: 0.65rem;
          }
        }

        @media (max-width: 480px) {
          .nav-link {
            font-size: 0.8rem;
            padding: 0.3rem 0.55rem;
          }

          .navbar-links {
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
}
