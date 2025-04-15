/** @format */

// src/entities/cart/api/cartApi.ts
import axiosInstance from "@/shared/api/axiosInstance";

export const addToCart = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const res = await axiosInstance.post("/cart/add", {
    userId,
    productId,
  });
  return res.data;
};

export const getCartItems = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data;
};

export const removeFromCart = async (
  cartItemId: string,
) => {
  const res = await axiosInstance.delete(`/cart/remove`, {
    params: { cartItemId },
  });
  return res.data;
};
