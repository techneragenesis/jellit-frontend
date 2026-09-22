'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useCart } from '../lib/CartContext';
import { createOrder } from '../lib/api';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!isAuthenticated || !user) {
      alert('Please login to checkout');
      return;
    }

    setIsProcessing(true);
    try {
      const orderItems = cart.map(item => ({
        productId: item.apiId || item.id.toString(),
        quantity: item.quantity,
        price: item.price,
      }));

      const response = await createOrder({
        userId: user.id,
        items: orderItems,
      });

      if (response.error) {
        alert('Failed to create order: ' + response.error);
      } else {
        alert('Order created successfully!');
        // Clear cart or redirect to orders page
        setIsCartOpen(false);
      }
    } catch (error) {
      alert('Failed to create order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart 🛒</h2>
          <button
            className="close-button"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p className="empty-text">Your cart is empty 😢</p>
              <p className="empty-subtext">Time to add some jelly magic!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-emoji">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="item-img" />
                  ) : (
                    item.emoji || '🫐'
                  )}
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Checkout ✨'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(26, 26, 26, 0.6);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .cart-sidebar {
          background: #FFF6E9;
          width: 100%;
          max-width: 450px;
          height: 100%;
          display: flex;
          flex-direction: column;
          border-left: 3px solid #1a1a1a;
          animation: slideIn 0.25s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .cart-header {
          background: #1a1a1a;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #1a1a1a;
        }

        .cart-title {
          margin: 0;
          color: #FFF6E9;
          font-size: 1.4rem;
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .close-button {
          background: #FF4D8D;
          border: 2px solid #FFF6E9;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .close-button:hover {
          transform: rotate(90deg);
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .empty-cart {
          text-align: center;
          padding: 3rem 1rem;
        }

        .empty-text {
          font-size: 1.2rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .empty-subtext {
          color: #666;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border: 2px solid #1a1a1a;
          border-radius: 12px;
          margin-bottom: 1rem;
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        .item-emoji {
          font-size: 2rem;
        }

        .item-img {
          width: 44px;
          height: 44px;
          object-fit: contain;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .item-price {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-button {
          background: #1a1a1a;
          border: 2px solid #1a1a1a;
          color: #FFF6E9;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity-button:hover {
          background: #FF4D8D;
        }

        .quantity {
          font-weight: 700;
          font-size: 1rem;
          min-width: 24px;
          text-align: center;
        }

        .remove-button {
          background: none;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.15s ease;
          padding: 0.25rem;
        }

        .remove-button:hover {
          transform: scale(1.15);
        }

        .cart-footer {
          padding: 1.5rem;
          background: white;
          border-top: 3px solid #1a1a1a;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .total-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1a1a1a;
        }

        .total-amount {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.5rem;
          color: #1a1a1a;
        }

        .checkout-button {
          width: 100%;
          background: #FF4D8D;
          border: 2px solid #1a1a1a;
          color: white;
          padding: 0.9rem;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 4px 4px 0 #1a1a1a;
          font-family: inherit;
        }

        .checkout-button:hover:not(:disabled) {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1a1a1a;
        }

        .checkout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .cart-sidebar {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
