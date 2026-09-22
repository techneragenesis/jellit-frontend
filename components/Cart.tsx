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
                <div className="item-emoji">{item.emoji}</div>
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
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .cart-sidebar {
          background: white;
          width: 100%;
          max-width: 450px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
          animation: slideIn 0.3s ease;
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
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-title {
          margin: 0;
          color: white;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .close-button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
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
          color: #666;
          margin-bottom: 0.5rem;
        }

        .empty-subtext {
          color: #999;
          font-size: 0.9rem;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 12px;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .cart-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .item-emoji {
          font-size: 2.5rem;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          margin: 0 0 0.25rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #333;
        }

        .item-price {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .item-quantity {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-button {
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quantity-button:hover {
          transform: scale(1.1);
        }

        .quantity {
          font-weight: bold;
          font-size: 1.1rem;
          min-width: 30px;
          text-align: center;
        }

        .remove-button {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0.5rem;
        }

        .remove-button:hover {
          transform: scale(1.2);
        }

        .cart-footer {
          padding: 1.5rem;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .total-label {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .total-amount {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .checkout-button {
          width: 100%;
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

        .checkout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(196, 76, 255, 0.4);
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
