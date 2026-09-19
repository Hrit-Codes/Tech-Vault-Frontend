import SliderComponent from "react-slick";
import CategoryCard from "../Category/CategoryCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories, type ICategory } from "../../apis/modules/categories";
import ServerError from "../ui/ServerError";

const Slider = (SliderComponent as any).default || SliderComponent;

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="w-full h-64 bg-neutral-200 animate-pulse rounded-xl" />
      <div className="h-4 w-24 bg-neutral-200 animate-pulse rounded mt-3" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <svg className="w-12 h-12 text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <h3 className="text-lg font-semibold text-neutral-700 mb-1">No Categories Found</h3>
      <p className="text-sm text-neutral-500 text-center">We couldn't find any categories at the moment. Please check back later.</p>
    </div>
  );
}

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  return 3;
}

export default function CategorySection() {
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
  );

  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
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
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };

  const categories: ICategory[] = categoriesResponse?.data.data || [];

  const skeletonSlides = Array.from({ length: slidesToShow }).map((_, index) => (
    <div key={`skeleton-${index}`} className="px-2 sm:px-3 md:px-4">
      <CategoryCardSkeleton />
    </div>
  ));

  const renderContent = () => {
    if (isCategoriesLoading) {
      return (
        <Slider {...settings}>
          {skeletonSlides}
        </Slider>
      );
    }

    if (isCategoriesError) {
      return (
        <ServerError
          fullScreen={false}
          showReload={false}
          description="We couldn't load the categories right now. Please try again."
        />
      );
    }

    if (categories.length === 0) {
      return <EmptyState />;
    }

    return (
      <Slider {...settings}>
        {categories.map((category: ICategory) => (
          <div key={category.id} className="px-2 sm:px-3 md:px-4">
            <CategoryCard
              image={category.image}
              name={category.name}
            />
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="heading-section">Shop by Category</h2>
          <h3 className="text-sm font-normal text-description leading-relaxed mt-1">
            Curated tech, organized for you.
          </h3>
        </div>
        <button className="text-sm text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer">
          View All
        </button>
      </div>
      {renderContent()}
    </div>
  );
}