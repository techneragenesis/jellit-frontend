'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import { Blog as ApiBlog, getBlogs } from '../../lib/api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await getBlogs();
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setBlogs(response.data);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <AuthGuard>
        <div className="blog-container">
          <div className="loading-container">
            <span className="loading-emoji">📖</span>
            <p>Loading posts...</p>
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
      <div className="blog-container">
      <div className="blog-header">
        <div className="page-badge">✶ FRESH FROM THE LAB ✶</div>
        <h1 className="blog-title">THE BLOG.</h1>
        <p className="blog-subtitle">
          Level up your jelly game with our latest posts and recipes.
        </p>
      </div>

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
        </div>
      )}

      {blogs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-emoji">📝</span>
          <h3>No posts yet</h3>
          <p>Check back soon for jelly content!</p>
        </div>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.id}`} className="blog-card">
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title} />
                </div>
              )}
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-author">✍️ {blog.author}</span>
                  <span className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="blog-card-title">{blog.title}</h3>
                <p className="blog-excerpt">
                  {blog.content.length > 180 ? blog.content.substring(0, 180) + '...' : blog.content}
                </p>
                <span className="expand-button">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        .blog-container {
          min-height: 100vh;
          background: #FFF6E9;
          padding: 3rem 2rem;
        }

        .blog-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .page-badge {
          display: inline-block;
          background: #4ADE80;
          border: 2px solid #1a1a1a;
          box-shadow: 3px 3px 0 #1a1a1a;
          padding: 0.4rem 1rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          border-radius: 50px;
          margin-bottom: 1.25rem;
          transform: rotate(-2deg);
        }

        .blog-title {
          font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 7vw, 4.5rem);
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .blog-subtitle {
          font-size: 1.15rem;
          color: #555;
          font-weight: 500;
        }

        .error-banner {
          max-width: 600px;
          margin: 0 auto 2rem;
          background: #FFD0D0;
          border: 2px solid #1a1a1a;
          color: #1a1a1a;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          font-weight: 600;
        }

        .empty-state {
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

        .empty-state h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.5rem;
          color: #1a1a1a;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .empty-state p {
          color: #666;
          font-weight: 500;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        :global(.blog-card) {
          background: white;
          border: 3px solid #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 6px 6px 0 #1a1a1a;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          color: inherit;
          text-decoration: none;
        }

        :global(.blog-card:hover) {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #1a1a1a;
        }

        .blog-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          border-bottom: 3px solid #1a1a1a;
        }

        .blog-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .blog-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: #777;
        }

        .blog-author {
          font-weight: 700;
          color: #7B4DFF;
        }

        .blog-card-title {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.3rem;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .blog-excerpt {
          color: #555;
          line-height: 1.7;
          margin-bottom: 1rem;
          flex: 1;
          white-space: pre-line;
          font-size: 0.95rem;
        }

        .expand-button {
          width: 100%;
          background: #1a1a1a;
          border: 2px solid #1a1a1a;
          color: #FFF6E9;
          padding: 0.7rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
          font-family: inherit;
        }

        .expand-button:hover {
          background: #7B4DFF;
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 #1a1a1a;
        }

        @media (max-width: 1024px) {
          .blogs-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .blog-container {
            padding: 2rem 1rem;
          }

          .blog-subtitle {
            font-size: 1.05rem;
          }

          .blogs-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </div>
    </AuthGuard>
  );
}
