import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProductNotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-section-alternative px-6 overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg mx-auto">

        {/* Illustration */}
        <div className="relative w-full max-w-md mb-2">
          {/* The glow */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center -z-10"
          >
            <div className="w-64 h-64 rounded-full bg-primary-400/30 blur-3xl" />
          </div>

          <svg
            viewBox="0 0 400 320"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* soft background blob */}
            <ellipse cx="200" cy="170" rx="150" ry="120" className="fill-primary-100" />

            {/* browser window */}
            <g>
              <rect
                x="70"
                y="40"
                width="220"
                height="180"
                rx="10"
                className="fill-white stroke-secondary-200"
                strokeWidth="2"
              />
              {/* title bar */}
              <path
                d="M70 50 a10 10 0 0 1 10 -10 h200 a10 10 0 0 1 10 10 v22 h-220 z"
                className="fill-primary-500"
              />
              <circle cx="86" cy="61" r="4" className="fill-red-300" />
              <circle cx="100" cy="61" r="4" className="fill-secondary-300" />
              <circle cx="114" cy="61" r="4" className="fill-emerald-200" />

              {/* box icon */}
              <g transform="translate(150,95)">
                <path d="M0 22 L30 10 L60 22 L30 34 Z" className="fill-primary-200" />
                <path d="M0 22 L30 34 L30 62 L0 50 Z" className="fill-primary-300" />
                <path d="M60 22 L30 34 L30 62 L60 50 Z" className="fill-primary-400" />
                {/* sparkle */}
                <path
                  d="M22 -6 l0 10 M14 2 l16 0"
                  className="stroke-primary-500"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M40 -10 l0 8 M36 -6 l8 0"
                  className="stroke-primary-500"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* small caption inside the illustration */}
              <text
                x="180"
                y="185"
                textAnchor="middle"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontSize="13"
                fontWeight="600"
                className="fill-secondary-600"
              >
                Product not found
              </text>
            </g>

            {/* magnifying glass */}
            <g transform="translate(255,60) rotate(15)">
              <circle
                cx="30"
                cy="30"
                r="26"
                className="fill-white stroke-neutral-800"
                strokeWidth="6"
              />
              <line
                x1="49"
                y1="49"
                x2="72"
                y2="72"
                className="stroke-neutral-800"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>

            {/* sad shopping bag */}
            <g transform="translate(255,190)">
              <path
                d="M10 20 h70 l6 80 a8 8 0 0 1 -8 8 h-66 a8 8 0 0 1 -8 -8 z"
                className="fill-neutral-100 stroke-neutral-300"
                strokeWidth="2"
              />
              <path
                d="M28 24 v-10 a17 17 0 0 1 34 0 v10"
                fill="none"
                className="stroke-neutral-400"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* sad face */}
              <circle cx="35" cy="62" r="4" className="fill-neutral-800" />
              <circle cx="61" cy="62" r="4" className="fill-neutral-800" />
              <path
                d="M32 88 q16 -14 32 0"
                fill="none"
                className="stroke-neutral-800"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>

            {/* scattered dots */}
            <circle cx="60" cy="230" r="3" className="fill-primary-200" />
            <circle cx="330" cy="250" r="3" className="fill-primary-200" />
            <circle cx="340" cy="90" r="3" className="fill-primary-200" />
            <rect
              x="45"
              y="60"
              width="6"
              height="6"
              className="fill-primary-200"
              transform="rotate(45 48 63)"
            />
          </svg>
        </div>

        {/* Heading + message */}
        <h1 className="text-3xl font-bold mb-3 tracking-tight">
          We couldn't find that product
        </h1>
        <p className="text-sm text-description leading-relaxed mb-8 max-w-md">
          It may have sold out, been renamed, or the link you followed might
          be outdated. Let's get you back to shopping.
        </p>

        {/* Primary action */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10">
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto px-8 py-3 bg-primary-400 text-white text-sm font-semibold rounded-xl hover:bg-primary-500 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Browse All Products
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 py-3 bg-white text-neutral-700 text-sm font-semibold rounded-xl border border-secondary-400/20 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
          >
            Go Back
          </button>
        </div>

        {/* Quick links
        <div className="w-full pt-8 border-t border-secondary-400/10">
          <p className="text-xs font-bold uppercase tracking-wider text-description mb-4">
            Or try one of these
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_LINKS.map((link) => (
              <button
                key={link.to}
                onClick={() => navigate(link.to)}
                className="px-4 py-2 text-sm font-semibold text-description border border-secondary-400/20 rounded-full hover:border-primary-400 hover:text-primary-500 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}