/** @format */

"use client";

import { Product } from "../../product/model/types";
import Link from "next/link";
import styles from "./Product.module.scss";
import { Price } from "@/shared/ui/Price/Price";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  return (
    <div className={styles.card}>
      <Link
        href={`/product/${product.id}`}
        className={styles.link}
      >
        <img
          src={product.images[0]}
          alt={product.translations[0].title}
          className={styles.image}
        />
        <div className={styles.info}>
          <p className={styles.title}>
            {product.translations[0].title}
          </p>
          <Price value={product.priceTenge} />
        </div>
      </Link>

      {/* Вне Link */}
      <button className={styles.addButton}>+</button>
    </div>
  );
};
