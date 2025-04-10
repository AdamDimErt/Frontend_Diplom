/** @format */

export interface ProductFilterProps {
  onFilterChange?: (filters: {
    minPrice: number;
    maxPrice: number;
    brands: string[];
    colors: string[];
  }) => void;
}
