export type Category = 
  | 'All'
  | 'Hair Accessories'
  | 'Ribbon Bows'
  | 'Claw Clips'
  | 'Stationery'
  | 'Notebooks & Journals'
  | 'Pens & Writing'
  | 'Stickers & Crafts'
  | 'Keychains'
  | 'Gifts & Bundles';

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  parentCategory: 'Hair Accessories' | 'Stationery' | 'Gifts & Bundles';
  price: number; // in PHP
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  stock: number;
  images: string[];
  variants?: ProductVariant[];
  tags: string[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isSale?: boolean;
  dimensions?: string;
  materials?: string;
  careInstructions?: string;
}

export interface CartItem {
  id: string; // unique item key: productId + variant
  product: Product;
  selectedVariant?: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  orderNotes?: string;
}

export type PaymentMethod = 
  | 'gcash'
  | 'maya'
  | 'cod'
  | 'bank_transfer'
  | 'credit_card';

export type DeliveryOption = 'standard_metro' | 'provincial' | 'express';

export interface OrderItem {
  product: Product;
  selectedVariant?: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  shippingFee: number;
  giftWrappingFee?: number;
  hasGiftWrapping?: boolean;
  pointsDiscount?: number;
  pointsEarned?: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentMethodLabel: string;
  deliveryOption: DeliveryOption;
  status: 'Processing' | 'Wrapping with Satin Bow' | 'Dispatched' | 'Delivered';
  trackingNumber: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  defaultAddress?: Partial<ShippingAddress>;
  loyaltyPoints?: number;
  tier?: 'Blush Darling' | 'Rose Princess' | 'Coquette Royalty';
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
  verified: boolean;
}
