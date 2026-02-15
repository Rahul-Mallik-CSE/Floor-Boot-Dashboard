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

// Catalogue API Types
export interface ProductImage {
  id: number;
  image: string;
  title: string | null;
}

export interface ApiCatalogueProduct {
  id: number;
  product_title: string;
  brand_manufacturer: string;
  item_description: string;
  main_category: number;
  sub_category: string;
  primary_image: string;
  uploaded_images: ProductImage[];
  regular_price: string;
  sale_price: string;
  tax_price: string;
  product_id: string;
  pack_coverage: string;
  length: string;
  width: string;
  thickness: string;
  weight: string;
  installation_method: string;
  coverage_per_pack: string;
  pile_height: string | null;
  materials: string;
  format: string | null;
  is_underlay_required: boolean | null;
  is_calculate: boolean;
  available_colors: string;
  pattern_type: string | null;
  stock_quantity: number;
  return_policy: string;
}

export interface CatalogueProductsResponse {
  success: boolean;
  message: string;
  products: ApiCatalogueProduct[];
}

export interface UpdateProductRequest {
  product_title?: string;
  product_id?: string;
  sub_category?: string;
  regular_price?: string;
  sale_price?: string;
  stock_quantity?: number;
}
