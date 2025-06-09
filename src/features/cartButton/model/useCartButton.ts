/** @format */

// src/features/cart/model/useCartButton.tsx

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
  // 1. Получаем текущие товары в корзине
  const { data, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
  });

  const items: CartItem[] = data?.items ?? [];

  // 2. Состояние адреса доставки
  const [address, setAddress] = useState<string>("");

  const router = useRouter();
  const queryClient = useQueryClient();

  // 3. Рассчитываем сумму в TON (если нужно для API)
  const amountTon = calculateAmountTon(items);

  // 4. Мутация удаления из корзины
  const removeMutation = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  // 5. Мутация создания заказа
  //    Но НЕ вызываем ее автоматически — expose createOrderFn для вызова на финальном шаге
  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("✅ Заказ создан");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/orders");
    },
    onError: () => toast.error("❌ Ошибка создания заказа"),
  });

  // Функция для вызова создания заказа (будет использована на этапе оплаты)
  const createOrderFn = () => {
    createMutation.mutate({
      shippingAddress: address,
      amountTon,
    });
  };

  return {
    items, // товары в корзине
    isLoading, // флаг загрузки корзины
    address, // текущий введённый адрес
    setAddress, // сеттер для адреса
    removeItem: removeMutation.mutate, // удаление товара
    createOrder: createOrderFn, // вызов заказа (на финальном шаге)
    isCreating: createMutation.isPending, // флаг создания заказа
  };
};
