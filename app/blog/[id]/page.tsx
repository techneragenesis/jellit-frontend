'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthGuard from '../../../components/AuthGuard';
import { Blog, getBlog } from '../../../lib/api';

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await getBlog(params.id);
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setBlog(response.data);
      }
      setIsLoading(false);
    };

    if (params.id) fetchBlog();
  }, [params.id]);

  if (isLoading) {
    return (
      <AuthGuard>
        <main className="article-page loading-state">
          <span>📖</span>
          <p>Loading article...</p>
          <style jsx>{`
            .article-page { min-height: 70vh; background: #FFF6E9; }
            .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; }
            .loading-state span { font-size: 4rem; }
            .loading-state p { font-weight: 600; color: #555; }
          `}</style>
        </main>
      </AuthGuard>
    );
  }

  if (error || !blog) {
    return (
      <AuthGuard>
        <main className="article-page error-state">
          <div className="error-card">
            <span>🫐</span>
            <h1>Article not found</h1>
            <p>{error || 'This article is unavailable.'}</p>
            <Link href="/blog">← Back to Blog</Link>
          </div>
          <style jsx>{`
            .article-page { min-height: 70vh; background: #FFF6E9; padding: 4rem 1rem; }
            .error-card { max-width: 520px; margin: auto; padding: 3rem 2rem; text-align: center; background: white; border: 3px solid #1a1a1a; border-radius: 18px; box-shadow: 6px 6px 0 #1a1a1a; }
            .error-card span { font-size: 4rem; }
            .error-card h1 { margin: 1rem 0 0.5rem; font-family: 'Archivo Black', sans-serif; text-transform: uppercase; }
            .error-card p { color: #666; margin-bottom: 1.5rem; }
            .error-card :global(a) { font-weight: 700; color: #7B4DFF; }
          `}</style>
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <main className="article-page">
        <article className="article">
          <Link href="/blog" className="back-link">← Back to Blog</Link>
          {blog.imageUrl && (
            <img className="hero-image" src={blog.imageUrl} alt={blog.title} />
          )}
          <header className="article-header">
            <div className="article-meta">
              <span>By {blog.author}</span>
              <span>{new Date(blog.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <h1>{blog.title}</h1>
          </header>
          <div className="article-content">{blog.content}</div>
        </article>

        <style jsx>{`
          .article-page {
            min-height: 100vh;
            background: #FFF6E9;
            padding: 3rem 1.5rem 5rem;
          }

          .article {
            width: min(900px, 100%);
            margin: 0 auto;
          }

          :global(.back-link) {
            display: inline-block;
            margin-bottom: 1.5rem;
            color: #1a1a1a;
            font-weight: 700;
            text-decoration: none;
          }

          :global(.back-link:hover) {
            color: #FF4D8D;
          }

          .hero-image {
            display: block;
            width: 100%;
            max-height: 520px;
            object-fit: cover;
            border: 3px solid #1a1a1a;
            border-radius: 18px;
            box-shadow: 7px 7px 0 #1a1a1a;
            margin-bottom: 3rem;
          }

          .article-header {
            max-width: 780px;
            margin: 0 auto 2.5rem;
          }

          .article-meta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            padding-bottom: 1rem;
            margin-bottom: 1.5rem;
            border-bottom: 2px solid #1a1a1a;
            color: #666;
            font-size: 0.9rem;
            font-weight: 700;
          }

          h1 {
            font-family: 'Archivo Black', 'Space Grotesk', sans-serif;
            font-size: clamp(2.25rem, 7vw, 4.5rem);
            line-height: 1.05;
            letter-spacing: -0.03em;
            color: #1a1a1a;
            text-transform: uppercase;
            overflow-wrap: anywhere;
          }

          .article-content {
            max-width: 780px;
            margin: 0 auto;
            color: #292929;
            font-size: 1.1rem;
            line-height: 1.9;
            white-space: pre-wrap;
            overflow-wrap: anywhere;
          }

          @media (max-width: 768px) {
            .article-page {
              padding: 2rem 1rem 4rem;
            }

            .hero-image {
              max-height: 340px;
              margin-bottom: 2rem;
              border-radius: 14px;
              box-shadow: 5px 5px 0 #1a1a1a;
            }

            .article-meta {
              flex-direction: column;
              gap: 0.25rem;
            }

            .article-content {
              font-size: 1rem;
              line-height: 1.8;
            }
          }
        `}</style>
      </main>
    </AuthGuard>
  );
}
