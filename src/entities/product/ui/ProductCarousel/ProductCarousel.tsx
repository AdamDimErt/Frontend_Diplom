/** @format */

"use client";
// Поскольку нам нужна интерактивность (хранение состояния), делаем компонент клиентским

import React, { useState } from "react";
import Image from "next/image";
import styles from "./ProductCarousel.module.scss";


/**
 * Пропсы, описывающие массив ссылок на изображения.
 * Например, ["400x400-1.png", "400x400-2.png", "400x400-3.png"]
 */
interface ProductCarouselProps {
  images: string[];
}

export const ProductCarousel: React.FC<
  ProductCarouselProps
> = ({ images }) => {
  // Храним индекс текущего изображения
  const [currentIndex, setCurrentIndex] = useState(0);

  // Обработчик клика по миниатюре
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Основная фотография */}
      <div className={styles.mainImageContainer}>
        <Image
          src={images[currentIndex]}
          alt={`product-image-${currentIndex}`}
          width={400}
          height={400}
          className={styles.mainImage}
          priority
        />
      </div>

      {/* Миниатюры */}
      <div className={styles.thumbnailsContainer}>
        {images.map((imgSrc, index) => (
          <div
            key={imgSrc}
            onClick={() => handleThumbnailClick(index)}
            className={`${styles.thumbnailWrapper} ${
              index === currentIndex
                ? styles.activeThumbnail
                : ""
            }`}
          >
            <Image
              src={imgSrc}
              alt={`thumbnail-${index}`}
              width={60}
              height={60}
              className={styles.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
