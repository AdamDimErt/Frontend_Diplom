/** @format */

"use client";

import { useState } from "react";
import styles from "./CartButton.module.css";
import cartIcon from "../assets/Cart.png";
import { useCartButton } from "../model/useCartButton";
import { CartModal } from "./CartModal";

export const CartButton = () => {
  const [open, setOpen] = useState(false);
  const { items } = useCartButton();

  return (
    <>
      <div
        className={styles.cartIcon}
        onClick={() => setOpen(!open)}
      >
        <img src={cartIcon.src} alt='Cart' />
        {items.length > 0 && (
          <span className={styles.count}>
            {items.length}
          </span>
        )}
      </div>

      {open && <CartModal onClose={() => setOpen(false)} />}
    </>
  );
};
