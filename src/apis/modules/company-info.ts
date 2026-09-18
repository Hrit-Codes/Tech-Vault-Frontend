import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface ICompanyInfoResponse{
    info:{
        id:string;
        companyName:string;
        officeAddress:string;
        officeTelephone:string;
        emails:string[];
        phones:string[];
        description:string;
        logo:string;
        socialLinks:{
            facebook?:string;
            linkedin?:string;
            instagram?:string;
            twitter?:string;
            youtube?:string;
            tiktok?:string;
        },
        mapLatitude:number;
        mapLongitude:number;
        mapEmbedUrl:string;
    }
}

export const getCompanyInfo=()=>{
    return api.get<ApiResponse<ICompanyInfoResponse>>(urls.getCompanyInfo).then((res)=>res.data);
}