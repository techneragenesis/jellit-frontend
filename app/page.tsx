'use client';

import Link from 'next/link';
import { useCart } from '../lib/CartContext';
import { products } from '../lib/products';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Turn Any Liquid Into
            <span className="gradient-text"> Jelly Magic ✨</span>
          </h1>
          <p className="hero-subtitle">
            The powder that makes your drinks hit different. 
            Jello shots just leveled up. No cap. 💅
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="cta-button primary">
              Shop Now 🛍️
            </Link>
            <Link href="/blog" className="cta-button secondary">
              Get Recipes 📖
            </Link>
          </div>
        </div>
        <div className="hero-emoji">
          <span className="big-emoji">🫐</span>
          <div className="floating-emojis">
            <span className="float-emoji float-emoji-1">🩷</span>
            <span className="float-emoji float-emoji-2">💙</span>
            <span className="float-emoji float-emoji-3">🧡</span>
            <span className="float-emoji float-emoji-4">💜</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Jellit Hits Different 🎯</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-emoji">⚡</span>
            <h3>Instant Magic</h3>
            <p>Mix, pour, chill. Your drinks become jelly in minutes. No cap.</p>
          </div>
          <div className="feature-card">
            <span className="feature-emoji">🎨</span>
            <h3>Aesthetic AF</h3>
            <p>Vibrant colors that look unreal on camera. Your feed will thank you.</p>
          </div>
          <div className="feature-card">
            <span className="feature-emoji">🎉</span>
            <h3>Party Essential</h3>
            <p>The only thing your pre-game actually needs. Trust us on this one.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <h2 className="section-title">Fan Favorites 💖</h2>
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-emoji">{product.emoji}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="add-to-cart-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all-container">
          <Link href="/products" className="view-all-button">
            View All Products →
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Jelly? 🫐</h2>
          <p className="cta-subtitle">
            Join thousands of Gen Zers who've already leveled up their drink game
          </p>
          <Link href="/products" className="cta-button large">
            Start Shopping 🛒
          </Link>
        </div>
      </section>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
        }

        /* Hero Section */
        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          gap: 2rem;
        }

        .hero-content {
          flex: 1;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: #666;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .cta-button {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(196, 76, 255, 0.3);
        }

        .cta-button.primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(196, 76, 255, 0.4);
        }

        .cta-button.secondary {
          background: white;
          color: #c44cff;
          border: 2px solid #c44cff;
        }

        .cta-button.secondary:hover {
          background: #c44cff;
          color: white;
        }

        .hero-emoji {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .big-emoji {
          font-size: 12rem;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating-emojis {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .float-emoji {
          position: absolute;
          font-size: 3rem;
          animation: float 4s ease-in-out infinite;
        }

        .float-emoji-1 {
          animation-delay: 0s;
        }

        .float-emoji-2 {
          animation-delay: 1s;
        }

        .float-emoji-3 {
          animation-delay: 2s;
        }

        .float-emoji-4 {
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }

        /* Features Section */
        .features {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .feature-emoji {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .feature-card p {
          color: #666;
          line-height: 1.6;
        }

        /* Featured Products */
        .featured-products {
          padding: 4rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .product-emoji {
          font-size: 5rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .product-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .product-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .add-to-cart-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-to-cart-button:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(196, 76, 255, 0.3);
        }

        .view-all-container {
          text-align: center;
          margin-top: 2rem;
        }

        .view-all-button {
          display: inline-block;
          padding: 1rem 2rem;
          background: white;
          color: #c44cff;
          border: 2px solid #c44cff;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .view-all-button:hover {
          background: #c44cff;
          color: white;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          padding: 4rem 2rem;
          text-align: center;
        }

        .cta-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 1rem;
        }

        .cta-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
        }

        .cta-button.large {
          font-size: 1.3rem;
          padding: 1.25rem 2.5rem;
          background: white;
          color: #c44cff;
        }

        .cta-button.large:hover {
          background: #f0f0f0;
          transform: translateY(-3px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .big-emoji {
            font-size: 8rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid,
          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
