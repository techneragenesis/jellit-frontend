const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic API client with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
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
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
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
}

export async function getBlogs() {
  return apiRequest<Blog[]>('/api/blogs');
}

export async function getBlog(blogId: string) {
  return apiRequest<Blog>(`/api/blogs/${blogId}`);
}

export async function createBlog(blog: Omit<Blog, 'id' | 'createdAt'>) {
  return apiRequest<Blog>('/api/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
}
