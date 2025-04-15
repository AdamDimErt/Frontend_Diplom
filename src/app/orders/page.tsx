/** @format */

"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getMyOrders,
  increaseOrderItem,
  decreaseOrderItem,
  removeOrderItem,
  clearOrder,
  markOrderPaid,
} from "@/entities/order/api/orderApi";

import styles from "./Checkout.module.css";
import { useEffect, useMemo, useRef } from "react";
import { TonConnectUI } from "@tonconnect/ui";

import TonImg from "./assets/Ton.png";
import TrashImg from "./assets/trash.png";

export default function CheckoutPage() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  const latestOrder = useMemo(() => data?.[0], [data]);
  const items = latestOrder?.items ?? [];

  const tonConnectRef = useRef<TonConnectUI | null>(null);

  useEffect(() => {
    const init = () => {
      const rootExists =
        document.getElementById("ton-connect");

      if (rootExists && !tonConnectRef.current) {
        try {
          tonConnectRef.current = new TonConnectUI({
            manifestUrl:
              "https://frontend-diplom-sss5.vercel.app/tonconnect-manifest.json",
            buttonRootId: "ton-connect",
          });
        } catch (error) {
          console.warn(
            "⚠️ TonConnectUI уже инициализирован или произошла ошибка:",
            error,
          );
        }
      } else if (!rootExists) {
        // 🔁 Если элемент не найден — повторим попытку через 100ms
        setTimeout(init, 100);
      }
    };

    init();
  }, []);

  const increase = useMutation({
    mutationFn: increaseOrderItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),
  });

  const decrease = useMutation({
    mutationFn: decreaseOrderItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),
  });

  const remove = useMutation({
    mutationFn: removeOrderItem,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),
  });

  const clear = useMutation({
    mutationFn: () => clearOrder(latestOrder?.id),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      }),
  });

  const totalPrice = items.reduce(
    (acc: number, item: any) =>
      acc + item.product.priceTenge * item.quantity,
    0,
  );

  const totalTon = items.reduce(
    (acc: number, item: any) =>
      acc + item.product.priceTon * item.quantity,
    0,
  );

  if (!latestOrder)
    return (
      <div className={styles.checkout}>Загрузка...</div>
    );

  return (
    <div className={styles.checkout}>
      <h2>Оформление заказа</h2>

      {latestOrder.status === "paid" && (
        <div className={styles.successText}>
          ✅ Заказ оплачен
        </div>
      )}

      {items.length === 0 ? (
        <p className={styles.emptyCart}>🛒 Товаров нет</p>
      ) : (
        <>
          {items.map((item: any) => (
            <div className={styles.item} key={item.id}>
              <img
                src={item.product.images[0]}
                className={styles.image}
                alt={item.product.translations[0].title}
              />
              <div className={styles.info}>
                <p className={styles.name}>
                  {item.product.translations[0].title}
                </p>
                <div className={styles.priceBlock}>
                  <span>{item.product.priceTenge} ₸</span>
                  <span>
                    {item.product.priceTon}{" "}
                    <img
                      src={TonImg.src}
                      className={styles.ton}
                      alt='TON'
                    />
                  </span>
                </div>
                <div className={styles.details}>
                  <span>🎨 Белый</span>
                  <span>🚚 Завтра</span>
                </div>
              </div>
              <div className={styles.qty}>
                <button
                  onClick={() => decrease.mutate(item.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increase.mutate(item.id)}
                >
                  +
                </button>
              </div>
              <div
                className={styles.trash}
                onClick={() => remove.mutate(item.id)}
              >
                <img src={TrashImg.src} alt='удалить' />
              </div>
            </div>
          ))}

          <div className={styles.totalRow}>
            <strong>Итого:</strong>
            <span>
              {totalPrice} ₸ /{" "}
              <b>
                {totalTon}{" "}
                <img
                  className={styles.ton}
                  src={TonImg.src}
                  alt='TON'
                />
              </b>
            </span>
          </div>

          <div
            className={styles.removeAll}
            onClick={() => clear.mutate()}
          >
            Remove all
          </div>

          <div id='ton-connect' style={{ marginTop: 16 }} />

          <button
            className={styles.checkoutButton}
            onClick={async () => {
              try {
                const tx = {
                  validUntil:
                    Math.floor(Date.now() / 1000) + 600,
                  messages: [
                    {
                      address:
                        "UQAM7IgIUQqUohQ2YFE75JGdiV7ZtXhcBD_NAzZAnARFZZGm",
                      amount: String(100000000),
                      // amount: String(totalTon * 1e9),
                    },
                  ],
                };

                const result =
                  await tonConnectRef.current?.sendTransaction(
                    tx,
                  );

                if (result?.boc) {
                  await markOrderPaid({
                    orderId: latestOrder.id,
                    txHash: result.boc,
                  });

                  queryClient.invalidateQueries({
                    queryKey: ["orders"],
                  });

                  alert("✅ Оплата прошла успешно!");
                } else {
                  console.log(
                    "🟡 Пользователь отменил оплату.",
                  );
                }
              } catch (error: any) {
                console.warn(
                  "❌ TON Connect ошибка:",
                  error.message,
                );
              }
            }}
          >
            Оплатить через TON
          </button>
        </>
      )}
    </div>
  );
}
