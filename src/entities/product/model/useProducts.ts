/** @format */

// src/entities/product/model/useProducts.ts
import { useState } from "react";
import { useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import {
  getFilteredProducts,
  getProductsByCategory,
} from "@/entities/product/api/productApi";
import type { Product } from "./types";

export function useProducts() {
  const locale = useLocale();

  // хранит только categoryId
  const [filters, setFiltersState] = useState<{
    categoryId?: string;
  }>({});

  const setFilters = (newFilter: {
    categoryId?: string;
  }) => {
    setFiltersState(newFilter);
  };

  // выбор функции запроса в зависимости от наличия categoryId
  const queryFn = () => {
    if (filters.categoryId) {
      // если выбрана категория — получаем товары из неё
      return getProductsByCategory(filters.categoryId);
    }
    // иначе — общий фильтр (search, brand, price и т.п.)
    return getFilteredProducts(locale, {
      // здесь можно прокинуть и другие фильтры, если добавите
      // в интерфейс getFilteredProducts
    });
  };

  const { data: products = [], isLoading } = useQuery<
    Product[],
    Error
  >({
    queryKey: ["products", locale, filters.categoryId],
    queryFn,
    staleTime: 5 * 60_000,
  });

  return { products, isLoading, setFilters };
}
