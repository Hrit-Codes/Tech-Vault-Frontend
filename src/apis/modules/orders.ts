import type { ApiResponse, IPagination } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

// ─── Types ─────────────────────────────────────────────────

export type IOrderPaymentMethod = "COD" | "KHALTI";

export type IOrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type IOrderPaymentStatus = "UNPAID" | "PAID" | "FAILED" | "REFUNDED";

export interface IShippingAddress {
  fullName: string;
  phoneNumber: string;
  city: string;
  street: string;
}

export interface IOrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage?: string | null;
  variantId: string | null;
  variantName: string | null;
  price: number;
  quantity: number;
}

export interface IOrderPayment {
  id: string;
  orderId: string;
  provider: IOrderPaymentMethod;
  status: IOrderPaymentStatus;
  transactionId: string | null;
  gatewayPayload: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  id: string;
  userId: string;
  totalAmount: number;
  status: IOrderStatus;
  paymentStatus: IOrderPaymentStatus;
  paymentMethod: IOrderPaymentMethod;
  shippingAddress: IShippingAddress;
  createdAt: string;
  updatedAt: string;
  items?: IOrderItem[];
  payment: IOrderPayment | null;
  user?: {
    fullName: string;
    email: string;
    phoneNumber: string | null;
  };
}

export interface ICreateOrderRequest {
  shippingAddress: IShippingAddress;
  paymentMethod: IOrderPaymentMethod;
}

export interface IOrderResponse {
  data: IOrder;
}

export interface IMyOrdersResponse {
  data: IOrder[];
  pagination: IPagination;
}

// ─── APIs ──────────────────────────────────────────────────

export const createOrder = (payload: ICreateOrderRequest) =>
  api
    .post<ApiResponse<IOrderResponse>>(urls.createOrder, payload)
    .then((res) => res.data.data.data);

export const getMyOrders = (page = 1, limit = 10) =>
  api
    .get<ApiResponse<IMyOrdersResponse>>(urls.getMyOrders, {
      params: { page, limit },
    })
    .then((res) => res.data.data);

export const getUserOrderById = (orderId: string) =>
  api
    .get<ApiResponse<IOrderResponse>>(`${urls.getOrderById}/${orderId}`)
    .then((res) => res.data.data.data);

export const deleteAbandonedOrder = (orderId: string) =>
  api
    .delete<ApiResponse<null>>(`${urls.getOrderById}/${orderId}/abandon`)
    .then((res) => res.data);
