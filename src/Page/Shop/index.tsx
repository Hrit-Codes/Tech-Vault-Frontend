import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PromotionalBanners } from "../../Components/Home/PromotionalBanners";
import ProductCard from "../../Components/Product/ProductCard";
import { ShopHero } from "../../Components/Shop/ShopHero";
import { getCategories } from "../../apis/modules/categories";
import { getProducts } from "../../apis/modules/products";
import type { IProductListItem } from "../../apis/modules/products";
import ServerError from "../../Components/ui/ServerError";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_PER_PAGE = 12;
const PILL_WIDTHS = ["w-20", "w-24", "w-32", "w-28", "w-24", "w-36", "w-20", "w-28"];

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <div className="w-full h-48 bg-neutral-200 animate-pulse rounded-xl" />
      <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded" />
      <div className="h-4 w-1/2 bg-neutral-200 animate-pulse rounded" />
    </div>
  );
}

function CategoryPillsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`h-12 ${PILL_WIDTHS[i % PILL_WIDTHS.length]} rounded-full bg-neutral-200 animate-pulse`}
        />
      ))}
    </>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams]=useSearchParams();
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(searchParams.get("category")??"");
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<IProductListItem[]>([]);

  const {
    data: categoriesResponse,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
    isError: isProductsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["shopProducts", selectedCategorySlug, page],
    queryFn: () =>
      getProducts({
        page,
        limit: PRODUCTS_PER_PAGE,
        categorySlug: selectedCategorySlug || undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const categories = categoriesResponse?.data.data ?? [];
  const pagination = productsResponse?.data.pagination;
  const hasMorePages = pagination ? page < pagination.totalPages : false;

  useEffect(()=>{
    const slugFromUrl=searchParams.get("category")??"";
    if(slugFromUrl!==selectedCategorySlug){
      setSelectedCategorySlug(slugFromUrl);
      setPage(1);
    }
  },[searchParams])

  useEffect(() => {
    if (!productsResponse) return;
    const newProducts = productsResponse.data.data;
    setDisplayedProducts((prev) =>
      page === 1 ? newProducts : [...prev, ...newProducts]
    );
  }, [productsResponse]);

  const handleCategoryClick = (slug: string) => {
    setSelectedCategorySlug(slug);
    setPage(1);
    setSearchParams(slug?{category:slug}:{});
  };

  const handleViewMore = () => {
    setPage((p) => p + 1);
  };

  const isInitialLoad = isProductsLoading && page === 1;
  const isLoadingMore = isProductsFetching && page > 1;

  const hasError = isCategoriesError || isProductsError;

  const handleRetry = () => {
    if (isCategoriesError) refetchCategories();
    if (isProductsError) refetchProducts();
  };

  if (hasError) {
    return (
      <ServerError
        description="We couldn't load the shop content. This might be due to a network issue or our servers are temporarily down. Please try again."
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="w-full mx-auto flex flex-col">
      <ShopHero />

      <div className="w-full mx-auto py-36 bg-section px-6">
        <div className="w-full max-w-6xl mx-auto">
          {/* Category list */}
          <div className="max-w-2xl flex flex-wrap justify-center gap-2 mx-auto">
            <button
              onClick={() => handleCategoryClick("")}
              className={`px-6 py-3 border border-primary-400 rounded-full hover:cursor-pointer font-semibold transition-colors ${
                selectedCategorySlug === ""
                  ? "bg-primary-400 text-white"
                  : "hover:bg-primary-400/80 hover:text-white"
              }`}
            >
              All
            </button>

            {isCategoriesLoading && <CategoryPillsSkeleton count={6} />}

            {categories.map((category) => (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className={`px-6 py-3 border border-primary-400 rounded-full hover:cursor-pointer font-semibold transition-colors ${
                  selectedCategorySlug === category.slug
                    ? "bg-primary-400 text-white"
                    : "hover:bg-primary-400/80 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div>
            {isInitialLoad ? (
              <div className="w-full my-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-18">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : displayedProducts.length === 0 ? (
              <div className="w-full my-20 text-center text-description">
                No products found in this category.
              </div>
            ) : (
              <div className="w-full my-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-18">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    subtitle={product.category?.name ?? ""}
                    image={product.images?.[0] ?? ""}
                    price={product.onSale && product.salePrice ? product.salePrice : product.price}
                    isNew={product.isNew}
                    bgColor="bg-section"
                    id={product.id}
                    slug={product.slug}
                  />
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {hasMorePages && (
              <div className="w-full flex justify-center items-center mx-auto">
                <button
                  onClick={handleViewMore}
                  disabled={isLoadingMore}
                  className="bg-primary-500 py-4 px-10 rounded-full hover:bg-primary-500/90 hover:cursor-pointer text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoadingMore ? "Loading..." : "View More"}
                </button>
              </div>
            )}
            <span className="w-full flex justify-center text-center">
              {isLoadingMore && "Loading..."}
            </span>
          </div>

          <PromotionalBanners />
        </div>
      </div>
    </div>
  );
}