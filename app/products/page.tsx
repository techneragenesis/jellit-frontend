'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import { Product as ApiProduct, getProducts } from '../../lib/api';
import { useCart } from '../../lib/CartContext';

interface DisplayProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock?: number;
  category: string;
}

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<DisplayProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getProducts();
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        const transformedProducts = response.data.map((apiProduct: ApiProduct) => ({
          id: apiProduct.id,
          name: apiProduct.name,
          description: apiProduct.description,
          price: apiProduct.price,
          imageUrl: apiProduct.imageUrl,
          stock: apiProduct.stock,
          category: apiProduct.category || 'Original',
        }));
        setProducts(transformedProducts);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, []);
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="products-container">
          <div className="loading-container">
            <span className="loading-emoji">🫐</span>
            <p>Loading products...</p>
            <style jsx>{`
              .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 50vh;
                gap: 1rem;
              }
              .loading-emoji {
                font-size: 4rem;
                animation: bounce 1s ease-in-out infinite;
              }
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
              p {
                color: #666;
                font-size: 1.1rem;
              }
            `}</style>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="products-container">
      <div className="products-header">
        <div className="page-badge">✶ THE FULL LINEUP ✶</div>
        <h1 className="products-title">THE GOODS.</h1>
        <p className="products-subtitle">
          Pick your vibe. Every color hits different.
        </p>
      </div>

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!error && categories.length > 1 && (
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
      )}

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji">🫐</span>
          <h3>No products available</h3>
          <p>Check back soon for jelly magic!</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="product-card">
              <span className="product-number">{String(index + 1).padStart(2, '0')}</span>
              <div className="product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="product-img" />
                ) : (
                  <span className="product-emoji">🫐</span>
                )}
                <span className="product-category">{product.category}</span>
                {product.stock !== undefined && product.stock > 0 && product.stock < 5 && (
                  <span className="stock-warning">Only {product.stock} left!</span>
                )}
                {product.stock === 0 && (
                  <span className="stock-warning sold-out">Sold out</span>
                )}
              </div>
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                  <button
                    className="add-to-cart-button"
                    onClick={() => addToCart(product as any)}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart +'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .products-container {
          min-height: 100vh;
          background: #FFF6E9;
          padding: 3rem 2rem;
        }

        .products-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .page-badge {
          display: inline-block;
          background: #FFD84D;
          border: 2px solid #1a1a1a;
          box-shadow: 3px 3px 0 #1a1a1a;
          padding: 0.4rem 1rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          border-radius: 50px;
          margin-bottom: 1.25rem;
          transform: rotate(-2deg);
        }

        .products-title {
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .products-subtitle {
          font-size: 1.15rem;
          color: #555;
          font-weight: 500;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-button {
          padding: 0.6rem 1.4rem;
          border: 2px solid #1a1a1a;
          background: white;
          color: #1a1a1a;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 3px 3px 0 #1a1a1a;
          font-family: inherit;
        }

        .category-button:hover {
          background: #FFD84D;
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 #1a1a1a;
        }

        .category-button.active {
          background: #FF4D8D;
          color: white;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .product-card {
          background: white;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 6px 6px 0 #1a1a1a;
          transition: all 0.15s ease;
          position: relative;
        }

        .product-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #1a1a1a;
        }

        .product-number {
          position: absolute;
          top: 0.85rem;
          left: 1rem;
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.95rem;
          color: #FF4D8D;
          letter-spacing: 0.05em;
          z-index: 2;
          background: white;
          padding: 0.15rem 0.5rem;
          border: 2px solid #1a1a1a;
          border-radius: 8px;
        }

        .product-image {
          background: #FFF6E9;
          border-bottom: 3px solid #1a1a1a;
          padding: 3rem 2rem;
          text-align: center;
          position: relative;
        }

        .product-emoji {
          font-size: 5.5rem;
          display: block;
        }

        .product-img {
          max-width: 100%;
          height: 10rem;
          object-fit: contain;
          border-radius: 12px;
        }

        .stock-warning {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: #FFD84D;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .stock-warning.sold-out {
          background: #1a1a1a;
          color: #FFF6E9;
        }

        .error-banner {
          max-width: 600px;
          margin: 0 auto 2rem;
          background: #FFD0D0;
          border: 2px solid #1a1a1a;
          color: #1a1a1a;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border: 3px solid #1a1a1a;
          border-radius: 20px;
          max-width: 500px;
          margin: 0 auto;
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .empty-emoji {
          font-size: 5rem;
          display: block;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.5rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .empty-state p {
          color: #666;
          font-weight: 500;
        }

        .product-category {
          position: absolute;
          top: 0.85rem;
          right: 1rem;
          background: #1a1a1a;
          color: #FFF6E9;
          padding: 0.35rem 0.9rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-name {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
          text-transform: uppercase;
        }

        .product-description {
          color: #555;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 80px;
          font-size: 0.95rem;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.5rem;
          color: #1a1a1a;
        }

        .add-to-cart-button {
          background: #1a1a1a;
          border: 2px solid #1a1a1a;
          color: #FFF6E9;
          padding: 0.65rem 1.4rem;
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

        .add-to-cart-button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        @media (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .products-container {
            padding: 2rem 1rem;
          }

          .products-subtitle {
            font-size: 1.05rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }

          .category-filter {
            gap: 0.5rem;
          }

          .category-button {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }

          .product-emoji {
            font-size: 4rem;
          }

          .product-img {
            height: 8rem;
          }

          .product-description {
            min-height: auto;
          }
        }
      `}</style>
    </div>
    </AuthGuard>
  );
}
