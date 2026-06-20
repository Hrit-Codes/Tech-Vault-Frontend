import { useOtp } from "../../hooks/useOtp";

type OtpFormProps={
    email:string
    setOtpVerification:(value:boolean)=>void;
}

export default function OtpForm({email, setOtpVerification}:OtpFormProps) {
    const {otp, resendTimer,otpRefs,handleOtpChange,handleKeyDown,handleResendOtp}=useOtp({email});

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">Verify Your Email</h1>
                <h3 className="text-sm text-gray-700 dark:text-gray-400">
                    Enter the 6-digit code sent to your email address
                </h3>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-6 mt-6">

                {/* OTP Input Boxes */}
                <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { otpRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index,e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index,e)}
                            className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-primary-300 dark:border-primary-700 bg-transparent text-primary-900 dark:text-white outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-primary-400 transition"
                        />
                    ))}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary-700 dark:hover:bg-primary-100 transition-colors mt-2 hover:cursor-pointer"
                >
                    Verify Code
                </button>
            </form>

            {/* Resend */}
            <p className="text-center text-sm  mt-6">
                Didn't receive the code?{" "}
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="font-semibold text-secondary-500 hover:text-secondary-400 transition-colors hover:underline hover:cursor-pointer disabled:text-primary-400 disabled:no-underline disabled:cursor-not-allowed"
                >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                </button>
            </p>

            {/* Footer */}
            <p className="text-center text-sm mt-3">
                Wrong email?{" "}
                <span onClick={()=>setOtpVerification(false)} className="font-semibold text-secondary-500 hover:text-secondary-400 transition-colors hover:underline hover:cursor-pointer">
                    Go Back
                </span>
            </p>
        </div>
    );
}