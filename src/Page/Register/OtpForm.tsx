import { useOtp } from "../../hooks/useOtp";

type OtpFormProps = {
  email: string;
  setOtpVerification: (value: boolean) => void;
};

export default function OtpForm({ email, setOtpVerification }: OtpFormProps) {
  const { otp, resendTimer, otpRefs, handleOtpChange, handleKeyDown, handleResendOtp } = useOtp({ email });

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Verify Your Email</h1>
        <h3 className="text-sm text-description font-semibold">
          Enter the 6-digit code sent to your email address
        </h3>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-6 mt-6" onSubmit={(e) => e.preventDefault()}>

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
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-secondary-400/10 bg-transparent text-section-contrast outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 hover:cursor-pointer"
        >
          Verify Code
        </button>
      </form>

      {/* Resend */}
      <p className="text-center text-sm font-semibold text-description mt-6">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendTimer > 0}
          className="font-bold text-secondary-500 hover:text-secondary-600 transition-colors hover:underline hover:cursor-pointer disabled:text-description/40 disabled:no-underline disabled:cursor-not-allowed"
        >
          {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
        </button>
      </p>

      {/* Footer */}
      <p className="text-center text-sm font-semibold text-description mt-3">
        Wrong email?{" "}
        <span 
          onClick={() => setOtpVerification(false)} 
          className="font-bold text-secondary-500 hover:text-secondary-600 transition-colors hover:underline hover:cursor-pointer"
        >
          Go Back
        </span>
      </p>
    </div>
  );
}