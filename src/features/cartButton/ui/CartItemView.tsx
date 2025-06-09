/** @format */

// src/features/cart/ui/CartItemView.tsx

import styles from "./CartButton.module.css";
import type { CartItem } from "@/entities/cart/model/types";

interface Props {
  item: CartItem;
  onRemove: () => void;
}

export const CartItemView = ({ item, onRemove }: Props) => {
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
      <button className={styles.remove} onClick={onRemove}>
        ✕
      </button>
    </div>
  );
};
