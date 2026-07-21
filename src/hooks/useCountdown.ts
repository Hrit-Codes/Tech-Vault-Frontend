import { useEffect, useState } from "react";
import { calculateTimeLeft, type TimeLeft } from "../Components/utils/calculateTimeLeft";

export function useCountdown(targetDate:string|Date|number):TimeLeft{
    const [timeLeft, setTimeLeft]=useState<TimeLeft>(()=>calculateTimeLeft(targetDate));

    useEffect(()=>{
        setTimeLeft(calculateTimeLeft(targetDate));

        const timer=setInterval(()=>{
            const updated=calculateTimeLeft(targetDate);
            setTimeLeft(updated);

            if(updated.isExpired){
                clearInterval(timer);
            }
        },1000);

        return ()=> clearInterval(timer);
    },[targetDate])

    return timeLeft;
}