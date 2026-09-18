import type { ApiResponse, IPagination } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface IAppliedOffer {
  id: string;
  title: string;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice: number | null;
  onSale: boolean;
  images: string[];
  badge: string | null;
  freeShipping: boolean;
  rating: number;
  reviewCount: number;
  categoryId: string;
  brandId: string;
  createdAt: string; 
  stock: number;
  variants?: {
    isActive: boolean;
    stockOverride: number | null;
    priceOverride: number | null;
  }[];
  minPrice: number;
  maxPrice: number;
  hasPriceRange: boolean;
  isNew: boolean;
  appliedOffer: IAppliedOffer | null;
}

type GetNewProductsResponse={
    message:string,
    data:IProduct[],
    pagination:IPagination
}

export const getNewProducts=(page=1,limit=12)=>{
    return api.get<ApiResponse<GetNewProductsResponse>>(urls.getNewProducts,{
        params:{page,limit}
    }).then((res)=>res.data);
}