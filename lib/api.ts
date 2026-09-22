const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic API client with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  adminUserId?: string
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(adminUserId && { 'x-user-id': adminUserId }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // Handle different error response formats from backend
      const errorMessage = errorData.error || errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    return { error: errorMessage };
  }
}

// Health Check
export async function checkHealth() {
  return apiRequest('/health');
}

// User APIs
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role?: string;
  createdAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export async function registerUser(credentials: RegisterCredentials) {
  return apiRequest<User>('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function loginUser(credentials: LoginCredentials) {
  return apiRequest<User>('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getUserProfile(userId: string) {
  return apiRequest<User>(`/api/users/${userId}`);
}

// Product APIs
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock?: number;
  createdAt: string;
  updatedAt: string;
  emoji?: string;
  category?: string;
}

export async function getProducts() {
  return apiRequest<Product[]>('/api/products');
}

export async function getProduct(productId: string) {
  return apiRequest<Product>(`/api/products/${productId}`);
}

export async function createProduct(product: Omit<Product, 'id'>) {
  return apiRequest<Product>('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

// Order APIs
export interface OrderItem {
  id?: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export async function createOrder(order: { userId: string; items: OrderItem[] }) {
  return apiRequest<Order>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(order),
  });
}

export async function getUserOrders(userId: string) {
  return apiRequest<Order[]>(`/api/orders/user/${userId}`);
}

export async function getOrder(orderId: string) {
  return apiRequest<Order>(`/api/orders/${orderId}`);
}

// Blog APIs
export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getBlogs() {
  return apiRequest<Blog[]>('/api/blogs');
}

export async function getBlog(blogId: string) {
  return apiRequest<Blog>(`/api/blogs/${blogId}`);
}

export async function createBlog(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) {
  return apiRequest<Blog>('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
}

// ============ Admin APIs ============
// All admin endpoints require x-user-id header with admin's user ID

export interface Analytics {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  ordersByStatus: {
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
    cancelled: number;
  };
  recentOrders: {
    id: string;
    total: number;
    status: string;
    customerName: string;
    customerEmail: string;
    createdAt: string;
  }[];
  lowStockProducts: {
    id: string;
    name: string;
    stock: number;
  }[];
}

export interface AdminUser extends User {
  role: string;
  createdAt: string;
}

export async function getAdminAnalytics(adminUserId: string) {
  return apiRequest<Analytics>('/api/admin/analytics', {}, adminUserId);
}

export async function updateAdminProduct(adminUserId: string, productId: string, updates: Partial<Product>) {
  return apiRequest<Product>(`/api/admin/products/${productId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, adminUserId);
}

export async function deleteAdminProduct(adminUserId: string, productId: string) {
  return apiRequest<{ message: string }>(`/api/admin/products/${productId}`, {
    method: 'DELETE',
  }, adminUserId);
}

export async function updateAdminBlog(adminUserId: string, blogId: string, updates: Partial<Blog>) {
  return apiRequest<Blog>(`/api/admin/blogs/${blogId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  }, adminUserId);
}

export async function deleteAdminBlog(adminUserId: string, blogId: string) {
  return apiRequest<{ message: string }>(`/api/admin/blogs/${blogId}`, {
    method: 'DELETE',
  }, adminUserId);
}

export async function getAdminUsers(adminUserId: string) {
  return apiRequest<AdminUser[]>('/api/admin/users', {}, adminUserId);
}

export async function getAdminOrders(adminUserId: string) {
  return apiRequest<Order[]>('/api/admin/orders', {}, adminUserId);
}

export async function updateAdminOrderStatus(adminUserId: string, orderId: string, status: string) {
  return apiRequest<Order>(`/api/admin/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }, adminUserId);
}
