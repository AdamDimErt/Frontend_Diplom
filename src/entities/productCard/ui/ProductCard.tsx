/** @format */

// entities/product/ui/ProductCard/ProductCard.tsx
"use client";

import { FC } from "react";
import { useRouter } from "next/navigation"; // вместо 'next/router'
import { Product } from "../model/types";
import styles from "./ProductCard.module.scss";
import { instrumentSans } from "@/shared/fonts/instrumentSans";
import { Price } from "@/shared/ui/Price/Price";

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
      <Price value={product.price} />
      <button className={styles.plusButton}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 4v16m8-8H4'
          />
        </svg>
      </button>
    </div>
  );
};
