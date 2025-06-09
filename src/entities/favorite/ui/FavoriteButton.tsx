/** @format */
// src/entities/favorite/ui/FavoriteButton.tsx
"use client";

import React, { FC, MouseEventHandler } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import styles from "./FavoriteButton.module.css";

interface Props {
  /** true, если товар уже в избранном */
  isFavorited: boolean;
  /** обработчик клика — принимает событие */
  onToggle: MouseEventHandler<HTMLButtonElement>;
  /** блокировать кнопку (во время загрузки) */
  disabled?: boolean;
}

export const FavoriteButton: FC<Props> = ({
  isFavorited,
  onToggle,
  disabled = false,
}) => (
  <button
    className={styles.button}
    onClick={onToggle}
    disabled={disabled}
    aria-label={
      isFavorited
        ? "Удалить из избранного"
        : "Добавить в избранное"
    }
  >
    {isFavorited ? (
      <AiFillHeart size={24} color='#e74c3c' />
    ) : (
      <AiOutlineHeart size={24} color='#e74c3c' />
    )}
  </button>
);
