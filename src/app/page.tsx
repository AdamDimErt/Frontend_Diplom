/** @format */

"use client";
import { Product } from "@/entities/productCard/model/types";
import { ProductCard } from "@/entities/productCard/ui/ProductCard";

import styles from "./page.module.css";
import { useTranslations, useLocale } from "next-intl";

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
    title: "Product 2",
    price: 200,
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
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
}
