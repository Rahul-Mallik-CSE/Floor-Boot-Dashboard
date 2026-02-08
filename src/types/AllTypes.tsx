/** @format */

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface Feedback {
  id: string;
  name: string;
  message: string;
  productId: string;
  timestamp: string;
  avatar?: string;
}

export interface ApiFeedback {
  id: number;
  user: {
    full_name: string;
    image: string;
  };
  customer_feedback: string;
  updated_at: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  feedbacks: ApiFeedback[];
}

export interface LinkedAccount {
  id: string;
  provider: string;
  accountNumber: string;
  isConnected: boolean;
  logo?: string;
}

export interface WalletData {
  totalBalance: number;
  pendingAmount: number;
  linkedAccounts: LinkedAccount[];
}

export type PaymentMethodType = "card" | "bank";

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  country: string;
  zipCode: string;
}

export interface CatalogueProduct {
  id: string;
  slNo: string;
  itemName: string;
  productId: string;
  category: string;
  subCategory: string;
  price: number;
  inStockQty: number;
  imageUrl?: string;
}

export type OrderStatus = "shipped" | "unshipped" | "cancelled";

export interface Order {
  id: string;
  purchaseOrder: string;
  productId: string;
  orderDate: string;
  orderTotal: number;
  customer: string;
  shipMethod: string;
  carrier: string;
  trackingNo: string;
  item: string;
  qty: number;
  status: OrderStatus;
}

export interface WalletBalanceResponse {
  success: boolean;
  total_balance: number;
  pending_amount: number;
  currency: string;
}

export interface FeedbackUser {
  full_name: string;
  image: string;
}

export interface FeedbackItem {
  id: number;
  user: FeedbackUser;
  custormer_feedback: string;
  updated_at: string;
}

export interface FeedbackResponse {
  success: boolean;
  message: string;
  feedbacks: FeedbackItem[];
}
