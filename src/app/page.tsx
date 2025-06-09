/** @format */
// src/app/page.tsx
"use client";

import React from "react";
import { useProducts } from "@/entities/product/model/useProducts";
import { HomePageView } from "./ui/HomePageView";

export default function HomePage() {
  const { products, isLoading, setFilters } = useProducts();

  return (
    <HomePageView
      products={products}
      isLoading={isLoading}
      setCategoryFilter={setFilters}
    />
  );
}
