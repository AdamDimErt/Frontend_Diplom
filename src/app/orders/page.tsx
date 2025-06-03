/** @format */

"use client";

import styles from "./Checkout.module.css";
import TrashImg from "./assets/trash.png";
import TonImg from "./assets/Ton.png";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { getMyOrders } from "@/entities/order/api/orderApi";
import { useTonConnect } from "@/features/checkout/lib/useTonConnect";
import { useTonPayment } from "@/features/checkout/lib/useTonPayment";
import { useCheckoutMutations } from "@/features/checkout/model/useCheckoutMutations";
import { OrderItem } from "@/entities/order/model/types";

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  const latestOrder = useMemo(() => data?.[0], [data]);
  const items = latestOrder?.items ?? [];

  const tonRef = useTonConnect();
  const pay = useTonPayment(tonRef, items, latestOrder?.id);

  const { increase, decrease, remove, clear } =
    useCheckoutMutations(latestOrder?.id);

  const totalPrice = items.reduce(
    (acc: number, item: OrderItem) =>
      acc + item.product.priceTenge * item.quantity,
    0,
  );

  const totalTon = items.reduce(
    (acc: number, item: OrderItem) =>
      acc + item.product.priceTon * item.quantity,
    0,
  );

  if (!latestOrder)
    return (
      <div className={styles.checkout}>Загрузка...</div>
    );

  return (
    <div className={styles.checkout}>
      <h2>{t("title")}</h2>

      {latestOrder.status === "paid" && (
        <div className={styles.successText}>
          ✅ {t("paid")}
        </div>
      )}

      {items.length === 0 ? (
        <p className={styles.emptyCart}>{t("empty")}</p>
      ) : (
        <>
          {items.map((item: OrderItem) => (
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
                    {item.product.priceTon}
                    <img
                      src={TonImg.src}
                      className={styles.ton}
                      alt='TON'
                    />
                  </span>
                </div>
                <div className={styles.details}>
                  <span>{t("color")}</span>
                  <span>{t("delivery")}</span>
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
            <strong>{t("total")}:</strong>
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
            {t("removeAll")}
          </div>

          {/* <div id='ton-connect' style={{ marginTop: 16 }} />

          <button
            className={styles.checkoutButton}
            onClick={pay}
          >
            {t("pay")}
          </button> */}
        </>
      )}
    </div>
  );
}
