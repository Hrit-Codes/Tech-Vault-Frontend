import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertTriangle, Mail, Phone, Calendar, ShieldCheck, KeyRound, EyeOff, Eye } from "lucide-react";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";
import { changePassword, getCurrentUser } from "../../apis/modules/auth";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, type ChangePasswordInput } from "../../Components/utils/schema";

export default function UserProfilePage() {
  const [isPasswordChangeActive, setIsPasswordChangeActive] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    data: userResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getCurrentUser(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const user = userResponse?.data?.user ?? null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError, 
  } = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: {currentPassword:string, newPassword:string}) => changePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully! Please log in again on other devices.");
      setIsPasswordChangeActive(false);
      reset();
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setError("root", { message });
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    const {confirmNewPassword, ...payload}=data;
    changePasswordMutation.mutate(payload);
  };

  if (isError) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6">
        <BackgroundEffects />
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
            Oops! Something went wrong.
          </h1>
          <p className="text-sm text-description leading-relaxed mb-8">
            We couldn't load your profile. This might be due to a network
            issue or our servers being temporarily down. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => refetch()}
              className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Try Again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-8 py-3 bg-white text-neutral-700 text-sm font-semibold rounded-xl border border-secondary-400/20 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl border border-secondary-400/5 shadow-xl p-10 flex flex-col gap-8">
        {isLoading ? (
          <div className="flex flex-col gap-6 animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-primary-400/10" />
              <div className="h-5 w-40 bg-primary-400/10 rounded" />
              <div className="h-3 w-28 bg-primary-400/10 rounded" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-12 w-full bg-primary-400/10 rounded-xl" />
              <div className="h-12 w-full bg-primary-400/10 rounded-xl" />
              <div className="h-12 w-full bg-primary-400/10 rounded-xl" />
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full bg-primary-500/10 border border-primary-400/20 flex items-center justify-center text-2xl font-bold text-primary-500">
                {user?.avatar ? user.avatar : user?.fullName?.charAt(0).toUpperCase() ?? "?"}
              </div>
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-xl font-bold">
                  {user?.fullName ?? "Your Account"}
                </h1>
                {user?.isVerified && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                    <ShieldCheck size={14} />
                    Verified Account
                  </span>
                )}
              </div>
            </div>

            {/* Account details */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary-400/10 bg-section-alternative">
                <Mail size={18} className="text-primary-500 shrink-0" strokeWidth={2.5} />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-description">
                    Email
                  </span>
                  <span className="text-sm font-semibold ">
                    {user?.email ?? "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary-400/10 bg-section-alternative">
                <Phone size={18} className="text-primary-500 shrink-0" strokeWidth={2.5} />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-description">
                    Phone Number
                  </span>
                  <span className="text-sm font-semibold ">
                    {user?.phoneNumber ?? "—"}
                  </span>
                </div>
              </div>

              {user?.createdAt && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-secondary-400/10 bg-section-alternative">
                  <Calendar size={18} className="text-primary-500 shrink-0" strokeWidth={2.5} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-description">
                      Member Since
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Reset password */}
            <div className="flex flex-col gap-2 pt-2 border-t border-secondary-400/10">
              <p className="text-xs text-description font-semibold pt-4">
                Want to change your password? We'll email you a reset link.
              </p>
              <button
                type="button"
                onClick={() => setIsPasswordChangeActive((prev) => !prev)}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-colors hover:cursor-pointer ${
                  isPasswordChangeActive
                    ? "bg-neutral-200 text-neutral-700 hover:bg-neutral-300"
                    : "bg-primary-500 hover:bg-primary-600 text-white"
                }`}
              >
                <KeyRound size={16} />
                {isPasswordChangeActive ? "Cancel" : "Change Password"}
              </button>
            </div>

            {/* Password Form */}
            {isPasswordChangeActive && (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                
                {/* Current Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="currentPassword" className="text-sm font-bold">
                      Current Password
                    </label>
                    <Link to="/forgot-password" className="text-sm font-bold text-secondary-500 hover:text-secondary-600 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...register("currentPassword")}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-primary-500 transition-colors hover:cursor-pointer"
                    >
                      {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="text-xs text-red-500">{errors.currentPassword.message}</p>
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
                    <p className="text-xs text-red-500">{errors.newPassword.message}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmNewPassword" className="text-sm font-bold">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmNewPassword"
                    type={showNewPassword ? "text" : "password"}
                    {...register("confirmNewPassword")}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-xs text-red-500">{errors.confirmNewPassword.message}</p>
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
                  disabled={changePasswordMutation.isPending}
                  className="w-full mt-2 flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold text-sm transition-colors hover:cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {changePasswordMutation.isPending ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}