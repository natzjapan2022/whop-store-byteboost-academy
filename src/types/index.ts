export interface User {
  id: string;
  name: string;
  email: string;
  datePurchased: string;
  status: 'Active' | 'Inactive' | 'Pending';
  [key: string]: string | number | boolean;
}

export interface Column {
  id: string;
  label: string;
  type: 'text' | 'email' | 'date' | 'select' | 'textarea';
  required: boolean;
  options?: string[];
}

export interface AdminSession {
  username: string;
  timestamp: number;
  expiresAt: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  productId: string;
  features: string[];
  description: string;
}