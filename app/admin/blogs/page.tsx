'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import {
    Blog,
    createBlog,
    deleteAdminBlog,
    getBlogs,
    updateAdminBlog,
} from '../../../lib/api';

export default function AdminBlogsPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    imageUrl: '',
  });

  const fetchBlogs = async () => {
    const response = await getBlogs();
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setBlogs(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', content: '', author: user?.name || 'Admin', imageUrl: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (blog: Blog) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      imageUrl: blog.imageUrl || '',
    });
    setEditingId(blog.id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (editingId) {
      const updates: Partial<Blog> = {
        title: formData.title,
        content: formData.content,
      };
      if (formData.imageUrl) updates.imageUrl = formData.imageUrl;

      const response = await updateAdminBlog(user.id, editingId, updates);
      if (response.error) {
        alert('Failed to update blog: ' + response.error);
        return;
      }
    } else {
      const response = await createBlog({
        title: formData.title,
        content: formData.content,
        author: formData.author || 'Admin',
        imageUrl: formData.imageUrl || undefined,
      });
      if (response.error) {
        alert('Failed to create blog: ' + response.error);
        return;
      }
    }

    resetForm();
    await fetchBlogs();
  };

  const handleDelete = async (blogId: string, title: string) => {
    if (!user) return;
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    const response = await deleteAdminBlog(user.id, blogId);
    if (response.error) {
      alert('Failed to delete blog: ' + response.error);
    } else {
      await fetchBlogs();
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <span>📝</span>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="blogs-page">
      <div className="page-header">
        <h1 className="page-title">Blog Management 📝</h1>
        <button
          className="add-button"
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : '+ New Blog Post'}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm && (
        <form className="blog-form" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Blog Post' : 'Create Blog Post'}</h3>
          <input
            type="text"
            placeholder="Blog title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            type="url"
            placeholder="Image URL (optional)"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          <textarea
            placeholder="Blog content *"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
            rows={6}
          />
          <button type="submit" className="submit-button">
            {editingId ? 'Update Post' : 'Publish Post'}
          </button>
        </form>
      )}

      <div className="blogs-list">
        {blogs.length === 0 ? (
          <div className="empty-state">
            <span>📄</span>
            <h3>No blog posts yet</h3>
            <p>Create your first blog post to get started!</p>
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              {blog.imageUrl && (
                <div className="blog-image">
                  <img src={blog.imageUrl} alt={blog.title} />
                </div>
              )}
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{blog.content.substring(0, 200)}...</p>
                <div className="blog-meta">
                  <span className="blog-author">By {blog.author}</span>
                  <span className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="blog-actions">
                <button className="edit-btn" onClick={() => startEdit(blog)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog.id, blog.title)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .blogs-page {
          max-width: 1000px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .page-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.02em;
        }

        .add-button {
          background: #111827;
          color: white;
          border: none;
          padding: 0.65rem 1.4rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .add-button:hover {
          background: #FF4D8D;
        }

        .error-banner {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .blog-form {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .blog-form h3 {
          margin: 0;
          color: #333;
        }

        .blog-form input,
        .blog-form textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .blog-form input:focus,
        .blog-form textarea:focus {
          outline: none;
          border-color: #111827;
        }

        .submit-button {
          background: #111827;
          color: white;
          border: none;
          padding: 0.7rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          align-self: flex-start;
          transition: background 0.15s ease;
        }

        .submit-button:hover {
          background: #FF4D8D;
        }

        .blogs-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .blog-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          align-items: center;
        }

        .blog-image img {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 12px;
        }

        .blog-content {
          flex: 1;
        }

        .blog-title {
          margin: 0 0 0.5rem;
          color: #333;
          font-size: 1.25rem;
        }

        .blog-excerpt {
          color: #666;
          font-size: 0.9rem;
          margin: 0 0 0.75rem;
        }

        .blog-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          color: #999;
        }

        .blog-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .edit-btn,
        .delete-btn {
          border: none;
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #e3f2fd;
          color: #1976d2;
        }

        .delete-btn {
          background: #fee;
          color: #c33;
        }

        .edit-btn:hover,
        .delete-btn:hover {
          transform: translateY(-1px);
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

        @media (max-width: 768px) {
          .blog-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .blog-actions {
            flex-direction: row;
            width: 100%;
          }

          .edit-btn, .delete-btn {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
}
