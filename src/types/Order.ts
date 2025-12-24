// src/types/Order.ts
export interface Order {
  _id: string;
  orderId: string;
  productId?: string;
  productName: string;
  price: number;
  quantity: number;
  totalPrice: number;
  category: string;
  paymentMethod: string;
  address: string;
  phone: string;
  createdAt: string;
}
