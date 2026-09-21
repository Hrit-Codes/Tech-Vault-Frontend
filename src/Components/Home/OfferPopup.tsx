import { X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../../apis/modules/offers";
import { useNavigate } from "react-router-dom";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(endDate: string | Date): TimeLeft {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function OfferPopup() {
    const navigate=useNavigate();

  const { data: offersResponse, isLoading, isError } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getOffers(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 2,
  });

  // Dismissed offer IDs — top of the stack pops off, next one is revealed
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  // Tick for the countdown — shared across all visible popups
  const [now, setNow] = useState(() => Date.now());

  const offers = offersResponse?.data.data ?? [];

  // Only show active offers that aren't expired and haven't been dismissed
  const visibleOffers = useMemo(() => {
    const t = now;
    return offers.filter((o) => {
      if (!o.isActive) return false;
      if (dismissedIds.has(o.id)) return false;
      if (new Date(o.endDate).getTime() <= t) return false;
      return true;
    });
  }, [offers, dismissedIds, now]);

  // Single interval drives every countdown
  useEffect(() => {
    if (!visibleOffers.length) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [visibleOffers.length]);

  // Lock body scroll while any popup is visible
  useEffect(() => {
    if (!visibleOffers.length) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visibleOffers.length]);

  // Escape closes the top popup
  useEffect(() => {
    if (!visibleOffers.length) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissTop();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visibleOffers]);

  if (isLoading || isError || visibleOffers.length === 0) return null;

  const dismissTop = () => {
    const top = visibleOffers[0];
    if (!top) return;
    setDismissedIds((prev) => new Set(prev).add(top.id));
  };

  const dismissAll=()=>{
    setDismissedIds((prev)=>{
        const next=new Set(prev);
        visibleOffers.map((o)=>next.add(o.id));
        return next;
    })
  }

  // Stack order: topmost = index 0. The ones behind are slightly inset.
  const MAX_STACK = 3; // cap visible depth at 3 so it doesn't pile forever

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop — clicking closes only the top offer */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismissTop}
      />

      {/* Popup stack — reversed so index 0 is topmost in z-order */}
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        {visibleOffers
          .slice(0, MAX_STACK)
          .map((offer, idx) => {
            const isTop = idx === 0;
            const timeLeft = getTimeLeft(offer.endDate);

            return (
              <div
                key={offer.id}
                className="absolute inset-x-0 top-0 w-full transition-all duration-300"
                style={{
                  // Stack effect: each deeper popup is offset and shrunk slightly
                  transform: `translateY(${idx * 14}px) scale(${1 - idx * 0.03})`,
                  zIndex: MAX_STACK - idx,
                  opacity: idx === 0 ? 1 : 0.85 - idx * 0.15,
                  pointerEvents: isTop ? "auto" : "none",
                }}
                aria-hidden={!isTop}
              >
                <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:h-[80vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
                  {/* Banner image */}
                  <img
                    src={offer.bannerImage || "/ProductPlaceholder.webp"}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Dark gradient at bottom for readability */}
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                  {/* Countdown — only on the top popup */}
                  {isTop && (
                    <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent pt-4 pb-4 px-4">
                      <div className="w-fit mx-auto grid grid-cols-4 place-items-center gap-4 sm:gap-8">
                        {(
                          [
                            { label: "Days", value: timeLeft.days },
                            { label: "Hours", value: timeLeft.hours },
                            { label: "Minutes", value: timeLeft.minutes },
                            { label: "Seconds", value: timeLeft.seconds },
                          ] as const
                        ).map((item) => (
                          <div key={item.label} className="relative text-center">
                            <div className="mb-2 text-xs sm:text-sm uppercase font-semibold tracking-widest text-white/80">
                              {item.label}
                            </div>

                            {/* Glow */}
                            <div className="absolute inset-0 rounded-lg bg-primary-500/40 blur-xl animate-pulse" />

                            <div className="relative mx-auto w-14 sm:w-18 md:w-20 text-center text-xl sm:text-3xl md:text-4xl font-bold text-white bg-black/30 rounded-lg px-4 py-2 backdrop-blur-lg shadow-[0_0_30px_rgba(239,68,68,0.7)]">
                              {item.value.toString().padStart(2, "0")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Close */}
                  {isTop && (
                    <button
                      type="button"
                      onClick={dismissTop}
                      className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white backdrop-blur-md transition hover:scale-110 hover:bg-red-500 hover:cursor-pointer"
                      aria-label="Close offer"
                    >
                      <X size={22} />
                    </button>
                  )}

                  {/* Offer title / CTA on the bottom */}
                  {isTop && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex flex-col gap-3">
                      <h2 className="text-white text-xl sm:text-2xl font-bold">
                        {offer.title}
                      </h2>
                      {offer.description && (
                        <p className="text-white/80 text-sm font-medium line-clamp-2">
                          {offer.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          type="button"
                          onClick={()=>{dismissAll(); navigate("/search") }}
                          className="px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 hover:cursor-pointer transition"
                        >
                          Shop Now
                        </button>
                        <button
                          type="button"
                          onClick={dismissTop}
                          className="px-5 py-2.5 rounded-xl border border-white/30 text-white text-sm font-semibold hover:bg-red-400 hover:cursor-pointer transition"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        <div className="invisible w-full aspect-[16/9] lg:aspect-auto lg:h-[80vh]" />
      </div>

      {/* Progress hint — "1 of 3" */}
      {visibleOffers.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs font-semibold tracking-wider">
          {`${visibleOffers.length} offer${visibleOffers.length > 1 ? "s" : ""} · dismiss to see next`}
        </div>
      )}
    </div>
  );
}