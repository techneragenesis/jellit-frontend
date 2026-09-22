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
            <span className="sidebar-title">Admin Panel</span>
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
          min-height: calc(100vh - 70px);
          background: #f8f9fc;
        }

        .admin-sidebar {
          width: 240px;
          background: linear-gradient(180deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 70px;
          height: calc(100vh - 70px);
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 1.5rem;
        }

        .sidebar-logo {
          font-size: 1.8rem;
        }

        .sidebar-title {
          color: white;
          font-weight: 800;
          font-size: 1.2rem;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }

        .sidebar-link.active {
          background: rgba(255, 255, 255, 0.25);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }

        .sidebar-icon {
          font-size: 1.3rem;
        }

        .sidebar-back {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-size: 0.9rem;
          padding: 0.75rem 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
          transition: color 0.3s ease;
        }

        .sidebar-back:hover {
          color: white;
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            width: 200px;
          }

          .sidebar-link {
            padding: 0.65rem 0.85rem;
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
            padding-bottom: 0.75rem;
            margin-bottom: 0.75rem;
          }

          .sidebar-title {
            font-size: 1rem;
          }

          .sidebar-logo {
            font-size: 1.4rem;
          }

          .sidebar-nav {
            flex-direction: row;
            gap: 0.4rem;
            overflow-x: auto;
            padding-bottom: 0.25rem;
            -webkit-overflow-scrolling: touch;
          }

          .sidebar-link {
            white-space: nowrap;
            padding: 0.5rem 0.9rem;
            font-size: 0.85rem;
            flex-shrink: 0;
          }

          .sidebar-icon {
            font-size: 1.1rem;
          }

          .sidebar-back {
            border-top: none;
            white-space: nowrap;
            padding: 0.5rem 0.9rem;
            font-size: 0.85rem;
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
