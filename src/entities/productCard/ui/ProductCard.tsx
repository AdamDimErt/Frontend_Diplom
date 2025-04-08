/** @format */

// entities/product/ui/ProductCard/ProductCard.tsx
"use client";

import { FC } from "react";
import { useRouter } from "next/navigation"; // вместо 'next/router'
import { Product } from "../model/types";
import styles from "./ProductCard.module.scss";
import { instrumentSans } from "@/shared/fonts/instrumentSans";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: FC<ProductCardProps> = ({
  product,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div
      className={`${styles.cart} ${instrumentSans.className}`}
      onClick={handleClick}
    >
      <img
        src={product.imageUrl || "/400x400.png"}
        alt={product.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "/400x400.png";
        }}
      />
      <p className={styles.cart__title}>{product.title}</p>
      <p className={styles.cart__price}>
        {product.price} ₸
      </p>
      <button>Add to cart</button>
    </div>
  );
};
