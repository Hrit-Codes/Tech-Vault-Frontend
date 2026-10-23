import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import {
  getPromotionalBanners,
  type IPromotionalBanner,
} from "../../apis/modules/promotional-banners";

function BannerCard({ banner }: { banner: IPromotionalBanner }) {
  const linkUrl = banner.linkUrl?.trim();
  const isInternalLink = !!linkUrl && linkUrl.startsWith("/");

  const content = (
    <div className="group relative overflow-hidden flex flex-col gap-3">
      <img
        src={banner.imageUrl}
        alt={banner.title}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[16/9] object-cover transform group-hover:scale-[1.02] transition-transform duration-300"
      />
      <p className="text-description px-4">{banner.title}</p>
    </div>
  );

  if (!linkUrl) {
    return content;
  }

  if (isInternalLink) {
    return (
      <Link
        to={linkUrl}
        className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label={banner.title}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
      aria-label={banner.title}
    >
      {content}
    </a>
  );
}

function BannerSkeleton() {
  return (
    <div className="w-full aspect-[16/9] rounded-2xl bg-neutral-200 animate-pulse" />
  );
}

export function PromotionalBanners() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["promotionalBanners"],
    queryFn: () => getPromotionalBanners(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const banners: IPromotionalBanner[] = data?.data?.data ?? [];

  if (isError || (!isLoading && banners.length === 0)) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-wrap justify-center gap-6">
        {isLoading
          ? [0, 1].map((i) => (
              <div key={i} className="w-full md:w-[calc(50%-12px)]">
                <BannerSkeleton />
              </div>
            ))
          : banners.map((banner) => (
              <div key={banner.id} className="w-full md:w-[calc(50%-12px)]">
                <BannerCard banner={banner} />
              </div>
            ))}
      </div>
    </section>
  );
}