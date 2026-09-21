import SliderComponent from "react-slick";
import ProductCard from "../Product/ProductCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getNewProducts, type IProduct } from "../../apis/modules/products";
import ServerError from "../ui/ServerError";

const Slider = (SliderComponent as any).default || SliderComponent;

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <div className="w-full h-48 bg-neutral-200 animate-pulse rounded-xl" />
      <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded" />
      <div className="h-4 w-1/2 bg-neutral-200 animate-pulse rounded" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg className="w-12 h-12 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 className="text-lg font-semibold text-neutral-700 mb-1">No New Arrivals</h3>
      <p className="text-sm text-neutral-500 text-center">We are currently updating our catalog. Please check back later.</p>
    </div>
  );
}

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function NewArrivals() {
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
  );

  const {
    data: newProductsResponse,
    isLoading: isNewProductsLoading,
    isError: isNewProductsError,
  } = useQuery({
    queryKey: ["newProducts"],
    queryFn: () => getNewProducts(1, 12),
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

  const products: IProduct[] = newProductsResponse?.data?.data || [];

  const skeletonSlides = Array.from({ length: slidesToShow }).map((_, index) => (
    <div key={`skeleton-${index}`} className="px-2 sm:px-4 md:px-6">
      <ProductCardSkeleton />
    </div>
  ));

  const renderContent = () => {
    if (isNewProductsLoading) {
      return (
        <Slider {...settings}>
          {skeletonSlides}
        </Slider>
      );
    }

    if (isNewProductsError) {
      return (
        <ServerError
          fullScreen={false}
          showReload={false}
          description="We couldn't load the new arrivals right now. Please try again."
        />
      );
    }

    if (products.length === 0) {
      return <EmptyState />;
    }

    return (
      <Slider {...settings}>
        {products.map((product: IProduct) => (
          <div key={product.id} className="px-2 sm:px-4 md:px-6">
            <ProductCard
              image={product.images?.[0] || ""}
              name={product.name}
              subtitle={product.description || ""}
              basePrice={product.price}
              salePrice={product.salePrice}
              isNew={product.isNew}
              bgColor="bg-section"
              id={product.id}
              slug={product.slug}
            />
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <section id="newArrivals" className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="heading-section">New Arrivals</h2>
          <h3 className="text-sm font-normal text-description leading-relaxed mt-1">
            The latest in precision engineering.
          </h3>
        </div>
        <button
          onClick={() => navigate("/shop?sortBy=newest")}
          className="text-sm text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>
      {renderContent()}
    </section>
  );
}