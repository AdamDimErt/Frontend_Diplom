// src/entities/product/model/useProductsByCategory.ts
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/productApi";
import type { Product } from "./types";

export function useProductsByCategory(categoryId?: string) {
  return useQuery<Product[], Error>({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId!),
    enabled: Boolean(categoryId),
    staleTime: 5 * 60_000,
  });
}
