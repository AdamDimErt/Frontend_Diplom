/** @format */
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AiOutlineShoppingCart,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "./Product.module.scss";
import { Price } from "@/shared/ui/Price/Price";
import type { Product } from "@/entities/product/model/types";
import { authApi } from "@/features/auth/api/authApi";
import { addToCart } from "@/entities/cart/api/cartApi";
import { deleteProduct } from "@/entities/product/api/productApi";
import { useFavorite } from "@/entities/favorite/hooks/useFavorite";
import { FavoriteButton } from "@/entities/favorite/ui/FavoriteButton";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
}) => {
  const qc = useQueryClient();

  // 1) Текущий пользователь
  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    retry: false,
  });
  const isAdmin = user?.role?.toUpperCase() === "ADMIN";

  // 2) Мутация: добавить в корзину
  const cartMutation = useMutation({
    mutationFn: () =>
      addToCart({
        userId: user!.id,
        productId: product.id,
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["cart"] }),
  });

  // 3) Мутация: удалить продукт (ADMIN)
  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(product.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      alert("Товар успешно удалён");
    },
  });

  // 4) Избранное
  const {
    isFavorited,
    loading: favLoading,
    add: addFav,
    remove: removeFav,
  } = useFavorite(product.id);
  const toggleFavorite: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorited ? removeFav.mutate() : addFav.mutate();
  };

  // 5) Обработчики
  const handleDelete: React.MouseEventHandler<
    HTMLButtonElement
  > = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Удалить этот товар?")) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className={styles.card}>
      {/* ✏️ Редактировать */}
      {isAdmin && (
        <Link
          href={`/admin/products/${product.id}/edit`}
          className={styles.editButton}
          onClick={(e) => e.stopPropagation()}
        >
          <AiOutlineEdit size={20} />
        </Link>
      )}

      {/* 🗑 Удалить */}
      {isAdmin && (
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          aria-label='Удалить товар'
        >
          <AiOutlineDelete size={20} />
        </button>
      )}

      {/* ❤️ Избранное */}
      {user && (
        <FavoriteButton
          isFavorited={isFavorited}
          onToggle={toggleFavorite}
          disabled={
            favLoading ||
            addFav.isPending ||
            removeFav.isPending
          }
        />
      )}

      {/* Ссылка на страницу товара */}
      <Link
        href={`/product/${product.id}`}
        className={styles.link}
      >
        <img
          src={product.images[0] || "/400x400.png"}
          alt={product.translations[0]?.title || ""}
          className={styles.image}
        />
        <div className={styles.info}>
          <p className={styles.title}>
            {product.translations[0]?.title}
          </p>
          <Price value={product.priceTenge} />
        </div>
      </Link>

      {/* 🛒 Добавить в корзину */}
      <button
        className={styles.addButton}
        onClick={() => cartMutation.mutate()}
        disabled={!user || cartMutation.isPending}
        aria-label='Добавить в корзину'
      >
        <AiOutlineShoppingCart size={20} />
      </button>
    </div>
  );
};
