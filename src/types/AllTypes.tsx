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
