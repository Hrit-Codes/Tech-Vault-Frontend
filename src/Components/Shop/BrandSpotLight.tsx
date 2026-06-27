import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MacbookAir from "@/Assets/Products/MacbookAir15.webp";

export default function BrandSpotlight() {
  const navigate = useNavigate();

  return (
    <section className="w-full rounded-2xl bg-section-alternative overflow-hidden border dark:border-white border-black">
      <div className="relative w-full max-w-7xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-12">

        {/* Background circuit SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 800 400" fill="none">
          <path d="M0 200 H200 V100 H400 V300 H600 V150 H800" className="stroke-secondary-400" strokeWidth="1" />
          <path d="M0 300 H100 V50 H300 V350 H500 V100 H700 V250 H800" className="stroke-secondary-400" strokeWidth="0.5" />
          <circle cx="200" cy="100" r="4" className="fill-secondary-400" />
          <circle cx="400" cy="300" r="4" className="fill-secondary-400" />
          <circle cx="600" cy="150" r="4" className="fill-secondary-400" />
          <circle cx="100" cy="50" r="3" className="fill-secondary-400" />
          <circle cx="500" cy="100" r="3" className="fill-secondary-400" />
        </svg>

        {/* Dot grid */}
        <svg className="absolute right-0 top-0 w-48 h-full opacity-20 pointer-events-none" viewBox="0 0 100 200">
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 4 }).map((_, c) => (
              <circle key={`${r}-${c}`} cx={c * 25 + 12} cy={r * 25 + 12} r="1.5" className="fill-secondary-400" />
            ))
          )}
        </svg>

        {/* Left — Text */}
        <div className="relative z-10 flex-1 flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-secondary-500">
              #1 Best Seller
            </span>
            <div className="w-10 h-0.5 bg-primary-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold  leading-tight">
            The laptop<br />
            everyone is <span className="text-primary-500">talking about.</span>
          </h2>

          <p className="text-sm  leading-relaxed max-w-md">
            TechBook Air 15 — the most-loved product in our catalog. Razor thin, all-day battery, and the M2 chip that handles everything you throw at it. No wonder it keeps selling out.
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-secondary-500 text-secondary-500" />
              ))}
            </div>
            <span className="text-sm font-semibold ">4.9</span>
            <span className="text-sm text-primary-400">(2,400+ reviews)</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigate("/product")}
              className="flex items-center justify-center hover:cursor-pointer gap-2 px-6 py-3 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
            >
              View Product
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="flex items-center hover:cursor-pointer justify-center gap-2 px-6 py-3 rounded-xl border border-secondary-400 text-sm font-semibold hover:bg-secondary-400/10 transition-colors"
            >
              Browse All
            </button>
          </div>

          {/* Mini stats */}
          <div className="flex gap-8 pt-4 border-t border-secondary-400/20 mt-2">
            {[
              { value: "12K+", label: "Units Sold" },
              { value: "4.9★", label: "Avg Rating" },
              { value: "18hrs", label: "Battery Life" },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xl font-bold ">{value}</span>
                <span className="text-xs  leading-tight">{label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Right — Product Image Wrapper matching image_8e787f.png */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <div className="absolute inset-0 rounded-full bg-primary-500/5 blur-3xl scale-110" />
            
            {/* Dark Rust-Brown Frame Box */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-section border border-[#441a05] flex items-center justify-center p-8">
              {/* Inner crisp white block background for the laptop asset */}
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center p-4 shadow-md">
                <img
                  src={MacbookAir}
                  alt="TechBook Air 15"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
              ✦ Most Sold Product
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}