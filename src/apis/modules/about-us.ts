import type { ApiResponse } from "../../Components/utils/types";
import api from "../client";
import urls from "../urls";

export interface IAboutUsStory{
    id:string,
    eyebrow:string,
    heading:string,
    paragraph:string,
    tagline:string,
    image:string|null,
}

export interface IAboutUsPromise{
    id:string,
    title:string,
    description:string,
    icon:string,
    order:number,
    createdAt:string,
    updatedAt:string
}

export interface IAboutUsFAQ{
    id:string,
    question:string,
    answer:string,
    order:number,
    createdAt:string,
    updatedAt:string
}

type getAboutUsPageResponse={
    data:{
        story:IAboutUsStory | null,
        promises:IAboutUsPromise[],
        faqs:IAboutUsFAQ[]
    }
}

export const getAboutUsPage=()=>{
    return api.get<ApiResponse<getAboutUsPageResponse>>(urls.getAboutUsPage).then((res)=>res.data);
}
