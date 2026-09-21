export interface SearchFilters {
  categories: string[];
  brands: string[];
  minPrice: string;
  maxPrice: string;
  minRating:number;
  maxRating:number;
  newOnly: boolean;
  onSaleOnly: boolean;
}

export const defaultFilters: SearchFilters = {
  categories: [],
  brands: [],
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  maxRating:5,
  newOnly: false,
  onSaleOnly: false,
};
