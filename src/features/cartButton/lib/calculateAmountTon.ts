/** @format */

import type { CartItem } from "@/entities/cart/model/types";

export const calculateAmountTon = (
  items: CartItem[],
): number => {
  return items.reduce((acc, item) => {
    return acc + item.product?.priceTon * item.quantity;
  }, 0);
};
