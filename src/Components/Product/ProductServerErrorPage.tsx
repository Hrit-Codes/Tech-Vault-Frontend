import { AlertTriangle, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ProductServerErrorPageProps = {
  onRetry: () => void;
};

export default function ProductServerErrorPage({ onRetry }: ProductServerErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6">
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-sm text-description leading-relaxed mb-8">
          We ran into a problem loading this product. This is usually
          temporary — a quick retry often fixes it.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto px-8 py-3 bg-white text-neutral-700 text-sm font-semibold rounded-xl border border-secondary-400/20 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}