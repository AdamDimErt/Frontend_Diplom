
"use client";

import { useProducts } from "@/entities/product/model/useProducts";
import { HomePageView } from "./ui/HomePageView";


export default function HomePage() {
  const { products, isLoading, filters, setFilters } =
    useProducts();

  return (
    <HomePageView
      products={products ?? []}
      isLoading={isLoading}
      setFilters={setFilters}
    />
  );
}
