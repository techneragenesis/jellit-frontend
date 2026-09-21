'use client';

import { products } from '../../lib/products';
import { useCart } from '../../lib/CartContext';
import { useState } from 'react';

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Original', 'Bundle', 'Special'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">
          Our Products 
          <span className="title-emoji">🫐</span>
        </h1>
        <p className="products-subtitle">
          Pick your vibe. Every color hits different.
        </p>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span className="product-emoji">{product.emoji}</span>
              <span className="product-category">{product.category}</span>
            </div>
            <div className="product-content">
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
          </div>
        ))}
      </div>

      <style jsx>{`
        .products-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
          padding: 2rem;
        }

        .products-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .products-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-emoji {
          font-size: 3rem;
        }

        .products-subtitle {
          font-size: 1.3rem;
          color: #666;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #c44cff;
          background: white;
          color: #c44cff;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-button:hover {
          background: #c44cff;
          color: white;
          transform: translateY(-2px);
        }

        .category-button.active {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          border-color: transparent;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .product-image {
          background: linear-gradient(135deg, #fff5f8, #f0f4ff);
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
        }

        .product-emoji {
          font-size: 6rem;
          display: block;
        }

        .product-category {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-name {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .product-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 80px;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 1.6rem;
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

        @media (max-width: 768px) {
          .products-title {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .category-filter {
            gap: 0.5rem;
          }

          .category-button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
