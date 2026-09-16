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