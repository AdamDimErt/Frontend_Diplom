/** @format */
// src/app/ui/HomePageView.tsx
"use client";

import React from "react";
import styles from "../page.module.css";
import { MainHero } from "@/features/mainHero/MainHero";
import { CategoryTabs } from "@/features/categoryTabs/ui/CategoryTabs";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import type { Product } from "@/entities/product/model/types";

interface HomePageViewProps {
  products: Product[];
  isLoading: boolean;
  setCategoryFilter: (filter: {
    categoryId?: string;
  }) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  products,
  isLoading,
  setCategoryFilter,
}) => (
  <div className={styles.page}>
    <MainHero />

    <CategoryTabs
      onChange={(id) =>
        setCategoryFilter({ categoryId: id })
      }
    />

    <div className={styles.catalogGridProducts}>
      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))
      )}
    </div>
  </div>
);
