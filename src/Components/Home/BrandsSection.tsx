import SliderComponent from "react-slick";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrands, type IBrand } from "../../apis/modules/brands";

type BrandCardProps = {
  image: string;
  name: string;
};

export function BrandCard({ image, name }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer group overflow-hidden">
      <div className="w-full h-32 bg-gradient-to-b from-secondary-200 to-secondary-100 inset-0 rounded-xl flex items-center justify-center p-4">
        <img
          src={image}
          alt={name}
          className="inset-0 w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <span className="text-sm font-medium text-neutral-600 mt-2">
        {name}
      </span>
    </div>
  );
}

function BrandCardSkeleton() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="w-full h-32 bg-neutral-200 animate-pulse rounded-xl" />
      <div className="h-4 w-20 bg-neutral-200 animate-pulse rounded mt-2" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="text-lg font-semibold text-red-800 mb-1">Failed to load brands</h3>
      <p className="text-sm text-red-600 mb-6 text-center">Something went wrong while fetching the brands. Please try again.</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg className="w-12 h-12 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 className="text-lg font-semibold text-neutral-700 mb-1">No Brands Available</h3>
      <p className="text-sm text-neutral-500 text-center">We are currently updating our catalog. Please check back later.</p>
    </div>
  );
}

const Slider = (SliderComponent as any).default || SliderComponent;

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function BrandsSection() {
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
  );

  const {
    data: brandsResponse,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  const brands: IBrand[] = brandsResponse?.data?.data || [];

  const skeletonSlides = Array.from({ length: slidesToShow }).map((_, index) => (
    <div key={`skeleton-${index}`} className="px-2 sm:px-4 md:px-6">
      <BrandCardSkeleton />
    </div>
  ));

  const renderContent = () => {
    if (isBrandsLoading) {
      return (
        <Slider {...settings}>
          {skeletonSlides}
        </Slider>
      );
    }

    if (isBrandsError) {
      return <ErrorState />;
    }

    if (brands.length === 0) {
      return <EmptyState />;
    }

    return (
      <Slider {...settings}>
        {brands.map((brand: IBrand) => (
          <div key={brand.id} className="px-2 sm:px-4 md:px-6">
            <BrandCard
              name={brand.name}
              image={brand.logo || (brand as any).image || ""}
            />
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <section id="newArrivals" className="w-full max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="w-full flex flex-col items-center justify-center gap-3 mb-12">
        <h2 className="heading-section">Our Brands</h2>
        <div className="w-40 h-1 bg-secondary-400" />
      </div>
      {renderContent()}
    </section>
  );
}