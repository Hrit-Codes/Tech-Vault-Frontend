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
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white">Welcome Back</h1>
          <p className="text-sm text-primary-400 dark:text-primary-300">Sign in to your premium account.</p>
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
              className="px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent text-sm text-primary-900 dark:text-white placeholder:text-primary-300 dark:placeholder:text-primary-500 outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-primary-400 transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-semibold text-primary-700 dark:text-primary-200">
                Password
              </label>
              <Link to="/forgot-password" className="text-sm font-medium text-secondary-500 hover:text-secondary-600 transition-colors">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary-200 dark:border-primary-700 bg-transparent text-sm text-primary-900 dark:text-white placeholder:text-primary-300 dark:placeholder:text-primary-500 outline-none focus:ring-2 focus:ring-secondary-400 dark:ring-primary-400 transition pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:hover:text-primary-200 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-900 dark:bg-white text-white dark:text-primary-900 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary-700 dark:hover:bg-primary-100 transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-primary-700" />

        {/* Footer */}
        <p className="text-center text-sm text-primary-500 dark:text-primary-300">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-secondary-500 hover:text-secondary-600 hover:cursor-pointer transition-colors">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}