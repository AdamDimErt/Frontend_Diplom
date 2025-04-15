/** @format */
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addToCart } from "@/entities/cart/api/cartApi";
import { authApi } from "@/features/auth/api/authApi";
import styles from "./ProductActions.module.scss";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

export const ProductActions = ({ productId }: Props) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
  });
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () =>
      addToCart({ userId: user.id, productId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div className={styles.actions}>
      <button
        className={styles.cart}
        onClick={() => mutation.mutate()}
        disabled={!user}
      >
        Добавить в корзину
      </button>
    </div>
  );
};
