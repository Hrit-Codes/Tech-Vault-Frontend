import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

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

type GetOffersResponse = {
  data: IOffer[];
};

export const getOffers = (params?: any) => {
  return api
    .get<ApiResponse<GetOffersResponse>>(urls.getOffers, { params })
    .then((res) => res.data);
};