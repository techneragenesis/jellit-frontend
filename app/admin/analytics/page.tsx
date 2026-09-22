'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import { getAdminAnalytics, Analytics } from '../../../lib/api';

export default function AnalyticsPage() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user) return;
      const response = await getAdminAnalytics(user.id);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setAnalytics(response.data);
      }
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading">
        <span>📊</span>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading analytics</h2>
        <p>{error}</p>
        <style jsx>{`
          .error-container {
            text-align: center;
            padding: 3rem;
            background: white;
            border-radius: 20px;
          }
          h2 { color: #c33; margin-bottom: 1rem; }
          p { color: #666; }
        `}</style>
      </div>
    );
  }

  if (!analytics) return null;

  const stats = [
    { label: 'Total Users', value: analytics.totalUsers, icon: '👥', color: '#6b5bff' },
    { label: 'Total Products', value: analytics.totalProducts, icon: '📦', color: '#ff6b9d' },
    { label: 'Total Orders', value: analytics.totalOrders, icon: '🛍️', color: '#c44cff' },
    { label: 'Revenue', value: `$${analytics.totalRevenue.toFixed(2)}`, icon: '💰', color: '#2ecc71' },
  ];

  const statusColors: Record<string, string> = {
    pending: '#f59e0b',
    processing: '#3b82f6',
    shipped: '#8b5cf6',
    delivered: '#10b981',
    cancelled: '#ef4444',
  };

  return (
    <div className="analytics-page">
      <h1 className="page-title">Analytics Dashboard 📊</h1>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-icon" style={{ background: `${stat.color}20` }}>
              {stat.icon}
            </span>
            <div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="card">
          <h2 className="card-title">Orders by Status</h2>
          <div className="status-list">
            {Object.entries(analytics.ordersByStatus).map(([status, count]) => (
              <div key={status} className="status-row">
                <span className="status-name">
                  <span
                    className="status-dot"
                    style={{ background: statusColors[status] || '#999' }}
                  />
                  {status}
                </span>
                <span className="status-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="card-title">Recent Orders</h2>
          <div className="recent-list">
            {analytics.recentOrders.length === 0 ? (
              <p className="empty-text">No orders yet</p>
            ) : (
              analytics.recentOrders.map((order) => (
                <div key={order.id} className="recent-order">
                  <div className="recent-info">
                    <p className="recent-customer">{order.customerName}</p>
                    <p className="recent-email">{order.customerEmail}</p>
                  </div>
                  <div className="recent-meta">
                    <span className="recent-total">${order.total.toFixed(2)}</span>
                    <span
                      className="recent-status"
                      style={{ color: statusColors[order.status] || '#999' }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="card-title">⚠️ Low Stock Alerts</h2>
        {analytics.lowStockProducts.length === 0 ? (
          <p className="empty-text">All products are well stocked! 🎉</p>
        ) : (
          <div className="low-stock-list">
            {analytics.lowStockProducts.map((product) => (
              <div key={product.id} className="low-stock-item">
                <span className="product-name">{product.name}</span>
                <span className="stock-badge">Only {product.stock} left</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .analytics-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          gap: 1rem;
        }

        .loading span {
          font-size: 4rem;
          animation: bounce 1s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .loading p {
          color: #666;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        }

        .stat-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: #333;
          margin: 0;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          margin: 0;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: #333;
        }

        .status-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f8f9fc;
          border-radius: 10px;
        }

        .status-name {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #333;
          text-transform: capitalize;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-count {
          font-weight: 800;
          color: #333;
          font-size: 1.1rem;
        }

        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 350px;
          overflow-y: auto;
        }

        .recent-order {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f8f9fc;
          border-radius: 10px;
        }

        .recent-customer {
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .recent-email {
          font-size: 0.8rem;
          color: #999;
          margin: 0;
        }

        .recent-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .recent-total {
          font-weight: 700;
          color: #333;
        }

        .recent-status {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .low-stock-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .low-stock-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #fff3cd;
          border-radius: 10px;
        }

        .product-name {
          font-weight: 600;
          color: #333;
        }

        .stock-badge {
          background: #f59e0b;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .empty-text {
          color: #999;
          text-align: center;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
}
