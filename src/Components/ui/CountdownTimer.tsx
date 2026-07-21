import { useCountdown } from "../../hooks/useCountdown"

type CountdownTimerProps={
    targetDate:string| Date | number,
    label?:string
}
export default function CountdownTimer({targetDate, label="Expires In:"}:CountdownTimerProps){
    const {days, hours, minutes, seconds, isExpired}=useCountdown(targetDate);

    if (isExpired) {
        return (
        <div className="flex items-center gap-2 text-sm font-semibold text-red-500">
            <span>Offer Expired</span>
        </div>
        );
    }

  return (
    <div className="flex items-center gap-3 font-sans">
      {/* Label */}
      <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {label}
      </span>

      {/* Time Badges */}
      <div className="flex items-center gap-2 font-medium text-white text-sm sm:text-base">
        {/* Days */}
        <span className="px-3 py-1.5 rounded-lg bg-secondary-900 shadow-sm flex items-center justify-center">
          {days} d
        </span>

        {/* Hours */}
        <span className="px-3 py-1.5 rounded-lg bg-secondary-900 shadow-sm flex items-center justify-center">
          {hours} h
        </span>

        {/* Minutes */}
        <span className="px-3 py-1.5 rounded-lg bg-secondary-900 shadow-sm flex items-center justify-center">
          {minutes} m
        </span>

        {/* Seconds */}
        <span className="px-3 py-1.5 rounded-lg bg-secondary-900 shadow-sm flex items-center justify-center">
          {seconds} s
        </span>
      </div>
    </div>
  )
}