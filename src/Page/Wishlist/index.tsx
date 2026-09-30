import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, X, AlertTriangle } from "lucide-react";
import SliderComponent from "react-slick";
import ProductCard from "../../Components/Product/ProductCard";
import { useQuery } from "@tanstack/react-query";
import {
  getRecommendations,
  getWishlist,
  type WishlistItem,
} from "../../apis/modules/wishlist";
import { useWishlist } from "../../hooks/useWishlist";

const Slider = (SliderComponent as any).default || SliderComponent;

function getSlidesToShow(width: number) {
  if (width < 640) return 2;
  if (width < 1024) return 3;
  return 4;
}

// ─────────────────────────────────────────────────────────────
// Skeletons
// ─────────────────────────────────────────────────────────────

const WishlistCardSkeleton = () => (
  <div className="animate-pulse flex flex-col bg-section-alternative rounded-2xl overflow-hidden border border-secondary-400/5">
    <div className="aspect-square bg-secondary-400/20 w-full" />
    <div className="flex flex-col gap-4 px-5 py-6">
      <div className="flex flex-row items-start justify-between gap-2">
        <div className="h-6 bg-secondary-400/20 rounded w-2/3" />
        <div className="h-6 bg-secondary-400/20 rounded w-1/4" />
      </div>
      <div className="h-4 bg-secondary-400/20 rounded w-1/2" />
      <div className="h-4 bg-secondary-400/20 rounded w-5/6" />
      <div className="h-4 bg-secondary-400/20 rounded w-24 mx-auto mt-4" />
    </div>
  </div>
);

/** Matches ProductCard's shape — square image, name, subtitle, price */
const ProductCardSkeleton = () => (
  <div className="flex flex-col gap-3 overflow-hidden animate-pulse">
    <div className="w-full aspect-square rounded-2xl bg-secondary-400/20" />
    <div className="h-4 w-3/4 bg-secondary-400/20 rounded" />
    <div className="h-4 w-1/2 bg-secondary-400/20 rounded" />
  </div>
);

/** Wraps a slide with the same horizontal padding as the real ones */
const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="px-2 sm:px-4 md:px-6">{children}</div>
);

// ─────────────────────────────────────────────────────────────

export default function WishlistPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 12;

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const {
    data: wishlistResponse,
    isLoading: isWishlistLoading,
    isFetching: isWishlistFetching,
    isError: isWishlistError,
  } = useQuery({
    queryKey: ["wishlist", page, limit],
    queryFn: () => getWishlist(page, limit),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: recommendations = [],
    isLoading: isRecommendationsLoading,
    isError: isRecommendationsError,
    refetch: refetchRecommendations,
  } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => getRecommendations(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: wishlistItems.length > 0,
  });

  const { isProductInWishlist, toggleWishlist } = useWishlist();

  // ─── Handle Data Appending & Deduplication ─────────────────
  useEffect(() => {
    if (!wishlistResponse) return;
    const newWishlistItems = wishlistResponse.data.data;

    setWishlistItems((prev) => {
      if (page === 1) return newWishlistItems;
      const existingIds = new Set(prev.map((item) => item.id));
      const uniqueNewItems = newWishlistItems.filter(
        (item) => !existingIds.has(item.id),
      );
      return [...prev, ...uniqueNewItems];
    });
  }, [wishlistResponse, page]);

  const handleViewMore = () => {
    setPage((p) => p + 1);
  };

  const isInitialLoad = isWishlistLoading && page === 1;
  const isLoadingMore = isWishlistFetching && page > 1;

  const [slidesToShow, setSlidesToShow] = useState(() =>
    getSlidesToShow(typeof window === "undefined" ? 1280 : window.innerWidth),
  );

  useEffect(() => {
    const onResize = () => setSlidesToShow(getSlidesToShow(window.innerWidth));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Pre-computed skeletons for the slider
  const recommendationSkeletons = Array.from({ length: slidesToShow }).map(
    (_, i) => (
      <SlideWrapper key={`skeleton-${i}`}>
        <ProductCardSkeleton />
      </SlideWrapper>
    ),
  );

  return (
    <div className="w-full bg-section">
      <div className="w-full max-w-6xl mx-auto py-30 flex flex-col gap-10 px-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-2">
          <h2 className="heading-page">Wishlist</h2>
          <h3 className="text-sm text-description">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}{" "}
            saved for later
          </h3>
        </div>

        {/* ─── Initial Loading Skeleton ─────────────────────────── */}
        {isInitialLoad ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-14">
            {Array.from({ length: 6 }).map((_, i) => (
              <WishlistCardSkeleton key={i} />
            ))}
          </div>
        ) : isWishlistError ? (
          <div className="text-center py-20 text-red-500">
            Failed to load wishlist. Please try again.
          </div>
        ) : wishlistItems.length === 0 ? (
          /* ─── Empty State ────────────────────────────────────── */
          <div className="w-full flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-section-alternative flex items-center justify-center">
              <Heart size={28} className="text-secondary-400" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
              <p className="text-sm text-description">
                Save items you love and find them here anytime.
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="mt-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-2xl font-medium text-sm transition-colors hover:cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* ─── Wishlist Grid ──────────────────────────────────── */
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-14">
            {wishlistItems.map((item) => {
              const product = item.product;
              const hasSale =
                product.onSale &&
                product.salePrice &&
                product.salePrice < product.price;
              const isLoved = isProductInWishlist(product.id);

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col cursor-pointer group bg-section-alternative rounded-2xl overflow-hidden border border-secondary-400/5 hover:border-primary-400/30 transition-colors"
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-square">
                    {product.isNew && (
                      <span className="absolute top-3 left-3 z-10 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase shadow-sm">
                        New
                      </span>
                    )}

                    {/* Remove */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setWishlistItems((prev) =>
                          prev.filter((w) => w.id !== item.id),
                        );
                        toggleWishlist({
                          productId: product?.id,
                          isCurrentlyLoved: isLoved,
                        });
                      }}
                      className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform hover:cursor-pointer border border-secondary-400/5 disabled:opacity-50"
                      aria-label="Remove from wishlist"
                    >
                      <X
                        size={18}
                        strokeWidth={3}
                        className="text-secondary-500"
                      />
                    </button>

                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full bg-white object-cover group-hover:scale-105 transition-transform duration-300 p-6"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col gap-4 px-5 py-6">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex flex-row items-start justify-between gap-2">
                        <h3 className="text-lg font-semibold">
                          {product.name}
                        </h3>
                        <div className="flex flex-col items-end shrink-0">
                          {hasSale ? (
                            <>
                              <p className="text-lg font-semibold text-red-500">
                                Rs.{" "}
                                {product.salePrice?.toLocaleString("en-IN")}
                              </p>
                              <p className="text-sm text-description line-through">
                                Rs. {product.price.toLocaleString("en-IN")}
                              </p>
                            </>
                          ) : (
                            <p className="text-lg font-semibold">
                              Rs. {product.price.toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-description leading-relaxed line-clamp-2">
                      {product.freeShipping
                        ? "Free shipping available on this item."
                        : "Standard shipping rates apply."}
                    </p>

                    {/* Actions */}
                    <div className="w-full flex flex-col gap-3 text-center font-medium mt-1">
                      <button
                        onClick={() => navigate(`/product/${product.slug}`)}
                        className="cursor-pointer text-secondary-500 hover:underline hover:text-secondary-400 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── View More Button ──────────────────────────────────── */}
        {!isInitialLoad &&
          wishlistItems.length > 0 &&
          wishlistResponse?.data?.pagination?.hasNextPage && (
            <div className="w-full flex justify-center mt-4">
              <button
                onClick={handleViewMore}
                disabled={isLoadingMore}
                className="bg-primary-500 py-4 px-10 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold transition-colors disabled:opacity-50"
              >
                {isLoadingMore ? "Loading..." : "View More"}
              </button>
            </div>
          )}

        {/* ─── Recommendations Slider ───────────────────────────── */}
        {wishlistItems.length > 0 && (
          <div className="w-full max-w-6xl mx-auto py-20">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="heading-section">You Might Also Like</h2>
                <h3 className="text-sm font-normal text-description leading-relaxed mt-1">
                  Handpicked recommendations based on your taste.
                </h3>
              </div>
              <button
                onClick={() => navigate("/shop")}
                className="text-sm text-secondary-500 hover:text-secondary-600 font-semibold transition-colors cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Loading skeleton */}
            {isRecommendationsLoading && (
              <Slider
                dots={false}
                infinite={false}
                autoplay={false}
                slidesToShow={slidesToShow}
                slidesToScroll={1}
                arrows={false}
                draggable={false}
              >
                {recommendationSkeletons}
              </Slider>
            )}

            {/* Error state */}
            {!isRecommendationsLoading && isRecommendationsError && (
              <div className="w-full flex flex-col items-center justify-center gap-3 py-12 bg-section-alternative rounded-3xl border border-secondary-400/5">
                <AlertTriangle className="text-red-400" size={28} />
                <p className="font-semibold text-description text-sm">
                  Couldn't load recommendations right now.
                </p>
                <button
                  onClick={() => refetchRecommendations()}
                  className="bg-primary-500 hover:bg-primary-600 text-white py-2.5 px-6 rounded-full text-sm font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty recommendations */}
            {!isRecommendationsLoading &&
              !isRecommendationsError &&
              recommendations.length === 0 && (
                <div className="w-full py-10 text-center text-description text-sm">
                  No recommendations available yet.
                </div>
              )}

            {/* Real recommendations */}
            {!isRecommendationsLoading &&
              !isRecommendationsError &&
              recommendations.length > 0 && (
                <Slider
                  dots={false}
                  infinite={recommendations.length > slidesToShow}
                  autoplay
                  autoplaySpeed={3000}
                  speed={500}
                  slidesToShow={slidesToShow}
                  slidesToScroll={1}
                  arrows={false}
                  pauseOnHover
                >
                  {recommendations.map((product) => (
                    <SlideWrapper key={product.id}>
                      <ProductCard
                        image={product.images[0]}
                        name={product.name}
                        subtitle={product.description ?? ""}
                        basePrice={product.price}
                        salePrice={product.salePrice ?? 0}
                        isNew={product.isNew}
                        bgColor="bg-section"
                        id={product.id}
                        slug={product.slug}
                      />
                    </SlideWrapper>
                  ))}
                </Slider>
              )}
          </div>
        )}
      </div>
    </div>
  );
}