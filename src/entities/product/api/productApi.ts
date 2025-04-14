/** @format */

// src/entities/product/api/productApi.ts
import axiosInstance from "@/shared/api/axiosInstance";
import { Product } from "../model/types";
import { useLocale } from "next-intl";

export const getProducts = async (): Promise<Product[]> => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const getProductsByLang = async (
  locale: string,
): Promise<Product[]> => {
  const res = await axiosInstance.get(
    `/products/lang?language=${locale.toUpperCase()}`,
  );
  return res.data;
};

export const getProductById = async (
  id: string,
): Promise<Product> => {
  const res = await fetch(
    `http://localhost:4000/products/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
};
export const getFilteredProducts = async (
  locale: string,
  filters: {
    brandId?: string;
    colorIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  },
): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (filters.brandId)
    params.append("brandId", filters.brandId);
  if (filters.colorIds?.length)
    params.append("colorIds", filters.colorIds.join(","));
  if (filters.minPrice)
    params.append("minPrice", filters.minPrice.toString());
  if (filters.maxPrice)
    params.append("maxPrice", filters.maxPrice.toString());
  if (filters.search)
    params.append("search", filters.search);
  params.append("language", locale.toUpperCase());

  const res = await axiosInstance.get(`/products`, {
    params,
  });

  return res.data;
};
