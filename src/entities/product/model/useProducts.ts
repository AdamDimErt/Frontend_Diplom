/** @format */

import { useQuery } from "@tanstack/react-query";
import {
  getFilteredProducts,
  getProductsByLang,
} from "@/entities/product/api/productApi";
import { useLocale } from "next-intl";
import { useState } from "react";

export function useProducts() {
  const locale = useLocale();
  const [filters, setFilters] = useState({});

  const hasActiveFilters = Object.keys(filters).length > 0;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", locale, filters],
    queryFn: () =>
      hasActiveFilters
        ? getFilteredProducts(locale, filters)
        : getProductsByLang(locale),
  });

  return { products, isLoading, filters, setFilters };
}
