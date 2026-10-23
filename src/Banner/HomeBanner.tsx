import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const [readyUrls, setReadyUrls] = useState<Set<string>>(() => new Set());

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useRef(true);
  const preloadedUrls = useRef(new Set<string>());

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

  // Move the carousel by `delta`, wrapping around and staying in bounds.
  const step = useCallback(
    (delta: number) => (current: number) => {
      if (heroes.length === 0) return 0;
      const from = Math.min(current, heroes.length - 1);
      return (from + delta + heroes.length) % heroes.length;
    },
    [heroes.length]
  );

  // Only advance while the hero is actually on screen, so an offscreen
  // slide can never blank out the image the user scrolls back to.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || heroes.length <= 1) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(node);

    const id = setInterval(() => {
      if (!isInView.current) return;
      setActiveIndex(step(1));
    }, ROTATE_MS);

    return () => {
      observer.disconnect();
      clearInterval(id);
    };
  }, [heroes.length, step]);

  // Clamped during render so a shrinking list can never leave the carousel
  // pointing past the end, without a corrective extra render.
  const safeIndex = Math.min(activeIndex, Math.max(heroes.length - 1, 0));
  const hero = heroes[safeIndex] ?? null;

  const markReady = useCallback((url: string) => {
    setReadyUrls((prev) => (prev.has(url) ? prev : new Set(prev).add(url)));
  }, []);

  // Warm every slide up front so switching is instant and never shows a gap.
  useEffect(() => {
    heroes.forEach(({ mediaUrl }) => {
      if (!mediaUrl || preloadedUrls.current.has(mediaUrl)) return;
      preloadedUrls.current.add(mediaUrl);

      const preloader = new Image();
      preloader.onload = () => markReady(mediaUrl);
      preloader.src = mediaUrl;
    });
  }, [heroes, markReady]);

  // An image served from cache can finish loading before React attaches
  // onLoad, which would otherwise strand the slide at opacity-0.
  const markImageReady = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node?.complete || node.naturalWidth === 0) return;
      const url = node.dataset.heroUrl;
      if (url) markReady(url);
    },
    [markReady]
  );

  const imageReady = hero ? readyUrls.has(hero.mediaUrl) : false;

  const alignmentClasses = {
    LEFT: "items-center lg:items-start text-center lg:text-left",
    CENTER: "items-center text-center",
    RIGHT: "items-center lg:items-end text-center lg:text-right",
  } as const;

  const textAlign = hero?.textAlignment ?? "LEFT";

  // ── 1. Loading skeleton ─────────────────────────────────────
  if (isLoading) {
    return (
      <section className="relative overflow-hidden min-h-screen w-full flex items-center bg-section">
        {/* Full-width background placeholder */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 animate-pulse" />
        </div>

        {/* Text content skeleton — mirrors the live hero layout */}
        <div className="relative z-10 w-full mx-auto px-6 lg:px-20">
          <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
            <div className="space-y-4 w-full">
              {/* Eyebrow pill */}
              <div className="h-8 w-48 rounded-full bg-white/10 animate-pulse" />
              {/* Heading lines */}
              <div className="space-y-3">
                <div className="h-12 md:h-14 xl:h-16 w-3/4 rounded-2xl bg-white/10 animate-pulse" />
                <div className="h-12 md:h-14 xl:h-16 w-2/3 rounded-2xl bg-white/10 animate-pulse" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 w-full max-w-lg">
              <div className="h-4 w-full rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-5/6 rounded-full bg-white/10 animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="h-12 w-32 rounded-xl bg-white/10 animate-pulse" />
              <div className="h-12 w-40 rounded-xl bg-white/10 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Slide indicators skeleton */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full bg-white/10 animate-pulse ${
                  i === 0 ? "w-8" : "w-2"
                }`}
              />
            ))}
          </div>
          <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
        </div>

        {/* Social bar skeleton */}
        <div className="absolute flex flex-row lg:flex-col z-10 bottom-14 left-4 gap-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-11 h-11 rounded-full bg-white/10 animate-pulse"
            />
          ))}
        </div>

        {/* Rotate shop bar skeleton */}
        <div className="absolute z-20 bottom-18 right-0 rotate-90 border-r-2 border-t-2 border-zinc-200/40">
          <div className="h-6 w-20 rounded-full bg-white/10 animate-pulse" />
        </div>
      </section>
    );
  }

  if (isError || !hero) {
    return (
      <section className="relative overflow-hidden min-h-screen w-full flex items-center bg-[#0b0f19]">
        {/* Full-width static background image */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/Banners/Dummy_Banner.webp" 
            alt="TechVault Premium Tech"
            className="w-full h-full object-fit opacity-80" 
          />
          {/* Dark gradient overlay to ensure the button is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-[#0b0f19]/50" />
        </div>

        {/* Content container - Centered for the button */}
        <div className="relative z-10 w-full mx-auto px-6 h-full flex flex-col justify-end pb-32 items-center">
          {/* Shop Now Button */}
          <Link
            to="/shop" // 👈 Linked to your shop page as requested
            className="px-10 py-4 bg-primary-500 text-white text-lg font-bold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105"
          >
            Shop Now
          </Link>
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen w-full flex items-center bg-section"
    >
      {/* Full-width background image */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 transition-opacity duration-700 ${
            imageReady ? "opacity-0" : "opacity-100 animate-pulse"
          }`}
        />

        <img
          ref={markImageReady}
          src={hero.mediaUrl}
          data-hero-url={hero.mediaUrl}
          alt={hero.headingLine1 ?? "Hero"}
          loading="eager"
          decoding="async"
          onLoad={() => markReady(hero.mediaUrl)}
          className={`w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out ${
            imageReady ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
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
            onClick={() => setActiveIndex(step(-1))}
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
                  i === safeIndex
                    ? "w-8 bg-primary-400"
                    : "w-2 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex(step(1))}
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