import type { ApiResponse, IOffer, TextAlignmentEnum } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface IHeroSection {
  id: string;
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  linkedOfferId?: string | null;
  linkedOffer?: IOffer; 
  mediaUrl: string;
  mediaPublicId: string;
  textAlignment: TextAlignmentEnum;
  overlayColor?: string;
  overlayOpacity: number; 
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

type GetHeroSectionsResponse = {
  data: IHeroSection[];
};

export const getHeroSections=()=>{
    return api.get<ApiResponse<GetHeroSectionsResponse>>(urls.getHeroSections).then((res)=>res.data);
}