import SliderComponent from "react-slick";
import ProductCard from "../Product/ProductCard";
import { useEffect, useState } from "react";
import CountdownTimer from "../ui/CountdownTimer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../../apis/modules/offers";
import type { IOffer } from "../utils/types";

const Slider = (SliderComponent as any).default || SliderComponent;

function OfferSectionSkeleton() {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 640) setSlidesToShow(2);
      else if (window.innerWidth < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col gap-4 items-start justify-between mb-12">
        <div className="w-full flex flex-col gap-4 md:gap-2 md:flex-row justify-between">
          <div className="h-8 w-64 bg-neutral-200 animate-pulse rounded" />
          <div className="h-8 w-32 bg-neutral-200 animate-pulse rounded" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: slidesToShow }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="w-full h-48 bg-neutral-200 animate-pulse rounded-xl" />
            <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded" />
            <div className="h-4 w-1/2 bg-neutral-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

export default function OfferSection() {
  const navigate = useNavigate();
  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth)
  );

  const {
    data: offersResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["offers"],
    queryFn: () => getOffers(),
    staleTime: 5 * 60 * 1000, 
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

  const offers: IOffer[] = offersResponse?.data?.data || [];

  if (isLoading) return <OfferSectionSkeleton />;
  if (isError || offers.length === 0) return null;

  return (
    <>
      {offers.map((offer) => {
        const offerProducts = offer.products || [];
        if (offerProducts.length === 0) return null;

        return (
          <section
            key={offer.id}
            id={`offer-${offer.id}`}
            className="w-full max-w-6xl mx-auto px-6 py-16"
          >
            {/* Header */}
            <div className="flex flex-col gap-4 items-start justify-between mb-12">
              <div className="w-full flex flex-col gap-4 md:gap-2 md:flex-row justify-between">
                <h2 className="heading-section">{offer.title}</h2>
                <CountdownTimer targetDate={offer.endDate} />
              </div>
              <button
                onClick={() => navigate("/offer")}
                className="text-sm self-end text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Slider */}
            <Slider {...settings}>
              {offerProducts.map((product: any) => (
                <div key={product.id} className="px-2 sm:px-4 md:px-6">
                  <ProductCard
                    image={product.image}
                    name={product.name}
                    subtitle={product.subtitle}
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
          </section>
        );
      })}
    </>
  );
}