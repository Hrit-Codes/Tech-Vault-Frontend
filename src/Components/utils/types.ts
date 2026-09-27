export interface ApiResponse<T>{
  success:boolean;
  message:string;
  data:T
}

export type TextAlignmentEnum = "LEFT" | "CENTER" | "RIGHT";

type OfferType = "PERCENTAGE" | "FIXED";

export interface IOffer {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  offerType: OfferType;
  offerValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products?: any[];
  brands?: any[];
  categories?: any[];
}

export interface IPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IProductVariant {
  id: string;
  productId: string;
  color: string | null;
  variant: string | null;
  priceOverride: number | null;
  stockOverride: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  price:number|null;
  salePrice:number|null;
}

export type StockFilterValue = "all" | "low-stock" | "out-of-stock";
export type SortFilterValue="newest"|"price_asc"|"price_desc"|"rating_asc"|"rating_desc";
