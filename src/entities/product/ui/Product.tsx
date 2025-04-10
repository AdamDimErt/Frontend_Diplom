/** @format */

"use client";

import React, { useState } from "react";

import { Product } from "../model/types";
import styles from "./Product.module.scss";
import { ProductCarousel } from "./ProductCarousel/ProductCarousel";
import { instrumentSans } from "@/shared/fonts/instrumentSans";
import { Price } from "@/shared/ui/Price/Price";
import { IColorItem } from "@/shared/ui/colors/types/types";
import { ColorPalette } from "@/shared/ui/colors/Colors";
interface ProductCardProps {
  product: Product;
}

const mockColors: IColorItem[] = [
  { code: "#000000", label: "Black" },
  { code: "#C0C0C0", label: "Silver" },
  { code: "#A0522D", label: "Brown" },
  { code: "#008000", label: "Green" },
];

const images = [
  "/400x400.png", // первая картинка
  "/400x400.png", // вторая
  "/400x400.png",
  "/400x400.png", // третья
  // ...и т.д.
];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const {
    title,
    price,
    currency,
    description,
    imageSrc,
    specs,
    colors,
  } = product;

  const [selectedColor, setSelectedColor] =
    useState<string>("");

  const handleColorClick = (colorCode: string) => {
    setSelectedColor(colorCode);
    // Можно что-то еще сделать, например добавить в стейт товара
  };

  return (
    <div
      className={`${styles.card} ${instrumentSans.className}`}
    >
      <div className={styles.carouselSection}>
        <ProductCarousel images={images} />
      </div>
      <div
        className={`${styles.infoWrapper} ${instrumentSans.className}`}
      >
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>
          <Price value={price} /> ₸
          <Price value={price} /> ₸
        </div>

        <div className={styles.colorsWrapper}>
          <h2>White</h2>
          <ColorPalette
            colors={mockColors}
            selectedColor={selectedColor}
            onColorClick={handleColorClick}
          />
        </div>

        <div className={styles.specsWrapper}>
          <h2>Specifications:</h2>
          <p>Разъёмы: {specs.connectors}</p>
          <p>Диапазон частот: {specs.frequencyRange}</p>
          <p>Мощность динамика: {specs.speakerPower} Вт</p>
        </div>

        <button className={styles.buyButton}>
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};
