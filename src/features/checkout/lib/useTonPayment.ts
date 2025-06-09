/** @format */
// src/features/checkout/lib/useTonPayment.ts

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { markOrderPaid } from "@/entities/order/api/orderApi";
import { TON_RECEIVER } from "@/shared/config/ton";
import type { OrderItem } from "@/entities/order/model/types";

/**
 * Хук для оплаты через TON Connect.
 *
 * @param tonRef   — реф на инстанс TonConnectUI
 * @param items    — список позиций заказа
 * @param orderId  — ID заказа в бэке
 */
export const useTonPayment = (
  tonRef: React.RefObject<any>,
  items: OrderItem[] = [],
  orderId?: string,
) => {
  const queryClient = useQueryClient();

  // Если items вдруг undefined — заменяем на пустой массив
  const totalTon = (items ?? []).reduce(
    (sum, item) =>
      sum + item.product.priceTon * item.quantity,
    0,
  );

  const mutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!tonRef.current) {
        throw new Error(
          "TON Connect UI не инициализировано",
        );
      }
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: TON_RECEIVER,
            amount: String(totalTon * 1e9),
          },
        ],
      };
      const result = await tonRef.current.sendTransaction(
        tx,
      );
      if (!result?.boc) {
        throw new Error("Пользователь отменил оплату");
      }
      // Ставим статус заказа — оплачено
      await markOrderPaid({
        orderId: orderId!,
        txHash: result.boc,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      alert("✅ Оплата прошла успешно!");
    },
    onError: (err) => {
      console.warn("❌ Ошибка TON-платежа:", err);
      alert("Ошибка при оплате TON: " + err.message);
    },
  });

  return () => mutation.mutate();
};
