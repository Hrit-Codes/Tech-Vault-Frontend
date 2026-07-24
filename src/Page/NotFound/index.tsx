import { useNavigate } from "react-router-dom";
import { Unplug, Home, Search, ArrowLeft } from "lucide-react";
import HeroBackground from "../../Components/ui/HeroBackground";

const quickLinks = [
  { label: "Shop", path: "/shop" },
  { label: "Wishlist", path: "/wishlist" },
  { label: "About Us", path: "/aboutus" },
  { label: "Blog", path: "/blogs" },
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full py-32 md:py-40 overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center gap-6">

        <span className="text-xs font-semibold tracking-widest px-3 py-1 rounded-full border border-primary-400 text-primary-500 bg-primary-500/5 uppercase">
          Error 404 &middot; Page not found
        </span>

        <h1
          data-text="404"
          className="text-[6rem] leading-none md:text-[8.5rem] font-black tracking-tight select-none"
        >
          404
        </h1>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-bold">
            Well, this page got unplugged.
          </h2>
          <p className="text-sm text-description max-w-md mx-auto leading-relaxed">
            No cables, no chargers, no page — whatever you were looking for isn&apos;t wired up here. Let&apos;s get you back to something that actually works.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-500 py-3.5 px-8 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold transition-colors"
          >
            <Home size={16} />
            Back to Home
          </button>
          <button
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 rounded-full border border-primary-500/30 text-primary-500 font-semibold hover:bg-primary-500/10 hover:cursor-pointer transition-colors"
          >
            <Search size={16} />
            Browse Shop
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {quickLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-section-alternative border border-secondary-400/10 text-description hover:text-primary-500 hover:border-primary-400/40 transition-colors hover:cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-description hover:text-primary-500 transition-colors mt-2 hover:cursor-pointer"
        >
          <ArrowLeft size={14} />
          Go back to previous page
        </button>
      </div>
    </section>
  );
}
