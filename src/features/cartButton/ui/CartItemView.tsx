/** @format */

import styles from "./CartButton.module.css";
import { useCartButton } from "../model/useCartButton";
import type { CartItem } from "@/entities/cart/model/types";

interface Props {
  item: CartItem;
}

export const CartItemView = ({ item }: Props) => {
  const { removeItem } = useCartButton();

  return (
    <div className={styles.item}>
      <img
        src={item.product?.images?.[0]}
        alt={item.product?.translations?.[0]?.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <p className={styles.title}>
          {item.product?.translations?.[0]?.title}
        </p>
        <p className={styles.price}>
          {item.quantity} × {item.product?.priceTenge} ₸
        </p>
      </div>
      <button
        className={styles.remove}
        onClick={() => removeItem(item.id)}
      >
        ✕
      </button>
    </div>
  );
};
