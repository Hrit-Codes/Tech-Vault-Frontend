import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

// ─── Types ─────────────────────────────────────────────────

export interface CartVariant {
  id: string;
  color: string | null;
  variant: string | null;
  priceOverride: number | null;
  stockOverride: number | null;
  isActive: boolean;
}

export interface CartProduct {
  id: string;
  name: string;
  slug: string;
  images: string[];
  price: number;
  salePrice: number | null;
  onSale: boolean;
  stock: number;
  isActive: boolean;
  categoryId: string;
  brandId: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  createdAt: string;
  product: CartProduct;
  variant: CartVariant | null;
  unitPrice: number;
  originalPrice: number;
  appliedOffer: { id: string; title: string } | null;
  onSale: boolean;
  lineTotal: number;
  availableStock: number;
  isAvailable: boolean;
}

export interface CartData {
  items: CartItem[];
  subtotal: number;
  totalItems: number;
}

type getCartResponse={
    data:CartData;
}


export const getCart = () =>
  api.get<ApiResponse<getCartResponse>>(urls.getCart).then((res) => res.data.data);

export const addToCartApi = (
  productId: string,
  variantId: string | null,
  quantity: number,
) =>
  api
    .post<ApiResponse<CartData>>(urls.addToCart, {
      productId,
      variantId,
      quantity,
    })
    .then((res) => res.data);

export const updateCartItemApi = (id: string, quantity: number) =>
  api
    .patch<ApiResponse<CartData>>(`${urls.updateCartItem}/${id}`, { quantity })
    .then((res) => res.data);

export const removeFromCartApi = (id: string) =>
  api.delete<ApiResponse<null>>(`${urls.removeFromCart}/${id}`).then((res) => res.data);

export const clearCartApi = () =>
  api.delete<ApiResponse<null>>(urls.clearCart).then((res) => res.data);