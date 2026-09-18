import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import scrollToSection from "../Components/ScrollToSection";
import {
  getHeroSections,
  type IHeroSection,
} from "../apis/modules/hero-sections";
import { getCompanyInfo } from "../apis/modules/company-info";
import { FaTiktok } from "react-icons/fa6";

const ROTATE_MS = 7000;

export default function HomeBannerSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["heroSections"],
    queryFn: () => getHeroSections(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const heroes: IHeroSection[] = useMemo(
    () =>
      (data?.data?.data ?? [])
        .filter((h) => h.isActive)
        .sort((a, b) => a.order - b.order),
    [data],
  );

  useEffect(() => {
    if (heroes.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroes.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [heroes.length]);

  // Reset index if the list shrinks
  useEffect(() => {
    if (activeIndex >= heroes.length && heroes.length > 0) {
      setActiveIndex(0);
    }
  }, [heroes.length, activeIndex]);

  const hero = heroes[activeIndex] ?? null;

  useEffect(() => {
    setImageLoaded(false);
  }, [hero?.mediaUrl]);

  const alignmentClasses = {
    LEFT: "items-center lg:items-start text-center lg:text-left",
    CENTER: "items-center text-center",
    RIGHT: "items-center lg:items-end text-center lg:text-right",
  } as const;

  const textAlign = hero?.textAlignment ?? "LEFT";

  // ── 1. Loading skeleton ─────────────────────────────────────
  if (isLoading) {
    return (
      <section className="relative overflow-hidden bg-section">
        <div className="relative max-w-6xl min-h-screen mx-auto py-30 grid grid-cols-1 justify-items-center md:grid-cols-2 gap-12 items-center place-items-center animate-pulse">
          <div className="space-y-6 flex flex-col px-2 lg:px-12 items-center lg:items-start text-center lg:text-left w-full">
            <div className="h-8 w-48 rounded-full bg-white/10" />
            <div className="h-16 w-3/4 rounded-2xl bg-white/10" />
            <div className="h-16 w-2/3 rounded-2xl bg-white/10" />
            <div className="h-12 w-3/4 rounded-xl bg-white/10" />
            <div className="flex gap-4">
              <div className="h-12 w-32 rounded-xl bg-white/10" />
              <div className="h-12 w-40 rounded-xl bg-white/10" />
            </div>
          </div>
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-white/10" />
        </div>
      </section>
    );
  }

  // ── 2. Empty state — no active hero sections ────────────────
  if (heroes.length === 0) {
    return (
      <section className="relative overflow-hidden bg-section">
        <div className="relative max-w-6xl min-h-screen mx-auto py-30 flex flex-col items-center justify-center gap-4 text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur flex items-center justify-center">
            <span className="text-2xl">🖼️</span>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white">
            No hero section found
          </h3>
          <p className="max-w-md text-sm md:text-base text-description">
            Add a hero section from the admin dashboard to display it here.
          </p>
        </div>
        <SocialBar />
        <RotateShopBar />
      </section>
    );
  }

  if (isError || !hero) {
    return (
      <section className="relative overflow-hidden bg-section">
        <div className="relative max-w-6xl min-h-screen mx-auto py-30 grid grid-cols-1 justify-items-center md:grid-cols-2 gap-12 items-center place-items-center">
          <div className="space-y-6 flex flex-col px-2 lg:px-12 items-center lg:items-start text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 text-sm bg-secondary-800/10 text-primary-400 rounded-full border border-secondary-400/30 font-semibold">
                Nepal's Trusted Tech Store 🇳🇵
              </span>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                Upgrade Your <br />
                <span className="text-primary-400">Tech Lifestyle</span>
              </h2>
            </div>
            <p className="max-w-sm md:max-w-lg lg:max-w-xl text-base md:text-lg leading-relaxed text-description font-normal">
              Premium tech accessories — earbuds, speakers, smartwatches and
              more. Genuine products with fast delivery across Nepal.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-500/90 transition"
              >
                Shop Now
              </Link>
              <Link
                to="/categories"
                className="px-6 py-3 border border-secondary-400 rounded-xl text-description hover:bg-secondary-200/30 font-semibold transition"
              >
                Browse Categories
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl bg-black/30 border border-[var(--primary)]/40 backdrop-blur flex items-center justify-center">
              <span className="text-description text-sm font-medium">
                Product Image / Slider
              </span>
            </div>
          </div>
        </div>
        <SocialBar />
        <RotateShopBar />
      </section>
    );
  }

  // ── 4. Rendered hero ────────────────────────────────────────
  const overlay = hero.overlayColor ?? "#000000";
  const overlayAlpha =
    Math.min(Math.max(hero.overlayOpacity ?? 0, 0), 100) / 100;

  return (
    <section className="relative overflow-hidden min-h-screen w-full flex items-center bg-section">
      {/* Full-width background image */}
    <div className="absolute inset-0 z-0">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 animate-pulse" />
      )}

      <img
        src={hero.mediaUrl}
        alt={hero.headingLine1 ?? "Hero"}
        loading={activeIndex === 0 ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          imageLoaded
            ? "opacity-100 blur-none scale-100"
            : "opacity-0 blur-2xl scale-105"
        }`}
      />

      {overlayAlpha > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: overlay,
            opacity: overlayAlpha,
          }}
        />
      )}
    </div>

      {/* Text content, sitting above the background image */}
      <div className="relative z-10 w-full mx-auto px-20">
        <div className={`space-y-6 flex flex-col ${alignmentClasses[textAlign]}`}>
          <div className="space-y-4">
            {hero.eyebrow && (
              <span className="inline-block px-4 py-1 text-sm bg-secondary-800/10 text-primary-400 rounded-full border border-secondary-400/30 font-semibold">
                {hero.eyebrow}
              </span>
            )}

            {(hero.headingLine1 || hero.headingLine2) && (
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-white">
                {hero.headingLine1}{" "}
                {hero.headingLine2 && (
                  <>
                    <br />
                    <span className="text-primary-400">
                      {hero.headingLine2}
                    </span>
                  </>
                )}
              </h2>
            )}
          </div>

          {hero.description && (
            <p className="max-w-sm md:max-w-lg lg:max-w-xl text-base md:text-lg leading-relaxed text-white/80 font-normal">
              {hero.description}
            </p>
          )}

          {(hero.primaryButtonText || hero.secondaryButtonText) && (
            <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
              {hero.primaryButtonText && hero.primaryButtonLink && (
                <Link
                  to={hero.primaryButtonLink}
                  className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-500/90 transition"
                >
                  {hero.primaryButtonText}
                </Link>
              )}
              {hero.secondaryButtonText && hero.secondaryButtonLink && (
                <Link
                  to={hero.secondaryButtonLink}
                  className="px-6 py-3 border border-white/40 rounded-xl text-white hover:bg-white/10 font-semibold transition"
                >
                  {hero.secondaryButtonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {heroes.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <button
            onClick={() =>
              setActiveIndex((i) => (i - 1 + heroes.length) % heroes.length)
            }
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white transition hover:cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex gap-2">
            {heroes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex
                    ? "w-8 bg-primary-400"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex((i) => (i + 1) % heroes.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white transition hover:cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <SocialBar />
      <RotateShopBar />
    </section>
  );
}


function SocialBar() {
  
  const {
    data: companyInfoResponse,
  } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: () => getCompanyInfo(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const info = companyInfoResponse?.data?.info;

  const SOCIAL_LINKS = [
    { id: 1, icon: FaFacebookF, href: info?.socialLinks.facebook },
    { id: 2, icon: FaInstagram, href: info?.socialLinks.instagram },
    { id: 3, icon: FaTiktok, href: info?.socialLinks?.tiktok },
    { id: 4, icon: RiTwitterXLine, href: info?.socialLinks.twitter },
    { id: 5, icon: FaLinkedinIn, href: info?.socialLinks.linkedin },
  ];
  return (
    <div className="absolute text-secondary-500 flex flex-row lg:flex-col z-10 bottom-14 left-4 gap-4">
      {SOCIAL_LINKS.map(({ id, icon: Icon, href }) => href? (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full flex justify-center outline-2 backdrop-blur-md p-3 items-center cursor-pointer hover:bg-secondary-100 hover:text-black transition-colors"
        >
          <Icon size={20} />
        </a>
      ):null )}
    </div>
  );
}

function RotateShopBar() {
  return (
    <button
      onClick={() => scrollToSection("newArrivals")}
      className="absolute z-20 bottom-18 right-0 flex flex-row gap-4 items-center justify-center rotate-90 font-bold cursor-pointer border-r-2 border-t-2 border-zinc-200/40 text-description"
    >
      <span className="uppercase tracking-widest text-md text-secondary-500">Shop</span>
      <span className="flex items-center justify-center -rotate-90">
        <span className="animate-bounce text-secondary-500">
          <ArrowDown size={34} />
        </span>
      </span>
    </button>
  );
}