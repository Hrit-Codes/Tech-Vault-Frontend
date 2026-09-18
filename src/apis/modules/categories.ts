import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface ICategory{
  id:string;
  name:string;
  subtitle:string;
  image:string;
  slug:string;
  isActive:boolean;
  order:number;
  createdAt:string;
  updatedAt:string
}


export type GetCategoriesResponse = {
  data: ICategory[];
};

export const getCategories = () => {
  return api
    .get<ApiResponse<GetCategoriesResponse>>(urls.getCategories)
    .then((res) => res.data);
};
