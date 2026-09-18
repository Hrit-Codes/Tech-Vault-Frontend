import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface IBrand{
  id:string;
  name:string;
  logo:string|null;
  slug:string;
  isActive:boolean;
  createdAt:string;
  updatedAt:string;
}

type GetBrandsResponse = {
  data: IBrand[];
};

export const getBrands = () => {
  return api
    .get<ApiResponse<GetBrandsResponse>>(urls.getBrands)
    .then((res) => res.data);
};