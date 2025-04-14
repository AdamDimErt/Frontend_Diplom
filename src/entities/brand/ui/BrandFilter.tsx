/** @format */
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/entities/brand/api/brandApi";
import styles from "./BrandFilter.module.scss";

type Props = {
  selectedBrand: string | undefined;
  onChange: (brandId?: string) => void;
};

export const BrandFilter = ({
  selectedBrand,
  onChange,
}: Props) => {
  // Получаем список брендов с помощью react-query
  const { data: brands = [], isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  // Состояние для управления кнопкой "Show more / Show less"
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return <p>Загрузка брендов...</p>;

  // Если брендов больше 3 и список не раскрыт, показываем только первые 3
  const visibleBrands = isExpanded
    ? brands
    : brands.slice(0, 3);

  return (
    <div className={styles.brandFilter}>
      {/* Заголовок */}
      <h3 className={styles.title}>BRANDS</h3>

      {/* Список брендов */}
      <ul className={styles.brandList}>
        {visibleBrands.map((brand: any) => {
          // Определяем, выбран ли данный бренд
          const isChecked = selectedBrand === brand.id;
          return (
            <li key={brand.id} className={styles.brandItem}>
              <label className={styles.label}>
                {/* Скрытый нативный input-радио */}
                <input
                  type='radio'
                  checked={isChecked}
                  onChange={() => onChange(brand.id)}
                  className={styles.radio}
                />
                {/* Квадрат с крестиком.
                    Если бренд выбран, добавляем класс checked и выводим символ "X" */}
                <span
                  className={`${styles.checkmark} ${
                    isChecked ? styles.checked : ""
                  }`}
                >
                  {isChecked && "X"}
                </span>
                {/* Название бренда */}
                <span className={styles.brandName}>
                  {brand.name}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Кнопка "Show more / Show less", если брендовых позиций больше трёх */}
      {brands.length > 3 && (
        <button
          className={styles.showMore}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less ▲" : "Show more ▼"}
        </button>
      )}
    </div>
  );
};
