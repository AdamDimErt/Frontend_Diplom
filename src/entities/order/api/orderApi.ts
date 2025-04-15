/** @format */

import axiosInstance from "@/shared/api/axiosInstance";

export const getMyOrders = async () => {
  const res = await axiosInstance.get("/orders/my");
  return res.data;
};

export const createOrder = async (data: {
  shippingAddress: string;
  amountTon: number;
}) => {
  const res = await axiosInstance.post(
    "/orders/create",
    data,
  );
  return res.data;
};

export const increaseOrderItem = async (itemId: string) => {
  const res = await axiosInstance.patch(
    "/orders/increase",
    { itemId },
  );
  return res.data;
};

export const decreaseOrderItem = async (itemId: string) => {
  const res = await axiosInstance.patch(
    "/orders/decrease",
    { itemId },
  );
  return res.data;
};

export const removeOrderItem = async (itemId: string) => {
  const res = await axiosInstance.delete(
    `/orders/item/${itemId}`,
  );
  return res.data;
};

export const clearOrder = async (orderId: string) => {
  const res = await axiosInstance.delete(
    `/orders/clear/${orderId}`,
  );
  return res.data;
};
export const markOrderPaid = async (data: {
  orderId: string;
  txHash: string;
}) => {
  const res = await axiosInstance.post("/orders/pay", data);
  return res.data;
};
