import type { ApiResponse } from "../../Components/utils/types"
import urls from "../urls";
import api from "../client";

export interface RegisterRequest{
    fullName:string;
    email:string;
    phoneNumber:string;
    password:string;
}

export interface AuthUser{
    id:string;
    fullName:string;
    email:string;
    role:"USER";   
}

export interface VerifyOtpRequest extends RegisterRequest{
    otp:string;
}

export interface LoginRequest{
    email:string;
    password:string;
}

export interface InitiateRegistrationResponse{
    message:string;
}

export interface VerifyOtpResponse{
    user:AuthUser
    
}


export const register=(payload:RegisterRequest)=>{
    return api.post<ApiResponse<InitiateRegistrationResponse>>(urls.registerUser,payload).then((res)=>res.data);
}

export const verifyOtp=(payload:VerifyOtpRequest)=>{
    return api.post<ApiResponse<VerifyOtpResponse>>(urls.verifyUser,payload).then((res)=>res.data);
}