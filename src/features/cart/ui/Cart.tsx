/** @format */

import React from "react";
import Image from "next/image";
import ShoppingCart from "@/shared/assets/icons/ShoppingCart.png";
import styles from "./Cart.module.scss";

const Cart = () => {
  return (
    <div className={styles.cart}>
      <Image
        src={ShoppingCart}
        alt='ShoppingCart'
        fill
        sizes='(max-width: 50px) 50px'
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default Cart;
