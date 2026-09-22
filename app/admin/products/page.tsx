'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../lib/AuthContext';
import {
  getProducts,
  createProduct,
  updateAdminProduct,
  deleteAdminProduct,
  Product,
} from '../../../lib/api';

interface EditableProduct extends Product {
  isEditing?: boolean;
}

export default function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editValues, setEditValues] = useState<Partial<Product>>({});
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
  });

  const fetchProducts = async () => {
    const response = await getProducts();
    if (response.error) {
      setError(response.error);
    } else if (response.data) {
      setProducts(response.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const startEdit = (product: EditableProduct) => {
    setProducts(products.map(p => ({ ...p, isEditing: p.id === product.id })));
    setEditValues({
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || '',
      stock: product.stock,
    });
  };

  const cancelEdit = (productId: string) => {
    setProducts(products.map(p => ({ ...p, isEditing: false })));
    setEditValues({});
  };

  const saveEdit = async (productId: string) => {
    if (!user) return;

    const updates: Partial<Product> = {};
    if (editValues.name !== undefined) updates.name = editValues.name;
    if (editValues.description !== undefined) updates.description = editValues.description;
    if (editValues.price !== undefined) updates.price = Number(editValues.price);
    if (editValues.imageUrl !== undefined) updates.imageUrl = editValues.imageUrl;
    if (editValues.stock !== undefined) updates.stock = Number(editValues.stock);

    const response = await updateAdminProduct(user.id, productId, updates);
    if (response.error) {
      alert('Failed to update product: ' + response.error);
    } else {
      await fetchProducts();
      setEditValues({});
    }
  };

  const deleteProduct = async (productId: string, name: string) => {
    if (!user) return;
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

    const response = await deleteAdminProduct(user.id, productId);
    if (response.error) {
      alert('Failed to delete product: ' + response.error);
    } else {
      await fetchProducts();
    }
  };

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const response = await createProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      imageUrl: newProduct.imageUrl || undefined,
      stock: newProduct.stock ? parseInt(newProduct.stock) : undefined,
      createdAt: '',
      updatedAt: '',
    });

    if (response.error) {
      alert('Failed to create product: ' + response.error);
    } else {
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', stock: '' });
      setShowAddForm(false);
      await fetchProducts();
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <span>📦</span>
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <div className="inventory-page">
      <div className="page-header">
        <h1 className="page-title">Inventory Management 📦</h1>
        <button className="add-button" onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Cancel' : '+ Add Product'}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showAddForm && (
        <form className="add-form" onSubmit={addProduct}>
          <h3>New Product</h3>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Product name *"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              required
            />
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="Price *"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              required
            />
            <input
              type="number"
              min="0"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            />
          </div>
          <textarea
            placeholder="Description *"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            required
            rows={3}
          />
          <button type="submit" className="submit-button">Create Product</button>
        </form>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Image URL</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                {product.isEditing ? (
                  <>
                    <td>
                      <input
                        type="text"
                        value={editValues.name || ''}
                        onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editValues.description || ''}
                        onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={editValues.price || ''}
                        onChange={(e) => setEditValues({ ...editValues, price: parseFloat(e.target.value) })}
                        className="edit-input small"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="0"
                        value={editValues.stock ?? ''}
                        onChange={(e) => setEditValues({ ...editValues, stock: parseInt(e.target.value) })}
                        className="edit-input small"
                      />
                    </td>
                    <td>
                      <input
                        type="url"
                        value={editValues.imageUrl || ''}
                        onChange={(e) => setEditValues({ ...editValues, imageUrl: e.target.value })}
                        className="edit-input"
                      />
                    </td>
                    <td className="actions-cell">
                      <button className="save-btn" onClick={() => saveEdit(product.id)}>Save</button>
                      <button className="cancel-btn" onClick={() => cancelEdit(product.id)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="product-name-cell">
                      {product.imageUrl && (
                        <img src={product.imageUrl} alt={product.name} className="product-thumb" />
                      )}
                      <span>{product.name}</span>
                    </td>
                    <td className="desc-cell">{product.description}</td>
                    <td className="price-cell">${product.price.toFixed(2)}</td>
                    <td>
                      <span className={`stock-badge ${(product.stock ?? 0) < 5 ? 'low' : ''}`}>
                        {product.stock ?? 'N/A'}
                      </span>
                    </td>
                    <td className="url-cell">
                      {product.imageUrl ? (
                        <a href={product.imageUrl} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      ) : '—'}
                    </td>
                    <td className="actions-cell">
                      <button className="edit-btn" onClick={() => startEdit(product)}>Edit</button>
                      <button className="delete-btn" onClick={() => deleteProduct(product.id, product.name)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .inventory-page {
          max-width: 1400px;
          margin: 0 auto;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .page-title {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .add-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(196, 76, 255, 0.4);
        }

        .error-banner {
          background: #fee;
          color: #c33;
          padding: 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
        }

        .add-form {
          background: white;
          padding: 1.5rem;
          border-radius: 16px;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
        }

        .add-form h3 {
          margin-bottom: 1rem;
          color: #333;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .add-form input,
        .add-form textarea {
          padding: 0.75rem;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .add-form input:focus,
        .add-form textarea:focus {
          outline: none;
          border-color: #c44cff;
        }

        .submit-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 1rem;
        }

        .products-table-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
          overflow-x: auto;
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .products-table th {
          text-align: left;
          padding: 1rem;
          background: #f8f9fc;
          font-weight: 700;
          color: #333;
          border-bottom: 2px solid #eee;
        }

        .products-table td {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
          vertical-align: middle;
        }

        .product-name-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
          min-width: 200px;
        }

        .product-thumb {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 8px;
        }

        .desc-cell {
          max-width: 300px;
          color: #666;
          font-size: 0.9rem;
        }

        .price-cell {
          font-weight: 700;
          color: #c44cff;
        }

        .stock-badge {
          background: #d4edda;
          color: #155724;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .stock-badge.low {
          background: #fff3cd;
          color: #856404;
        }

        .url-cell a {
          color: #6b5bff;
        }

        .actions-cell {
          white-space: nowrap;
        }

        .edit-btn,
        .save-btn,
        .cancel-btn,
        .delete-btn {
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-right: 0.5rem;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .edit-btn {
          background: #e3f2fd;
          color: #1976d2;
        }

        .save-btn {
          background: #d4edda;
          color: #155724;
        }

        .cancel-btn {
          background: #f0f0f0;
          color: #666;
        }

        .delete-btn {
          background: #fee;
          color: #c33;
        }

        .edit-btn:hover, .save-btn:hover, .cancel-btn:hover, .delete-btn:hover {
          transform: translateY(-1px);
        }

        .edit-input {
          width: 100%;
          padding: 0.5rem;
          border: 2px solid #c44cff;
          border-radius: 8px;
          font-size: 0.9rem;
        }

        .edit-input.small {
          width: 90px;
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
