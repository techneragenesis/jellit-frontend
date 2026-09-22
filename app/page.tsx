'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthGuard from '../components/AuthGuard';
import { useCart } from '../lib/CartContext';
import { Product as ApiProduct, getProducts } from '../lib/api';

interface DisplayProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock?: number;
  category: string;
}

const tickerWords = ['POUR ✶ MIX ✶ WOBBLE ✶ REPEAT', 'ANY LIQUID → JELLY', 'ZERO SKIPS', '100% WOBBLE', 'JELLIT'];

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<DisplayProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.data) {
        setFeaturedProducts(
          response.data.slice(0, 3).map((apiProduct: ApiProduct) => ({
            id: apiProduct.id,
            name: apiProduct.name,
            description: apiProduct.description,
            price: apiProduct.price,
            imageUrl: apiProduct.imageUrl,
            stock: apiProduct.stock,
            category: apiProduct.category || 'Original',
          }))
        );
      }
    };
    fetchProducts();
  }, []);

  return (
    <AuthGuard>
      <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">NEW ✶ JELLY POWDER</div>
          <h1 className="hero-title">
            TURN ANY<br />
            LIQUID INTO<br />
            <span className="hero-accent">JELLY.</span>
          </h1>
          <p className="hero-subtitle">
            The powder that makes your drinks hit different.
            Jello shots just leveled up. No cap.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="cta-button primary">
              Shop Now →
            </Link>
            <Link href="/blog" className="cta-button secondary">
              Read the Blog
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-sticker sticker-1">✶ WOBBLE</div>
          <div className="hero-sticker sticker-2">✶ JELLIT</div>
          <div className="hero-sticker sticker-3">✶ NO CAP</div>
          <div className="hero-circle">🫐</div>
        </div>
      </section>

      {/* Marquee Strip */}
      <div className="marquee-strip">
        <div className="marquee-track">
          {[...tickerWords, ...tickerWords, ...tickerWords, ...tickerWords].map((word, i) => (
            <span key={i} className="marquee-item">{word}</span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">WHY JELLIT HITS DIFFERENT</h2>
        <div className="features-grid">
          <div className="feature-card pink">
            <span className="feature-number">01</span>
            <span className="feature-emoji">⚡</span>
            <h3>Instant Magic</h3>
            <p>Mix, pour, chill. Your drinks become jelly in minutes.</p>
          </div>
          <div className="feature-card yellow">
            <span className="feature-number">02</span>
            <span className="feature-emoji">🎨</span>
            <h3>Aesthetic AF</h3>
            <p>Vibrant colors that look unreal on camera. Your feed will thank you.</p>
          </div>
          <div className="feature-card green">
            <span className="feature-number">03</span>
            <span className="feature-emoji">🎉</span>
            <h3>Party Essential</h3>
            <p>The only thing your pre-game actually needs. Trust us on this one.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="section-header">
          <h2 className="section-title">FAN FAVORITES</h2>
          <p className="section-sub">The drops everyone keeps coming back for.</p>
        </div>
        {featuredProducts.length === 0 ? (
          <div className="empty-products">
            <p>Products coming soon!</p>
          </div>
        ) : (
          <div className="products-grid">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="product-card">
                <span className="product-number">{String(i + 1).padStart(2, '0')}</span>
                <div className="product-image">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="product-img" />
                  ) : (
                    <span className="product-emoji">🫐</span>
                  )}
                </div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product as any)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="view-all-container">
          <Link href="/products" className="view-all-button">
            View All Products →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">READY TO WOBBLE?</h2>
          <p className="cta-subtitle">
            Join the crew already leveling up their drink game.
          </p>
          <Link href="/products" className="cta-button large">
            Start Shopping 🛒
          </Link>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: #FFF6E9;
        }

        /* Hero Section */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          gap: 3rem;
        }

        .hero-inner {
          flex: 1;
        }

        .hero-badge {
          display: inline-block;
          background: #FFD84D;
          border: 2px solid #1a1a1a;
          box-shadow: 3px 3px 0 #1a1a1a;
          padding: 0.4rem 1rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          border-radius: 50px;
          margin-bottom: 1.5rem;
          transform: rotate(-2deg);
        }

        .hero-title {
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          font-size: clamp(3rem, 8vw, 6rem);
          line-height: 0.95;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          text-transform: uppercase;
        }

        .hero-accent {
          color: #FF4D8D;
          -webkit-text-stroke: 2px #1a1a1a;
          text-shadow: 4px 4px 0 #1a1a1a;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #444;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          max-width: 480px;
          font-weight: 500;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .cta-button {
          padding: 0.9rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1rem;
          text-decoration: none;
          transition: all 0.15s ease;
          display: inline-block;
          border: 2px solid #1a1a1a;
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .cta-button:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .cta-button:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0 #1a1a1a;
        }

        .cta-button.primary {
          background: #FF4D8D;
          color: white;
        }

        .cta-button.secondary {
          background: white;
          color: #1a1a1a;
        }

        .cta-button.secondary:hover {
          background: #FFD84D;
        }

        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          min-height: 320px;
        }

        .hero-circle {
          width: 260px;
          height: 260px;
          background: #7B4DFF;
          border: 3px solid #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
          box-shadow: 8px 8px 0 #1a1a1a;
          animation: wobble 3s ease-in-out infinite;
        }

        @keyframes wobble {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          50% { transform: rotate(3deg) scale(1.03); }
        }

        .hero-sticker {
          position: absolute;
          background: white;
          border: 2px solid #1a1a1a;
          box-shadow: 3px 3px 0 #1a1a1a;
          padding: 0.4rem 0.9rem;
          font-weight: 700;
          font-size: 0.85rem;
          border-radius: 8px;
          letter-spacing: 0.05em;
        }

        .sticker-1 {
          top: 10%;
          left: 5%;
          transform: rotate(-8deg);
          background: #FF4D8D;
          color: white;
        }

        .sticker-2 {
          bottom: 15%;
          right: 5%;
          transform: rotate(6deg);
          background: #FFD84D;
        }

        .sticker-3 {
          top: 50%;
          right: 0;
          transform: rotate(-5deg);
          background: #4ADE80;
        }

        /* Marquee Strip */
        .marquee-strip {
          background: #1a1a1a;
          overflow: hidden;
          padding: 0.75rem 0;
          border-top: 3px solid #1a1a1a;
          border-bottom: 3px solid #1a1a1a;
        }

        .marquee-track {
          display: flex;
          gap: 3rem;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        .marquee-item {
          color: #FFF6E9;
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.1em;
        }

        /* Sections */
        .section-title {
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          font-size: clamp(1.8rem, 5vw, 3rem);
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          letter-spacing: -0.01em;
          text-transform: uppercase;
        }

        .section-sub {
          color: #555;
          font-size: 1.05rem;
          font-weight: 500;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        /* Features Section */
        .features {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features .section-title {
          text-align: center;
          margin-bottom: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          padding: 2rem;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          box-shadow: 6px 6px 0 #1a1a1a;
          position: relative;
          transition: all 0.15s ease;
        }

        .feature-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #1a1a1a;
        }

        .feature-card.pink {
          background: #FFD0E3;
        }

        .feature-card.yellow {
          background: #FFF0B8;
        }

        .feature-card.green {
          background: #D4F5DC;
        }

        .feature-number {
          position: absolute;
          top: 1rem;
          right: 1.25rem;
          font-family: 'Archivo Black', sans-serif;
          font-size: 2rem;
          color: #1a1a1a;
          opacity: 0.15;
        }

        .feature-emoji {
          font-size: 3.5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .feature-card p {
          color: #333;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Featured Products */
        .featured-products {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: white;
          padding: 1.75rem;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          box-shadow: 6px 6px 0 #1a1a1a;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .product-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #1a1a1a;
        }

        .product-number {
          position: absolute;
          top: 1rem;
          left: 1.25rem;
          font-family: 'Archivo Black', sans-serif;
          font-size: 1rem;
          color: #FF4D8D;
          letter-spacing: 0.05em;
        }

        .product-image {
          text-align: center;
          margin-bottom: 1rem;
          padding-top: 1rem;
        }

        .product-emoji {
          font-size: 5rem;
          display: block;
        }

        .product-img {
          width: 100%;
          height: 11rem;
          object-fit: contain;
          border-radius: 12px;
        }

        .empty-products {
          text-align: center;
          padding: 2rem;
          color: #666;
          font-weight: 500;
        }

        .product-name {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          text-transform: uppercase;
        }

        .product-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
          font-size: 0.95rem;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .product-price {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.4rem;
          color: #1a1a1a;
        }

        .add-to-cart-button {
          background: #1a1a1a;
          border: 2px solid #1a1a1a;
          color: #FFF6E9;
          padding: 0.6rem 1.4rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .add-to-cart-button:hover {
          background: #FF4D8D;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .view-all-container {
          text-align: center;
          margin-top: 3rem;
        }

        .view-all-button {
          display: inline-block;
          padding: 0.9rem 2rem;
          background: white;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s ease;
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .view-all-button:hover {
          background: #FFD84D;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        /* CTA Section */
        .cta-section {
          background: #7B4DFF;
          border-top: 3px solid #1a1a1a;
          padding: 5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .cta-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: white;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: -0.01em;
          text-shadow: 4px 4px 0 #1a1a1a;
        }

        .cta-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .cta-button.large {
          font-size: 1.1rem;
          padding: 1rem 2.5rem;
          background: #FFD84D;
          color: #1a1a1a;
          border: 3px solid #1a1a1a;
          box-shadow: 5px 5px 0 #1a1a1a;
        }

        .cta-button.large:hover {
          transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 #1a1a1a;
          background: white;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero {
            padding: 3.5rem 1.5rem;
          }

          .hero-circle {
            width: 220px;
            height: 220px;
            font-size: 6.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 3rem 1.25rem;
            gap: 2rem;
          }

          .hero-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-subtitle {
            text-align: center;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-visual {
            min-height: 260px;
          }

          .hero-circle {
            width: 200px;
            height: 200px;
            font-size: 5.5rem;
            box-shadow: 6px 6px 0 #1a1a1a;
          }

          .hero-sticker {
            font-size: 0.75rem;
            padding: 0.3rem 0.7rem;
          }

          .features,
          .featured-products {
            padding: 3rem 1.25rem;
          }

          .features-grid,
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .cta-section {
            padding: 3.5rem 1.25rem;
          }
        }

        @media (max-width: 480px) {
          .cta-button {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }

          .marquee-item {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
    </AuthGuard>
  );
}
