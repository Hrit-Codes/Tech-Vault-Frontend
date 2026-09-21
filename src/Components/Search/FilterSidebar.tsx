import { Check, Star } from "lucide-react";
import { defaultFilters, type SearchFilters } from "./searchFilters";
import { getBrands } from "../../apis/modules/brands";
import { getCategories} from "../../apis/modules/categories";
import { useQuery } from "@tanstack/react-query";
import FilterSidebarSkeleton from "./FilterSidebarSkeleton";

interface FilterSidebarProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

function FilterCheckbox({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer group">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors hover:cursor-pointer ${
          checked
            ? "bg-primary-500 border-primary-500"
            : "border-secondary-400/20 group-hover:border-primary-400"
        }`}
      >
        {checked && <Check size={13} strokeWidth={3} className="text-white" />}
      </button>
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
}

const ratingOptions = [4, 3, 2, 1];

export default function FilterSidebar({ filters, onChange }: FilterSidebarProps) {

  const {
    data:categoriesResponse,
    isLoading:isCategoriesLoading,
    isError:isCategoriesError
  }=useQuery({
    queryKey:["categories"],
    queryFn:()=>getCategories(),
    staleTime:10*60*1000,
    refetchOnWindowFocus:false,
    retry:2
  });
  
  const {
    data:brandsResponse,
    isLoading:isBrandsLoading,
    isError:isBrandsError
  }=useQuery({
    queryKey:["brands"],
    queryFn:()=>getBrands(),
    staleTime:10*60*1000,
    refetchOnWindowFocus:false,
    retry:2,
  })
  
  const brands=brandsResponse?.data.data ?? [];
  const categories=categoriesResponse?.data.data ?? [];

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.brands.length > 0 ||
    filters.minPrice !== "" ||
    filters.maxPrice !== "" ||
    filters.minRating > 0 ||
    filters.newOnly ||
    filters.onSaleOnly;
  const toggleCategory = (category: string) => {
    const next = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  if(isCategoriesLoading || isBrandsLoading){
    return <FilterSidebarSkeleton/>
  }

  if (isCategoriesError || isBrandsError) {
  return (
    <aside className="w-full bg-section rounded-3xl border border-secondary-400/5 shadow-sm p-6">
      <p className="text-sm text-description font-semibold">
        Filters are temporarily unavailable.
      </p>
    </aside>
  );
}

  return (
    <aside className="w-full bg-section rounded-3xl border border-secondary-400/5 shadow-sm p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            className="text-xs font-bold text-secondary-500 hover:text-secondary-600 hover:cursor-pointer transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1 pb-6 border-b border-secondary-400/10">
        <h4 className="font-bold text-sm mb-2">Category</h4>
        {categories.map((category) => (
          <FilterCheckbox
            key={category.id}
            label={category.name}
            checked={filters.categories.includes(category.slug)}
            onToggle={() => toggleCategory(category.slug)}
          />
        ))}
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-1 pb-6 border-b border-secondary-400/10">
        <h4 className="font-bold text-sm mb-2">Brand</h4>
        {brands.map((brand) => (
          <FilterCheckbox
            key={brand.id}
            label={brand.name}
            checked={filters.brands.includes(brand.slug)}
            onToggle={() => toggleBrand(brand.slug)}
          />
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3 pb-6 border-b border-secondary-400/10">
        <h4 className="font-bold text-sm">Price Range</h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
          <span className="text-description font-semibold">-</span>
          <input
            type="number"
            min={0}
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-secondary-400/10 bg-transparent text-sm placeholder:text-description/50 font-semibold outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex flex-col gap-3 pb-6 border-b border-secondary-400/10">
        <h4 className="font-bold text-sm">Rating</h4>

        {/* Min rating row — existing "& up" pattern, now labelled clearly */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-description">
            Minimum
          </span>
          {ratingOptions.map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() =>
                onChange({
                  ...filters,
                  // Clicking the same rating deselects → back to "any"
                  minRating: filters.minRating === rating ? 0 : rating,
                  // Safety: if the new min exceeds max, push max up to match
                  maxRating:
                    filters.minRating === rating
                      ? filters.maxRating
                      : Math.max(filters.maxRating, rating),
                })
              }
              className={`flex items-center gap-2 py-1.5 rounded-lg text-sm font-semibold transition-colors hover:cursor-pointer ${
                filters.minRating === rating
                  ? "text-primary-500"
                  : "hover:text-primary-400"
              }`}
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < rating
                        ? "fill-secondary-500 text-secondary-500"
                        : "fill-secondary-300/30 text-secondary-300/30"
                    }
                  />
                ))}
              </span>
              <span>&amp; Up</span>
            </button>
          ))}
        </div>

        {/* Max rating — only meaningful if a min is selected */}
        {filters.minRating > 0 && (
          <div className="flex flex-col gap-1 mt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-description">
              Maximum
            </span>
            <div className="flex flex-wrap gap-2">
              {[filters.minRating, 2, 3, 4, 5]
                .filter((v, i, arr) => v >= filters.minRating && arr.indexOf(v) === i)
                .map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      onChange({ ...filters, maxRating: rating })
                    }
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors hover:cursor-pointer ${
                      filters.maxRating === rating
                        ? "border-primary-500 bg-primary-500/10 text-primary-500"
                        : "border-secondary-400/20 text-description hover:border-primary-400"
                    }`}
                  >
                    {rating === 5 ? "Any" : `≤ ${rating}★`}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Offers
      <div className="flex flex-col gap-1">
        <h4 className="font-bold text-sm mb-2">Available Offers</h4>
        <FilterCheckbox
          label="On Sale"
          checked={filters.onSaleOnly}
          onToggle={() => onChange({ ...filters, onSaleOnly: !filters.onSaleOnly })}
        />
      </div> */}
    </aside>
  );
}
