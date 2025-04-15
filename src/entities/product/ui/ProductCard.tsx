/** @format */

"use client";

import Link from "next/link";
import styles from "./Product.module.scss";
import { Price } from "@/shared/ui/Price/Price";
import { Product } from "../../product/model/types";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { addToCart } from "@/entities/cart/api/cartApi";

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
  });

  const mutation = useMutation({
    mutationFn: () =>
      addToCart({ userId: user.id, productId: product.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

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

      <button
        className={styles.addButton}
        onClick={() => mutation.mutate()}
        disabled={!user}
      >
        +
      </button>
    </div>
  );
};
