'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import { getUserOrders, Order } from '../../lib/api';
import AuthGuard from '../../components/AuthGuard';

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const response = await getUserOrders(user.id);
        if (response.data) {
          setOrders(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, user]);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="orders-container">
          <div className="loading-container">
            <span className="loading-emoji">📦</span>
            <p>Loading your orders...</p>
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
      <div className="orders-container">
        <div className="orders-header">
          <h1 className="orders-title">
            Your Orders 
            <span className="title-emoji">📦</span>
          </h1>
          <p className="orders-subtitle">
            Track your jelly magic deliveries
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <span className="empty-emoji">🛒</span>
            <h2>No orders yet</h2>
            <p>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-id">Order #{order.id.slice(0, 8)}</span>
                    <span className={`order-status status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <span className="item-quantity">{item.quantity}x</span>
                      <span className="item-name">Product #{item.productId.slice(0, 8)}</span>
                      <span className="item-price">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <span className="order-total">Total: ${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <style jsx>{`
          .orders-container {
            min-height: 100vh;
            background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
            padding: 2rem;
          }

          .orders-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 3rem;
          }

          .orders-title {
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

          .orders-subtitle {
            font-size: 1.3rem;
            color: #666;
          }

          .empty-orders {
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 20px;
            max-width: 500px;
            margin: 0 auto;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .empty-emoji {
            font-size: 5rem;
            display: block;
            margin-bottom: 1rem;
          }

          .empty-orders h2 {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 0.5rem;
          }

          .empty-orders p {
            color: #666;
          }

          .orders-grid {
            display: grid;
            gap: 2rem;
            max-width: 800px;
            margin: 0 auto;
          }

          .order-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
          }

          .order-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          }

          .order-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #f0f0f0;
          }

          .order-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .order-id {
            font-weight: 700;
            color: #333;
            font-size: 1.1rem;
          }

          .order-status {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: capitalize;
          }

          .status-pending {
            background: #fff3cd;
            color: #856404;
          }

          .status-processing {
            background: #cce5ff;
            color: #004085;
          }

          .status-shipped {
            background: #d4edda;
            color: #155724;
          }

          .status-delivered {
            background: #d1ecf1;
            color: #0c5460;
          }

          .status-cancelled {
            background: #f8d7da;
            color: #721c24;
          }

          .order-date {
            color: #666;
            font-size: 0.9rem;
          }

          .order-items {
            margin-bottom: 1.5rem;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .order-item:last-child {
            border-bottom: none;
          }

          .item-quantity {
            font-weight: 600;
            color: #c44cff;
            width: 50px;
          }

          .item-name {
            flex: 1;
            color: #333;
          }

          .item-price {
            font-weight: 600;
            color: #333;
          }

          .order-footer {
            display: flex;
            justify-content: flex-end;
            padding-top: 1rem;
            border-top: 2px solid #f0f0f0;
          }

          .order-total {
            font-size: 1.3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #ff6b9d, #c44cff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          @media (max-width: 768px) {
            .orders-title {
              font-size: 2rem;
            }

            .order-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 0.5rem;
            }

            .order-item {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    </AuthGuard>
  );
}
