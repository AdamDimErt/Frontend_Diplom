/** @format */
"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getProductsByLang,
  getFilteredProducts,
} from "@/entities/product/api/productApi";
import styles from "./page.module.css";
import { useTranslations, useLocale } from "next-intl";
import ProductFilter from "@/features/productFilter/ui/ProductFilter";
import { ProductCard } from "@/entities/product/ui/ProductCard";
import { useState } from "react";
import { TonPaymentButton } from "@/features/ton-payment/ui/TonPaymentButton";

export default function Home() {
  const t = useTranslations("Test");
  const locale = useLocale();

  // фильтры состояния
  const [filters, setFilters] = useState<{
    brandId?: string;
    colorIds?: string[];
    minPrice?: number;
    maxPrice?: number;
  }>({});

  const hasActiveFilters = Object.keys(filters).length > 0;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", locale, filters],
    queryFn: () =>
      hasActiveFilters
        ? getFilteredProducts(locale, filters)
        : getProductsByLang(locale),
  });

  if (isLoading) return <div>Загрузка товаров...</div>;

  return (
    <div className={styles.page}>
      <p>testtesttesttesttees</p>
      <p>Current locale: {locale}</p>
      <h1>{t("greeting")}</h1>
      <TonPaymentButton />
      <p>testtesttesttesttees</p>
      <div className={styles.catalogGrid}>
        <ProductFilter onChange={setFilters} />

        <div className={styles.catalogGrid__products}>
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
