import type { ApiResponse, IPagination, IProductVariant, SortFilterValue, StockFilterValue } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type AppliedOffer = { id: string; title: string };

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

export interface IProductListItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  price: number;
  stock: number;
  salePrice: number | null;
  onSale: boolean;
  categoryId: string;
  brandId: string;
  category: Category;
  brand: Brand;
  isActive: boolean;
  variants: IProductVariant[];
  createdAt: string;
  updatedAt: string;
  appliedOffer?: AppliedOffer;
  minPrice:number,
  maxPrice:number,
  hasPriceRange:boolean,
  isNew:boolean,
}

type GetNewProductsResponse={
    message:string,
    data:IProduct[],
    pagination:IPagination
}

type GetProductsResponse={
  data:IProductListItem[];
  pagination:IPagination;
}

export const getNewProducts=(page=1,limit=12)=>{
    return api.get<ApiResponse<GetNewProductsResponse>>(urls.getNewProducts,{
        params:{page,limit}
    }).then((res)=>res.data);
}

export const getProducts = (params?: {
  page: number;
  limit: number;
  search?: string;
  brandId?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  stockStatus?: StockFilterValue;
  isActive?: boolean;
  onSale?: boolean;
  sortBy?: SortFilterValue;
}) => {
  return api
    .get<ApiResponse<GetProductsResponse>>(urls.getProducts, { params })
    .then((res) => res.data);
};