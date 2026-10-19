import type { ApiResponse } from "../../Components/utils/types";
import type { SubscribeInput } from "../../Components/utils/schema";
import api from "../client";
import urls from "../urls";

type SubscriberData={
    email:string;
    isSubscribed:boolean;
    subscribedAt?:string;
}

type SubscriptionStatusData=SubscriberData & {
    isActive:boolean;
    unsubscribedAt:string | null;
}

type CheckSubscriptionStatusResponse={
    data:SubscriptionStatusData
}

type SubscribeToNewsletterResponse={
    data:SubscriberData;
}

type UnsubscribeFromNewsletterResponse={
    data:{
        email:string;
        isSubscribed:boolean;
    }
}

export const subscribeToNewsletter=(payload:SubscribeInput)=>{
    return api.post<ApiResponse<SubscribeToNewsletterResponse>>(urls.subscribeToNewsletter,payload).then((res)=>res.data);
}

export const checkSubscriptionStatus=(payload:SubscribeInput)=>{
    return api.post<ApiResponse<CheckSubscriptionStatusResponse>>(urls.checkSubscriptionStatus,payload).then((res)=>res.data);
}

export const unsubscribeFromNewsletter=(payload:SubscribeInput)=>{
    return api.post<ApiResponse<UnsubscribeFromNewsletterResponse>>(urls.unsubscribeFromNewsletter,payload).then((res)=>res.data);
}

export const unsubscribeByToken=(token:string)=>{
    return api.get<ApiResponse<UnsubscribeFromNewsletterResponse>>(`${urls.unsubscribeFromNewsletter}/${token}`).then((res)=>res.data);
}
