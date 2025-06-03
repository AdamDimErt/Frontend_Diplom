/** @format */

import { useQueryClient } from "@tanstack/react-query";
import { markOrderPaid } from "@/entities/order/api/orderApi";
import { TON_RECEIVER } from "@/shared/config/ton";
import type { OrderItem } from "@/entities/order/model/types";

export const useTonPayment = (
  tonRef: any,
  items: OrderItem[],
  orderId?: string,
) => {
  const queryClient = useQueryClient();

  const totalTon = items.reduce(
    (acc, item) =>
      acc + item.product.priceTon * item.quantity,
    0,
  );

  return async () => {
    try {
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: TON_RECEIVER,
            amount: String(totalTon * 1e9),
          },
        ],
      };

      const result = await tonRef.current?.sendTransaction(
        tx,
      );

      if (result?.boc) {
        await markOrderPaid({
          orderId: orderId!,
          txHash: result.boc,
        });
        queryClient.invalidateQueries({
          queryKey: ["orders"],
        });
        alert("✅ Оплата прошла успешно!");
      } else {
        console.log("🟡 Пользователь отменил оплату.");
      }
    } catch (error: any) {
      console.warn("❌ TON Connect ошибка:", error.message);
    }
  };
};
