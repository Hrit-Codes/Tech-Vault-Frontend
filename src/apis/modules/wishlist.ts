import type { ApiResponse, IPagination } from "../../Components/utils/types";
import api from "../client"
import urls from "../urls"

type addProductToWishlistResponse={
    data:null;
}

interface WishlistProductItem{
    id:string;
    name:string;
    slug:string;
    price:number;
    salePrice:number|null;
    onSale:boolean;
    images:string[],
    badge:string|null;
    freeShipping:boolean;
    rating:number;
    reviewCount:number;
    createdAt:string;
    stock:number;
    categpryId:string;
    brandId:string;
    variants:{
        isActive:boolean;
        priceOverride:number|null;
        stockOverride:number|null;
    }[],
    minPrice:number;
    maxPrice:number;
    hasPriceRange:boolean;
    isNew:boolean;
    appliedOffer:{
        id:string;
        title:string;
    } | null;
}

export interface WishlistItem{
    id:string;
    createdAt:string;
    product:WishlistProductItem,
}

type GetWishlistResponse={
    data:WishlistItem[],
    pagination:IPagination,
}

type GetWishlistIdsResponse={
    data:string[],
}

export const getWishlist=(page=1, limit=12)=>{
    return api.get<ApiResponse<GetWishlistResponse>>(urls.getWishlist,{
        params:{
            page,
            limit
        }
    }).then((res)=>res.data);
}

export const getWishlistIds=()=>{
    return api.get<ApiResponse<GetWishlistIdsResponse>>(urls.getWishlistIds).then((res)=>res.data.data.data);
}

export const addProductToWishlist=(productId:string)=>{
    return api.post<ApiResponse<addProductToWishlistResponse>>(`${urls.addProductToWishlist}/${productId}`).then((res)=>res.data);
}

export const removeProductFromWishlist=(productId:string)=>{
    return api.delete(`${urls.deleteWishlist}/${productId}`).then((res)=>res.data);
}

export const clearWishlist=()=>{
    return api.delete(urls.clearWishlist).then((res)=>res.data);
}