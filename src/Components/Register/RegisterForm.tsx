import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { registerSchema, type RegisterInput } from "../utils/schema";
import {
  register as registerApi,
  type RegisterRequest,
} from "../../apis/modules/auth";

type RegisterFormProps = {
  onOtpSent: (payload: RegisterRequest) => void;
};

export default function RegisterForm({ onOtpSent }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterRequest) => registerApi(payload),
    onSuccess: (_data, variables) => {
      onOtpSent(variables);
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setError("root", { message });
    },
  });

  const onSubmit = (data: RegisterInput) => {
    const { confirmPassword, agreeToTerms, ...payload } = data;
    registerMutation.mutate(payload);
  };

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="heading-page">Create Account</h1>
        <h3 className="text-sm text-description font-semibold">
          Sign up for your premium account.
        </h3>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-5"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="fullName" className="text-sm font-bold">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Hrit Amatya"
            {...registerField("fullName")}
            className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-bold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            {...registerField("email")}
            className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="text-sm font-bold">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="98XXXXXXXX"
            {...registerField("phoneNumber")}
            className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
          {errors.phoneNumber && (
            <p className="text-xs text-red-500">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-bold">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...registerField("password")}
              className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-primary-500 transition-colors hover:cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-bold">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              {...registerField("confirmPassword")}
              className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all pr-11"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-primary-500 transition-colors hover:cursor-pointer"
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2 text-xs text-description font-semibold">
            <input
              type="checkbox"
              {...registerField("agreeToTerms")}
              className="mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-primary-500 underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-primary-500 underline">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-xs text-red-500">
              {errors.agreeToTerms.message}
            </p>
          )}
        </div>

        {/* Server-level error */}
        {errors.root && (
          <p className="text-xs text-red-500 text-center">
            {errors.root.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? "Sending code…" : "Register Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-secondary-400/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider font-bold">
          <span className="px-3 bg-section text-description">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
          }}
          className="w-full flex items-center justify-center gap-2 border border-secondary-400/10 text-description bg-section-alternative py-3 rounded-xl text-sm font-bold hover:bg-secondary-500/5 transition-colors hover:cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-sm font-semibold text-description my-2">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-bold text-secondary-500 hover:underline transition-colors hover:cursor-pointer"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}