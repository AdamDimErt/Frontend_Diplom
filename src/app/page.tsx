/** @format */

"use client";
import { Product } from "@/entities/productCard/model/types";
import { ProductCard } from "@/entities/productCard/ui/ProductCard";

import styles from "./page.module.css";
import { useTranslations, useLocale } from "next-intl";
import  ProductFilter  from "@/features/productFilter/ui/ProductFilter";

const products: Product[] = [
  {
    id: "1",
    title: "Smart speaker Yandex Station Mini",
    price: 29990,
    description: "Description 1",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Temperature and humidity sensor",
    price: 11990,
    description: "Description 2",
    imageUrl: "",
  },
  {
    id: "3",
    title: "IP Camera Xiaomi Camera 2K",
    price: 13990,
    description: "Description 2",
    imageUrl: "",
  },
  {
    id: "4",
    title: "Router Xiaomi Router AX3000",
    price: 24990,
    description: "Description 2",
    imageUrl: "",
  },
];

export default function Home() {
  const t = useTranslations("Test");
  const locale = useLocale();
  return (
    <div className={styles.page}>
      hi <p>Current locale: {locale}</p>
      <h1>{t("greeting")}</h1>
      <div className={styles.catalogGrid}>
        <ProductFilter />
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
