/** @format */

// Order Status Types
export type OrderStatus = "placed" | "in_transit" | "delivered" | "cancelled";

// User Information
export interface OrderUser {
  full_name: string;
  email: string;
  phone: string;
  image: string;
}

// Product Image
export interface ProductImage {
  id: number;
  image: string;
  title: string | null;
}

// Product Information
export interface OrderProduct {
  id: number;
  product_title: string;
  item_description: string;
  primary_image: string;
  uploaded_images: ProductImage[];
  regular_price: string;
  sale_price: string;
  product_id: string;
  is_calculate: boolean;
}

// Order Item
export interface OrderItem {
  id: number;
  user: OrderUser;
  product: OrderProduct;
  quantity: number;
  delivery_fee: string;
  delivery_date: string | null;
  tax_fee: string;
  order_total: string;
  ship_method: string | null;
  status: OrderStatus;
  carrier: string | null;
  tracking_no: string | null;
  is_paid: boolean;
  paid_ammount: string;
  is_shiped: boolean;
  country_or_region: string;
  address_line_i: string;
  address_line_ii: string;
  suburb: string;
  city: string;
  postal_code: string;
  state: string;
  custormer_feedback: string | null;
  is_feedbacked: boolean;
  created_at: string;
}

// Pagination Meta
export interface OrderMeta {
  total_items: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  per_page: number;
}

// Orders Response Data
export interface OrdersData {
  success: boolean;
  message: string;
  orders: OrderItem[];
}

// Main Response
export interface OrdersResponse {
  success: boolean;
  message: string;
  meta: OrderMeta;
  data: OrdersData;
}

// Query Parameters
export interface OrdersQueryParams {
  page?: number;
  query?: "shipped" | "unshipped" | "cancelled" | "delivered";
  search?: string;
}

// Single Order Details Response
export interface OrderDetailsResponse {
  success: boolean;
  message: string;
  order_data: OrderItem;
}

// Update Order Request
export interface UpdateOrderRequest {
  quantity: number;
  ship_method: string;
  status: OrderStatus;
  carrier: string;
  tracking_no: string;
  delivery_fee: number;
  is_shiped: boolean;
}

// Update Order Response
export interface UpdateOrderResponse {
  success: boolean;
  message: string;
}

// Carrier Options
export type CarrierOption =
  | "Standard Ground"
  | "Expedited"
  | "Overnight"
  | "Two-Day Delivery"
  | "Free Shipping"
  | "Express";
