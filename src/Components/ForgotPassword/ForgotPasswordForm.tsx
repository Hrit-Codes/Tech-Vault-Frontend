import { useMutation } from "@tanstack/react-query";
import { BackgroundEffects } from "../ui/BackgroundEffects";
import { forgotPasswordSchema, type ForgotPasswordInput } from "../utils/schema";
import { forgotPassword } from "../../apis/modules/auth";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

type ForgotPasswordFormProps = {
  onEmailSent: (email: string) => void;
};

export default function ForgotPasswordForm({ onEmailSent }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordInput) => forgotPassword(data),
    onSuccess: (_data, variables) => {
      toast.success("If that email exists, an OTP has been sent.");
      onEmailSent(variables.email);
      reset();
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setError("root", { message });
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="heading-page">Find Your Account</h2>
          <h3 className="text-sm text-description font-semibold">
            Enter your email and we'll send you a reset code.
          </h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-bold">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="name@gmail.com"
              className="px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Server-level error */}
          {errors.root && (
            <p className="text-xs text-red-500 text-center font-semibold">
              {errors.root.message}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={forgotPasswordMutation.isPending}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors mt-2 hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {forgotPasswordMutation.isPending ? "Sending OTP..." : "Send Reset Code"}
          </button>
        </form>

        {/* Footer */}
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
  );
}