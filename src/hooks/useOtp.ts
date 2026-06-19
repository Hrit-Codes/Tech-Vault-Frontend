import React, { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props{
    email:string;
}

export const useOtp=({email}:Props)=>{
    const [otp,setOtp]=useState(["","","","","",""]);
    const [resendTimer, setResendTimer]=useState(60);
    const otpRefs=useRef<(HTMLInputElement| null)[]>([]);
    console.log(email)

    // const navigate=useNavigate();

    const handleOtpChange=(index:number,value:string)=>{
        if(value.length>1)return;
        const updated=[...otp];
        updated[index]=value;
        setOtp(updated);
        if(value && index<5) otpRefs.current[index+1]?.focus();
    }

    const handleKeyDown=(index:number,e:React.KeyboardEvent)=>{
        if(e.key==="Backspace" && !otp[index] && index>0){
            otpRefs.current[index-1]?.focus();
        }
    }

    // const otpMutation

    const handleOtpVerification=()=>{
        if(otp.join("").length!==6) return toast.error("Enter complete OTP");
        // otpMutation.mutate();
    }

    const handleResendOtp=()=>{
        if(resendTimer>0) return;
        setOtp(["","","","","",""]);
        setResendTimer(60);
        toast.success("OTP resent");
    }

    useEffect(()=>{
        if(resendTimer<=0) return;

        const interval=setInterval(()=>{
            setResendTimer((prev)=>{
                if(prev<=1) clearInterval(interval);
                return prev-1;
            })
        },1000)

        return()=>clearInterval(interval);
    },[])

    return{
        otp,
        resendTimer,
        otpRefs,
        handleOtpChange,
        handleKeyDown,
        handleOtpVerification,
        handleResendOtp,
    }

}