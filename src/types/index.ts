export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image: string;
  badge?: string | null;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface Order {
  id: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  totalAmount: number;
  status: string;
  emailSent: boolean;
  emailProvider?: string | null;
  items: OrderItem[];
  createdAt: string | Date;
}
