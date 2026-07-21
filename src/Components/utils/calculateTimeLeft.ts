export interface TimeLeft{
    days:number,
    hours:number,
    minutes:number,
    seconds:number,
    isExpired:boolean
}

export function calculateTimeLeft(targetDate:string | Date | number):TimeLeft{
    const targetTime= new Date(targetDate).getTime();
    const currentTime= new Date().getTime();
    const difference=targetTime-currentTime;

    if(difference<=0){
        return { days:0, hours:0, minutes:0, seconds:0, isExpired:true}
    }

    return{
        days:Math.floor(difference/(1000*60*60*24)),
        hours:Math.floor((difference/(1000*60*60))%24),
        minutes:Math.floor((difference/1000/60)%60),
        seconds:Math.floor((difference/1000)%60),
        isExpired:false,
    };
}