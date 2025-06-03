/** @format */

"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getCartItems,
  removeFromCart,
} from "@/entities/cart/api/cartApi";
import { createOrder } from "@/entities/order/api/orderApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { calculateAmountTon } from "../lib/calculateAmountTon";
import { CartItem } from "@/entities/cart/model/types";

export const useCartButton = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const items: CartItem[] = data?.items ?? [];
  const [address, setAddress] = useState(
    "г. Алматы, ул. Абая 15",
  );
  const router = useRouter();
  const queryClient = useQueryClient();

  const amountTon = calculateAmountTon(items);

  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("✅ Заказ создан");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/orders");
    },
    onError: () => toast.error("❌ Ошибка создания заказа"),
  });

  const handleBuy = () => {
    createMutation.mutate({
      shippingAddress: address,
      amountTon,
    });
  };

  return {
    items,
    address,
    setAddress,
    isCreating: createMutation.isPending,
    removeItem: removeMutation.mutate,
    handleBuy,
  };
};
