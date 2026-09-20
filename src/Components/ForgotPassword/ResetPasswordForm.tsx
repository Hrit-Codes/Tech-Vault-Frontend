import { useMutation } from "@tanstack/react-query";
import { BackgroundEffects } from "../ui/BackgroundEffects";
import { resetPasswordSchema, type ResetPasswordInput } from "../utils/schema";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { resetPassword } from "../../apis/modules/auth";

type ResetPasswordFormProps = {
  userEmail: string;
  onGoBack: () => void;
};

export default function ResetPasswordForm({
  userEmail,
  onGoBack,
}: ResetPasswordFormProps) {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setError,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: userEmail, otp: "", newPassword: "" },
  });
  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordInput) => resetPassword(data),
    onSuccess: () => {
      toast.success("Password reset successfully! Please log in.");
      navigate("/login", { replace: true });
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        "Invalid or expired OTP. Please try again.";
      setError("root", { message });
      reset({ email: userEmail, otp: "", newPassword: "" });
      setOtp(Array(6).fill(""));
      otpRefs.current[0]?.focus();
    },
  });

  const onSubmit = (data: ResetPasswordInput) => {
    resetPasswordMutation.mutate(data);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setValue("otp", newOtp.join(""), { shouldValidate: true });

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    setValue("otp", otp.join(""));
  }, [otp, setValue]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="heading-page">Reset Password</h2>
          <h3 className="text-sm text-description font-semibold">
            Enter the 6-digit code sent to <strong>{userEmail}</strong>
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* OTP Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Verification Code</label>
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
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-bold rounded-xl border border-secondary-400/10 bg-transparent outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-xs text-red-500">{errors.otp.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-sm font-bold">
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                {...register("newPassword")}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all pr-11"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-primary-500 transition-colors hover:cursor-pointer"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Server-level error */}
          {errors.root && (
            <p className="text-xs text-red-500 text-center font-semibold">
              {errors.root.message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={resetPasswordMutation.isPending || otp.some((d) => !d)}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {resetPasswordMutation.isPending
              ? "Resetting Password..."
              : "Reset Password"}
          </button>
        </form>

        {/* Footer */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={onGoBack}
            className="flex items-center gap-1 text-sm font-bold text-secondary-500 hover:text-secondary-600 transition-colors hover:cursor-pointer"
          >
            <ArrowLeft size={14} />
            Change Email
          </button>

          <p className="text-center text-sm font-semibold text-description">
            Remembered it?{" "}
            <Link
              to="/login"
              className="font-bold text-secondary-500 hover:underline transition-colors hover:cursor-pointer"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}