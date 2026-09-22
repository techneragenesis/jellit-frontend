'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import { Blog as ApiBlog, getBlogs } from '../../lib/api';

export default function BlogPage() {
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
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
        <h1 className="blog-title">
          Blog 
          <span className="title-emoji">📖</span>
        </h1>
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
            <div key={blog.id} className="blog-card">
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
                  {expandedBlog === blog.id
                    ? blog.content
                    : blog.content.length > 180
                      ? blog.content.substring(0, 180) + '...'
                      : blog.content}
                </p>
                {blog.content.length > 180 && (
                  <button
                    className="expand-button"
                    onClick={() => setExpandedBlog(expandedBlog === blog.id ? null : blog.id)}
                  >
                    {expandedBlog === blog.id ? 'Show Less ▲' : 'Read More ▼'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .blog-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
          padding: 2rem;
        }

        .blog-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .blog-title {
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

        .blog-subtitle {
          font-size: 1.3rem;
          color: #666;
        }

        .error-banner {
          max-width: 600px;
          margin: 0 auto 2rem;
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
        }

        .empty-state {
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

        .empty-state h3 {
          font-size: 1.5rem;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: #666;
        }

        .blogs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .blog-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .blog-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
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
          color: #999;
        }

        .blog-author {
          font-weight: 600;
          color: #c44cff;
        }

        .blog-card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .blog-excerpt {
          color: #666;
          line-height: 1.7;
          margin-bottom: 1rem;
          flex: 1;
          white-space: pre-line;
        }

        .expand-button {
          width: 100%;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          border: none;
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .expand-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(196, 76, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .blogs-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .blog-title {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .blog-container {
            padding: 1.5rem 1rem;
          }

          .blog-title {
            font-size: 2rem;
          }

          .blog-subtitle {
            font-size: 1.1rem;
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
