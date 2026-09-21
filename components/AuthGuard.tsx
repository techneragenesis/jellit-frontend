'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasSkippedAuth, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect if still loading
    if (isLoading) return;

    // If user is authenticated and on login page, redirect to home
    if (isAuthenticated && pathname === '/login') {
      router.replace('/');
      return;
    }

    // Don't redirect if already on login page
    if (pathname === '/login') return;

    // Only redirect to login if user is neither authenticated nor has skipped auth
    if (!isAuthenticated && !hasSkippedAuth) {
      router.push('/login');
    }
  }, [isAuthenticated, hasSkippedAuth, isLoading, pathname, router]);

  // Show loading state (but not on login page)
  if (isLoading && pathname !== '/login') {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <span className="spinner-emoji">🫐</span>
        </div>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
          }

          .loading-spinner {
            font-size: 4rem;
            animation: bounce 1s ease-in-out infinite;
          }

          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  return <>{children}</>;
}
