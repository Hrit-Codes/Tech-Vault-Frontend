import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { BackgroundEffects } from "./BackgroundEffects";

interface ServerErrorProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionTo?: string;
  onAction?: () => void;
  onRetry?: () => void;
  showReload?: boolean;
  fullScreen?: boolean;
}

export default function ServerError({
  title = "Oops! Something went wrong.",
  description = "We couldn't load the application data. This might be due to a network issue or our servers are temporarily down. Please try again.",
  actionLabel,
  actionTo,
  onAction,
  onRetry,
  showReload = true,
  fullScreen = true,
}: ServerErrorProps) {
  const wrapperClasses = fullScreen
    ? "relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6"
    : "relative w-full py-20 flex flex-col items-center justify-center bg-section-alternative px-6 rounded-2xl";

  return (
    <div className={wrapperClasses}>
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold mb-3 tracking-tight">{title}</h1>
        <p className="text-sm text-description leading-relaxed mb-8">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              Try Again
            </button>
          )}

          {actionTo && actionLabel && (
            <Link
              to={actionTo}
              className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              {actionLabel}
            </Link>
          )}

          {!actionTo && actionLabel && onAction && (
            <button
              onClick={onAction}
              className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              {actionLabel}
            </button>
          )}

          {showReload && (
            <button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-8 py-3 bg-white text-neutral-700 text-sm font-semibold rounded-xl border border-secondary-400/20 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
            >
              Reload Page
            </button>
          )}
        </div>
      </div>
    </div>
  );
}