import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { BackgroundEffects } from "../../Components/ui/BackgroundEffects";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-16">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-md bg-section rounded-3xl shadow-xl p-10 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-primary-500 dark:text-primary-300">Sign in to your premium account.</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-primary-700 dark:text-primary-200">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-transparent text-sm text-primary-900 dark:text-white placeholder:text-primary-400 dark:placeholder:text-primary-500 outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-primary-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-primary-700 dark:text-primary-200">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-secondary-500 hover:text-secondary-400 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary-300 dark:border-primary-700 bg-transparent text-sm text-primary-900 dark:text-white placeholder:text-primary-400 dark:placeholder:text-primary-500 outline-none focus:ring-2 focus:ring-secondary-400 dark:ring-primary-400 transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-200 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary-700 dark:hover:bg-primary-100 transition-colors mt-2 hover:cursor-pointer"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary-200 dark:border-primary-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-section text-primary-500 dark:text-primary-300">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <div className="flex gap-3">
          <button className="w-full flex items-center justify-center gap-2 border border-primary-200 dark:border-primary-700 text-primary-700 dark:text-white py-2.5 rounded-xl text-sm hover:bg-primary-50 dark:hover:bg-primary-800 transition-colors hover:cursor-pointer">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-primary-500 dark:text-primary-300">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-secondary-500 hover:text-secondary-400 hover:cursor-pointer hover:underline transition-colors">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}