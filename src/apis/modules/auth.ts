import type { ApiResponse } from "../../Components/utils/types"
import urls from "../urls";
import api from "../client";
import type { ForgotPasswordInput, ResetPasswordInput } from "../../Components/utils/schema";

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

export interface IUser extends AuthUser{
    phoneNumber:string;
    isVerified:boolean;
    avatar:string;
    createdAt:string;
}

export interface VerifyOtpRequest extends RegisterRequest{
    otp:string;
}

export interface LoginRequest{
    email:string;
    password:string;
}

type InitiateRegistrationResponse={
    message:string;
}

type VerifyOtpResponse={
    user:AuthUser
}

export interface ILoginFormValue{
  email:string;
  password:string;
}

type LoginUserResponse={
    user:AuthUser
}

type GetCurrentUserResponse={
    message:string;
    user: IUser

}

type ChangePasswordResponse={
    message:string;
}

type LogoutUserResponse={
    message:string
}


export const register=(payload:RegisterRequest)=>{
    return api.post<ApiResponse<InitiateRegistrationResponse>>(urls.registerUser,payload).then((res)=>res.data);
}

export const verifyOtp=(payload:VerifyOtpRequest)=>{
    return api.post<ApiResponse<VerifyOtpResponse>>(urls.verifyUser,payload).then((res)=>res.data);
}

export const loginUser=(data:ILoginFormValue)=>{
    return api.post<ApiResponse<LoginUserResponse>>(urls.loginUser,data).then((res)=>res.data);
}

export const getCurrentUser=()=>{
    return api.get<ApiResponse<GetCurrentUserResponse>>(urls.getCurrentUser).then((res)=>res.data);
}

export const changePassword=(data:{currentPassword:string, newPassword:string})=>{
    console.log("Change password data::",data);
    return api.post<ApiResponse<ChangePasswordResponse>>(urls.changePassword,data).then((res)=>res.data);
}

export const logoutUser=()=>{
    return api.post<ApiResponse<LogoutUserResponse>>(urls.logoutUser).then((res)=>res.data);
}

export const forgotPassword=(data:ForgotPasswordInput)=>{
    return api.post<ApiResponse<null>>(urls.forgotPassword,data).then((res)=>res.data);
}

export const resetPassword=(data:ResetPasswordInput)=>{
    return api.post<ApiResponse<null>>(urls.resetPassword,data).then((res)=>res.data);
}

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);   

  const res = await api.patch("/users/me/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};