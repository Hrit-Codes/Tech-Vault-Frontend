import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useOtp } from "../../hooks/useOtp";
import {
  verifyOtp,
  type RegisterRequest,
} from "../../apis/modules/auth";
import { toast } from "sonner";

type OtpFormProps = {
  pendingRegistration: RegisterRequest;
  onGoBack: () => void;
};

export default function OtpForm({
  pendingRegistration,
  onGoBack,
}: OtpFormProps) {
  const navigate = useNavigate();

  const {
    otp,
    resendTimer,
    otpRefs,
    handleOtpChange,
    handleKeyDown,
    handleResendOtp,
  } = useOtp({ email: pendingRegistration.email });

  const verifyMutation = useMutation({
    mutationFn: (otpCode: string) =>
      verifyOtp({ ...pendingRegistration, otp: otpCode }),
    onSuccess: () => {
      toast.success("Account verified. Welcome to TechVault!");
      navigate("/", { replace: true });
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        "Invalid or expired code. Please try again.";
      otp.forEach((_, i) => handleOtpChange(i, ""));
      toast.error(message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 6) return;
    verifyMutation.mutate(code);
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="heading-page">Verify Your Email</h1>
        <h3 className="text-sm text-description font-semibold">
          Enter the 6-digit code sent to{" "}
          <strong>{pendingRegistration.email}</strong>
        </h3>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-6 mt-6" onSubmit={handleSubmit}>
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                otpRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 text-center text-xl font-bold rounded-xl border border-secondary-400/10 bg-transparent outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={verifyMutation.isPending || otp.some((d) => !d)}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {verifyMutation.isPending ? "Verifying…" : "Verify Code"}
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

      {/* Go back */}
      <p className="text-center text-sm font-semibold text-description mt-3">
        Wrong email?{" "}
        <span
          onClick={onGoBack}
          className="font-bold text-secondary-500 hover:text-secondary-600 transition-colors hover:underline hover:cursor-pointer"
        >
          Go Back
        </span>
      </p>
    </div>
  );
}