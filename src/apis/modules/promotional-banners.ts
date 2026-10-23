import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface IPromotionalBanner {
  id: string;
  title: string;
  imageUrl: string;
  imagePublicId: string;
  linkUrl: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

type GetPromotionalBannersResponse = {
  data: IPromotionalBanner[];
};

export const getPromotionalBanners = () => {
  return api
    .get<ApiResponse<GetPromotionalBannersResponse>>(urls.getPromotionalBanners)
    .then((res) => res.data);
};
