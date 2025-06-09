/** @format */

// src/entities/order/model/types.ts

import type { Product } from "@/entities/product/model/types";

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  colors?: string[];
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: "pending" | "paid" | "cancelled";
  createdAt: string;
  colors?: string[];
}
