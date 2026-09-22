'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import { useAuth } from '../../lib/AuthContext';
import { getUserOrders, Order } from '../../lib/api';

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
          <div className="page-badge">✶ YOUR ORDERS ✶</div>
          <h1 className="orders-title">ORDER HISTORY.</h1>
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
            background: #FFF6E9;
            padding: 3rem 2rem;
          }

          .orders-header {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 3rem;
          }

          .page-badge {
            display: inline-block;
            background: #5B8CFF;
            border: 2px solid #1a1a1a;
            box-shadow: 3px 3px 0 #1a1a1a;
            padding: 0.4rem 1rem;
            font-weight: 700;
            font-size: 0.8rem;
            letter-spacing: 0.1em;
            border-radius: 50px;
            margin-bottom: 1.25rem;
            transform: rotate(-2deg);
            color: white;
          }

          .orders-title {
            font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
            font-size: clamp(2.5rem, 7vw, 4.5rem);
            color: #1a1a1a;
            text-transform: uppercase;
            letter-spacing: -0.02em;
            margin-bottom: 0.75rem;
          }

          .orders-subtitle {
            font-size: 1.15rem;
            color: #555;
            font-weight: 500;
          }

          .empty-orders {
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

          .empty-orders h2 {
            font-family: 'Archivo Black', sans-serif;
            font-size: 1.5rem;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
          }

          .empty-orders p {
            color: #666;
            font-weight: 500;
          }

          .orders-grid {
            display: grid;
            gap: 1.5rem;
            max-width: 800px;
            margin: 0 auto;
          }

          .order-card {
            background: white;
            border: 3px solid #1a1a1a;
            border-radius: 16px;
            padding: 1.75rem;
            box-shadow: 6px 6px 0 #1a1a1a;
            transition: all 0.15s ease;
          }

          .order-card:hover {
            transform: translate(-2px, -2px);
            box-shadow: 8px 8px 0 #1a1a1a;
          }

          .order-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.25rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #1a1a1a;
          }

          .order-info {
            display: flex;
            align-items: center;
            gap: 1rem;
          }

          .order-id {
            font-family: 'Archivo Black', sans-serif;
            color: #1a1a1a;
            font-size: 1rem;
          }

          .order-status {
            padding: 0.35rem 0.9rem;
            border: 2px solid #1a1a1a;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .status-pending {
            background: #FFD84D;
            color: #1a1a1a;
          }

          .status-processing {
            background: #5B8CFF;
            color: white;
          }

          .status-shipped {
            background: #7B4DFF;
            color: white;
          }

          .status-delivered {
            background: #4ADE80;
            color: #1a1a1a;
          }

          .status-cancelled {
            background: #FF4D8D;
            color: white;
          }

          .order-date {
            color: #666;
            font-size: 0.9rem;
            font-weight: 600;
          }

          .order-items {
            margin-bottom: 1.25rem;
          }

          .order-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.65rem 0;
            border-bottom: 1px dashed #ddd;
          }

          .order-item:last-child {
            border-bottom: none;
          }

          .item-quantity {
            font-weight: 700;
            color: #7B4DFF;
            width: 50px;
          }

          .item-name {
            flex: 1;
            color: #333;
            font-weight: 500;
          }

          .item-price {
            font-weight: 700;
            color: #1a1a1a;
          }

          .order-footer {
            display: flex;
            justify-content: flex-end;
            padding-top: 1rem;
            border-top: 2px solid #1a1a1a;
          }

          .order-total {
            font-family: 'Archivo Black', sans-serif;
            font-size: 1.3rem;
            color: #1a1a1a;
          }

          @media (max-width: 768px) {
            .orders-container {
              padding: 2rem 1rem;
            }

            .orders-subtitle {
              font-size: 1.05rem;
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
