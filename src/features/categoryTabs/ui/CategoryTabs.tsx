/** @format */
// src/features/categoryTabs/ui/CategoryTabs.tsx
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCategories,
  ICategory,
} from "@/entities/category/api/categoryApi";
import styles from "./CategoryTabs.module.scss";

interface Props {
  /** id категории или undefined для «Все» */
  onChange: (categoryId?: string) => void;
}

export const CategoryTabs: React.FC<Props> = ({
  onChange,
}) => {
  const { data: cats = [], isLoading } = useQuery<
    ICategory[],
    Error
  >({
    queryKey: ["categories"],
    // ОБЕРНУЛИ в лямбду, чтобы не принимать контекст
    queryFn: () => getCategories(),
    staleTime: 5 * 60_000,
  });

  const [active, setActive] = useState<string | undefined>(
    undefined,
  );

  const handleClick = (id?: string) => {
    setActive(id);
    onChange(id); // передаём простую строку
  };

  return (
    <div className={styles.tabs}>
      <button
        className={`${styles.tab} ${
          active === undefined ? styles.active : ""
        }`}
        onClick={() => handleClick(undefined)}
      >
        Все
      </button>

      {isLoading ? (
        <span className={styles.loading}>Загрузка…</span>
      ) : (
        cats.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.tab} ${
              active === cat.id ? styles.active : ""
            }`}
            onClick={() => handleClick(cat.id)}
          >
            {cat.name}
          </button>
        ))
      )}
    </div>
  );
};
