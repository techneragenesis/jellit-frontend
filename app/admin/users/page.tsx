'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import { getAdminUsers, AdminUser } from '../../../lib/api';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user) return;
      const response = await getAdminUsers(user.id);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setUsers(response.data);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, [user]);

  if (isLoading) {
    return (
      <div className="loading">
        <span>👥</span>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">
      <h1 className="page-title">User Management 👥</h1>
      <p className="page-note">
        Note: User roles can only be changed directly in the database.
      </p>

      {error && <div className="error-banner">{error}</div>}

      {users.length === 0 ? (
        <div className="empty-state">
          <span>👤</span>
          <h3>No users found</h3>
          <p>Registered users will appear here.</p>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="name-cell">
                    <div className="user-avatar">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    {u.name}
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td>
                    <span className={`role-badge ${u.role === 'admin' ? 'admin' : 'customer'}`}>
                      {u.role || 'customer'}
                    </span>
                  </td>
                  <td className="date-cell">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .users-page {
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-note {
          color: #999;
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        .error-banner {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .users-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        .users-table th {
          text-align: left;
          padding: 1rem;
          background: #f8f9fc;
          font-weight: 700;
          color: #333;
          border-bottom: 2px solid #eee;
        }

        .users-table td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
          color: #555;
        }

        .name-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          color: #333;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .role-badge {
          padding: 0.3rem 0.85rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .role-badge.admin {
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          color: white;
        }

        .role-badge.customer {
          background: #e3f2fd;
          color: #1976d2;
        }

        .date-cell {
          color: #999;
          font-size: 0.9rem;
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
