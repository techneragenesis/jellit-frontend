'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AdminGuard from '../../components/AdminGuard';

const navItems = [
  { href: '/admin/analytics', label: 'Analytics', icon: '📊' },
  { href: '/admin/products', label: 'Inventory', icon: '📦' },
  { href: '/admin/blogs', label: 'Blogs', icon: '📝' },
  { href: '/admin/orders', label: 'Orders', icon: '🛍️' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AdminGuard>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-logo">🫐</span>
            <div className="sidebar-title-wrap">
              <span className="sidebar-title">Jellit Admin</span>
              <span className="sidebar-subtitle">Management Console</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            ))}
          </nav>
          <Link href="/" className="sidebar-back">
            ← Back to Store
          </Link>
        </aside>
        <main className="admin-main">{children}</main>
      </div>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: calc(100vh - 120px);
          background: #f4f5f7;
        }

        .admin-sidebar {
          width: 240px;
          background: #16181d;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          align-self: flex-start;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.5rem 1.25rem;
          border-bottom: 1px solid #2a2e37;
          margin-bottom: 1.25rem;
        }

        .sidebar-logo {
          font-size: 1.6rem;
        }

        .sidebar-title-wrap {
          display: flex;
          flex-direction: column;
        }

        .sidebar-title {
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: -0.01em;
        }

        .sidebar-subtitle {
          color: #6b7280;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
          color: #9ca3af;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.15s ease;
        }

        .sidebar-link:hover {
          background: #23262e;
          color: #fff;
        }

        .sidebar-link.active {
          background: #2d3340;
          color: #fff;
          box-shadow: inset 3px 0 0 #FF4D8D;
        }

        .sidebar-icon {
          font-size: 1.1rem;
        }

        .sidebar-back {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.75rem 0.85rem;
          border-top: 1px solid #2a2e37;
          transition: color 0.15s ease;
        }

        .sidebar-back:hover {
          color: #fff;
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
          min-width: 0;
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            width: 200px;
          }

          .sidebar-link {
            padding: 0.55rem 0.75rem;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .admin-layout {
            flex-direction: column;
          }

          .admin-sidebar {
            width: 100%;
            height: auto;
            position: static;
            flex-direction: column;
            padding: 0.75rem;
          }

          .sidebar-header {
            padding: 0 0.25rem 0.75rem;
            margin-bottom: 0.75rem;
          }

          .sidebar-logo {
            font-size: 1.3rem;
          }

          .sidebar-title {
            font-size: 0.9rem;
          }

          .sidebar-subtitle {
            font-size: 0.6rem;
          }

          .sidebar-nav {
            flex-direction: row;
            gap: 0.35rem;
            overflow-x: auto;
            padding-bottom: 0.25rem;
            -webkit-overflow-scrolling: touch;
          }

          .sidebar-link {
            white-space: nowrap;
            padding: 0.45rem 0.8rem;
            font-size: 0.8rem;
            flex-shrink: 0;
          }

          .sidebar-link.active {
            box-shadow: none;
            background: #FF4D8D;
          }

          .sidebar-icon {
            font-size: 1rem;
          }

          .sidebar-back {
            border-top: none;
            white-space: nowrap;
            padding: 0.45rem 0.8rem;
            font-size: 0.8rem;
            align-self: flex-start;
          }

          .admin-main {
            padding: 1rem;
          }
        }
      `}</style>
    </AdminGuard>
  );
}
