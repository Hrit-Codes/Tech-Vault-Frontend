import { useMemo, useState, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../../Components/Product/ProductCard";
import FilterSidebar from "../../Components/Search/FilterSidebar";
import { defaultFilters, type SearchFilters } from "../../Components/Search/searchFilters";
import { searchProducts } from "../../configs/constants";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // Prevent body scrolling when mobile sidebar overlay is active
  useEffect(() => {
    if (mobileFiltersOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let results = searchProducts.filter((product) => {
      const matchesQuery =
        normalizedQuery === "" ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.subtitle.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        filters.categories.length === 0 || filters.categories.includes(product.category);

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand);

      const matchesMinPrice = filters.minPrice === "" || product.price >= Number(filters.minPrice);
      const matchesMaxPrice = filters.maxPrice === "" || product.price <= Number(filters.maxPrice);

      const matchesRating = filters.minRating === 0 || product.rating >= filters.minRating;

      const matchesNew = !filters.newOnly || product.isNew;
      const matchesSale = !filters.onSaleOnly || product.onSale;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesBrand &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesNew &&
        matchesSale
      );
    });

    if (sortBy === "newest") results = [...results].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    if (sortBy === "price-asc") results = [...results].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") results = [...results].sort((a, b) => b.price - a.price);

    return results;
  }, [query, filters, sortBy]);

  const clearAll = () => {
    setFilters(defaultFilters);
    setQuery("");
    setSortBy("newest");
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
          <FilterSidebar filters={filters} onChange={setFilters} />
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
              <FilterSidebar filters={filters} onChange={setFilters} />
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
                  ({filteredProducts.length})
                </span>
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm font-semibold px-4 py-2.5 rounded-xl border border-secondary-400/10 bg-section-alternative outline-none focus:border-primary-500 transition-all hover:cursor-pointer"
              >
                <option value="newest">Sort by: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Product Display Grid */}
            {filteredProducts.length > 0 ? (
              <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-10">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    image={product.image}
                    name={product.name}
                    subtitle={product.subtitle}
                    price={product.price}
                    isNew={product.isNew}
                    bgColor="bg-section-alternative"
                  />
                ))}
              </div>
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
            )}
          </section>

        </div>
      </main>
    </div>
  );
}