'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import { getAdminOrders, Order, updateAdminOrderStatus } from '../../../lib/api';

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    if (!user) return;
    const response = await getAdminOrders(user.id);
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setOrders(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const updateStatus = async (orderId: string, status: string) => {
    if (!user) return;
    setUpdatingId(orderId);

    const response = await updateAdminOrderStatus(user.id, orderId, status);
    if (response.error) {
      alert('Failed to update order status: ' + response.error);
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    }
    setUpdatingId(null);
  };

  const statusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#999';
  };

  if (isLoading) {
    return (
      <div className="loading">
        <span>🛍️</span>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1 className="page-title">Orders Management 🛍️</h1>

      {error && <div className="error-banner">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-state">
          <span>📭</span>
          <h3>No orders yet</h3>
          <p>Orders will appear here once customers start purchasing.</p>
        </div>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">#{order.id.slice(0, 8)}</td>
                  <td className="customer-cell">{order.userId.slice(0, 8)}...</td>
                  <td className="items-cell">
                    {order.items.map((item, i) => (
                      <div key={item.id || i} className="order-item-line">
                        {item.quantity}× ${item.price.toFixed(2)}
                      </div>
                    ))}
                  </td>
                  <td className="total-cell">${order.total.toFixed(2)}</td>
                  <td className="date-cell">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      disabled={updatingId === order.id}
                      style={{ borderColor: statusColor(order.status), color: statusColor(order.status) }}
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .orders-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: #111827;
          letter-spacing: -0.02em;
        }

        .error-banner {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .orders-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 800px;
        }

        .orders-table th {
          text-align: left;
          padding: 1rem;
          background: #f8f9fc;
          font-weight: 700;
          color: #333;
          border-bottom: 2px solid #eee;
        }

        .orders-table td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }

        .order-id {
          font-weight: 700;
          color: #111827;
          font-family: monospace;
        }

        .customer-cell {
          color: #666;
          font-family: monospace;
          font-size: 0.9rem;
        }

        .items-cell {
          color: #666;
          font-size: 0.9rem;
        }

        .order-item-line {
          padding: 0.15rem 0;
        }

        .total-cell {
          font-weight: 700;
          color: #333;
        }

        .date-cell {
          color: #666;
          font-size: 0.9rem;
          white-space: nowrap;
        }

        .status-select {
          padding: 0.5rem 0.75rem;
          border: 2px solid;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          background: white;
          cursor: pointer;
          font-family: inherit;
        }

        .status-select:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 16px;
        }

        .empty-state span {
          font-size: 4rem;
        }

        .empty-state h3 {
          margin: 1rem 0 0.5rem;
          color: #333;
        }

        .empty-state p {
          color: #666;
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
      `}</style>
    </div>
  );
}
