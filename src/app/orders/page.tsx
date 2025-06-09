/** @format */

// src/app/orders/page.tsx

"use client";

import React, { useMemo, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getMyOrders } from "@/entities/order/api/orderApi";
import type {
  Order,
  OrderItem,
} from "@/entities/order/model/types";

import { useCheckout } from "@/features/checkout/model/useCheckout";
import { useCheckoutMutations } from "@/features/checkout/model/useCheckoutMutations";

import styles from "./Checkout.module.css";

export default function OrdersPage() {
  const t = useTranslations("checkout");

  // 1. Загружаем заказы
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  // 2. Берём последний заказ
  const latestOrder = useMemo(() => orders?.[0], [orders]);

  // 3. Получаем items или пустой массив
  const items: OrderItem[] = latestOrder?.items ?? [];

  // 4. Хуки для цвета и оплаты
  const {
    itemColors,
    setItemColor,
    paymentMethod,
    setPaymentMethod,
  } = useCheckout();

  // 5. Мутации для изменения корзины
  const { increase, decrease, remove, clear } =
    useCheckoutMutations(latestOrder?.id);

  // 6. Устанавливаем дефолтный цвет по name
  useEffect(() => {
    if (!latestOrder) return;

    latestOrder.items.forEach((item) => {
      // Берём массив имён цветов
      const colors: string[] = Array.isArray(
        item.product.colors,
      )
        ? item.product.colors.map((c) => c.name)
        : [];

      const defaultColor =
        colors.length > 0 ? colors[0] : "white";

      if (itemColors[item.id] == null) {
        setItemColor(item.id, defaultColor);
      }
    });
  }, [latestOrder, itemColors, setItemColor]);

  if (isLoading) {
    return (
      <div className={styles.loader}>{t("loading")}</div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>{error.message}</div>
    );
  }

  return (
    <div className={styles.checkout}>
      <h2 className={styles.title}>{t("title")}</h2>

      {items.length === 0 ? (
        <p className={styles.emptyCart}>{t("empty")}</p>
      ) : (
        <>
          {items.map((item) => {
            // 7. Приводим к строкам через c.name
            const colors: string[] = Array.isArray(
              item.product.colors,
            )
              ? item.product.colors.map((c) => c.name)
              : [];
            const finalColors =
              colors.length > 0 ? colors : ["white"];

            return (
              <div key={item.id} className={styles.item}>
                <img
                  src={item.product.images[0]}
                  alt={item.product.translations[0].title}
                  className={styles.image}
                />

                <div className={styles.info}>
                  <p className={styles.name}>
                    {item.product.translations[0].title}
                  </p>

                  {/* выбор цвета */}
                  <label className={styles.colorLabel}>
                    <span>{t("color")}:</span>
                    <select
                      value={
                        itemColors[item.id] ??
                        finalColors[0]
                      }
                      onChange={(e) =>
                        setItemColor(
                          item.id,
                          e.target.value,
                        )
                      }
                      className={styles.select}
                    >
                      {finalColors.map((cv) => (
                        <option key={cv} value={cv}>
                          {cv.charAt(0).toUpperCase() +
                            cv.slice(1)}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className={styles.price}>
                    {item.product.priceTenge} ₸
                  </div>

                  <div className={styles.controls}>
                    <button
                      onClick={() =>
                        decrease.mutate(item.id)
                      }
                      className={styles.qtyBtn}
                    >
                      −
                    </button>
                    <span className={styles.qty}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        increase.mutate(item.id)
                      }
                      className={styles.qtyBtn}
                    >
                      +
                    </button>
                    <button
                      onClick={() => remove.mutate(item.id)}
                      className={styles.removeBtn}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div
            className={styles.clearAll}
            onClick={() => clear.mutate()}
          >
            {t("removeAll")}
          </div>

          {/* выбор метода оплаты */}
          <div className={styles.paymentMethod}>
            <label>
              <span>{t("paymentMethod")}:</span>
              <select
                value={paymentMethod}
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value as "stripe" | "ton",
                  )
                }
                className={styles.select}
              >
                <option value='stripe'>
                  {t("paymentCard")}
                </option>
                <option value='ton'>{t("ton")}</option>
              </select>
            </label>
          </div>

          <div className={styles.nextStep}>
            <Link href='/orders/address'>
              <button className={styles.nextButton}>
                {t("nextToAddress")}
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
