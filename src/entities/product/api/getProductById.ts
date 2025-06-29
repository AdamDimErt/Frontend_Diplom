/** @format */

// 📄 Файл: src/entities/product/model/useProducts.ts

import { useQuery } from "@tanstack/react-query";
import {
  getFilteredProducts,
  getProductsByLang,
} from "@/entities/product/api/productApi";
import { useLocale } from "next-intl";
import { useState } from "react";
import type { Product } from "../model/types";

type Filters = {
  brandId?: string;
  colorIds?: string[];
  minPrice?: number;
  maxPrice?: number;
};

export function useProducts() {
  const locale = useLocale();
  const [filters, setFilters] = useState<Filters>({});

  const hasActiveFilters = Object.keys(filters).length > 0;

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products", locale, filters],
    queryFn: () =>
      hasActiveFilters
        ? getFilteredProducts(locale, filters)
        : getProductsByLang(locale),
  });

  return {
    products: data ?? [],
    isLoading,
    filters,
    setFilters,
  };
}
