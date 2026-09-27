import { useState, useEffect} from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../../Components/Product/ProductCard";
import FilterSidebar from "../../Components/Search/FilterSidebar";
import { defaultFilters, type SearchFilters } from "../../Components/Search/searchFilters";
import { useSearchParams } from "react-router-dom";
import type { SortFilterValue } from "../../Components/utils/types";
import { useQuery } from "@tanstack/react-query";
import { getProducts, type IProductListItem } from "../../apis/modules/products";
import Pagination from "../../Components/Search/Pagination";

const PRODUCTS_PER_PAGE = 12;

const sortOptions: { label: string; value: SortFilterValue }[] = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortFilterValue>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Prevent body scrolling when mobile sidebar overlay is active
  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const queryParams = {
    page: currentPage,
    limit: PRODUCTS_PER_PAGE,
    search: query.trim() || undefined,
    categorySlug: filters.categories.length? filters.categories.join(",") : undefined,
    brandSlug: filters.brands.length? filters.brands.join(",") : undefined,
    minPrice: filters.minPrice !== "" ? Number(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice !== "" ? Number(filters.maxPrice) : undefined,
    minRating:filters.minRating >0 ? filters.minRating : undefined,
    maxRating: filters.maxRating<5 ? filters.maxRating : undefined,
    isNew: filters.newOnly || undefined,
    onSale: filters.onSaleOnly || undefined,
    sortBy,
  };

  const {
    data: productsResponse,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["searchProducts", queryParams],
    queryFn: () => getProducts(queryParams),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const fetchedProducts = productsResponse?.data.data ?? [];
  const pagination = productsResponse?.data.pagination;
  const totalPages = pagination?.totalPages ?? 1;


  const clearAll = () => {
    setFilters(defaultFilters);
    setQuery("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleFiltersChange = (next: SearchFilters) => {
    setFilters(next);
    setCurrentPage(1); 
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full min-h-screen bg-section text-foreground">

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar Drawer (Opens from Left) ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] z-50 bg-section border-r border-secondary-400/10
          transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl
          ${mobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-5 border-b border-secondary-400/10 shrink-0">
          <h3 className="font-bold text-lg">Filters</h3>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(false)}
            className="w-9 h-9 rounded-full bg-section-alternative flex items-center justify-center text-description hover:text-foreground transition-colors"
            aria-label="Close filters"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Content (Scrollable) */}
        <div className="p-5 flex-1 overflow-y-auto space-y-6">
          <FilterSidebar filters={filters} onChange={handleFiltersChange} />
        </div>

        {/* Mobile Action Footer */}
        <div className="p-5 border-t border-secondary-400/10 shrink-0 bg-section">
          <button
            type="button"
            onClick={() => {
              clearAll();
              setMobileFiltersOpen(false);
            }}
            className="w-full py-3 rounded-xl border border-primary-500/30 text-primary-500 text-sm font-semibold hover:bg-primary-500/10 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      {/* ── Main Page Layout ── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">

        {/* Top Bar: Search Input & Mobile Filter Toggle */}
        <div className="flex items-center gap-3 mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products..."
            className="flex-1 px-4 py-3.5 rounded-xl border border-secondary-400/10 bg-section-alternative text-sm font-semibold placeholder:text-description/50 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />

          {/* Filter Toggle Button for Mobile Screens */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-3.5 rounded-xl border border-secondary-400/10 font-semibold text-sm shrink-0 bg-section-alternative hover:bg-secondary-400/10 transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="flex gap-8 items-start">

          {/* ── Desktop Inline Left Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0 sticky top-28">
            <div className="bg-section-alternative rounded-2xl p-5 border border-secondary-400/10">
              <h3 className="font-bold text-base mb-4">Filters</h3>
              <FilterSidebar filters={filters} onChange={handleFiltersChange} />
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="w-full py-2.5 rounded-xl border border-primary-500/30 text-primary-500 text-sm font-semibold hover:bg-primary-500/10 transition-colors"
            >
              Clear All Filters
            </button>
          </aside>

          {/* ── Right Content Area (Products Grid) ── */}
          <section className="flex-1 w-full flex flex-col gap-5">

            {/* Results Toolbar Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                All Products{" "}
                <span className="text-description font-normal text-sm">
                  ({pagination?.total ?? 0})
                </span>
              </h2>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortFilterValue);
                  setCurrentPage(1);
                }}
                className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-secondary-400/10 bg-section-alternative outline-none focus:border-primary-500 transition-all hover:cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[3/4] rounded-2xl bg-section-alternative animate-pulse"
                  />
                ))}
              </div>
            )}

            {/* Error state */}
            {!isLoading && isError && (
              <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-section-alternative rounded-3xl border border-secondary-400/5">
                <p className="font-semibold text-description">
                  We couldn't load products right now.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="bg-primary-500 py-3 px-8 rounded-full hover:bg-primary-500/90 text-white font-semibold transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Product Display Grid */}
            {!isLoading && !isError && (
              fetchedProducts.length > 0 ? (
                <>
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10">
                    {fetchedProducts.map((product: IProductListItem) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        slug={product.slug}
                        image={product.images?.[0] ?? ""}
                        name={product.name}
                        subtitle={product.category?.name ?? ""}
                        basePrice={product.price}
                        salePrice={product.salePrice??0}
                        isNew={product.isNew}
                        bgColor="bg-section-alternative"
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="w-full flex justify-center mt-6">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={pagination?.total}
                        itemsPerPage={PRODUCTS_PER_PAGE}
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full flex flex-col items-center justify-center gap-4 py-24 bg-section-alternative rounded-3xl border border-secondary-400/5">
                  <p className="font-semibold text-description">No products match your filters.</p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="bg-primary-500 py-3 px-8 rounded-full hover:bg-primary-500/90 text-white font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )
            )}
          </section>

        </div>
      </main>
    </div>
  );
}