/** @format */
// src/app/orders/payment/page.tsx

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "@/entities/order/api/orderApi";
import { useCheckout } from "@/features/checkout/model/useCheckout";
import { useCheckoutMutations } from "@/features/checkout/model/useCheckoutMutations";
import { useTonConnect } from "@/features/checkout/lib/useTonConnect";
import { useTonPayment } from "@/features/checkout/lib/useTonPayment";

import styles from "./Payment.module.css";

// 🔑 Ваш тестовый publishable-key Stripe
const stripePromise = loadStripe(
  "pk_test_51RDtTOIjJP5SAFomTfJ7ByH0acGAMBhjNJMCXsDb17q9fGpmdczHaB5ITY9futn4MvUuzSftos7c9r8V2tMxx3mH00jtfrwbvq",
);

//
// ─── Форма Stripe ──────────────────────────────────────────────────────────────
//
function StripeCheckoutForm({
  clientSecret,
}: {
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations("checkout");
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });
  const latestOrder = useMemo(() => data?.[0], [data]);
  const { clear } = useCheckoutMutations(latestOrder?.id);

  const totalAmount = latestOrder
    ? latestOrder.items.reduce(
        (sum: any, i: any) =>
          sum + i.product.priceTenge * i.quantity,
        0,
      )
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (res.error) {
      alert(res.error.message);
    } else {
      alert(t("paid"));
      clear.mutate();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.paymentBox}
    >
      <div className={styles.summary}>
        <strong>{t("total")}:</strong> {totalAmount} ₸
      </div>
      <PaymentElement className={styles.paymentElement} />
      <button
        type='submit'
        disabled={!stripe}
        className={styles.payButton}
      >
        {t("payButton")}
      </button>
    </form>
  );
}

//
// ─── Оплата через Telegram (TON Connect) ───────────────────────────────────────
//
function TelegramCheckout() {
  const t = useTranslations("checkout");
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });
  const latestOrder = useMemo(() => data?.[0], [data]);

  // Хуки из вашего кода Telegram-оплаты
  const tonRef = useTonConnect();
  const payTon = useTonPayment(
    tonRef,
    latestOrder?.items ?? [],
    latestOrder?.id,
  );

  return (
    <div className={styles.paymentBox}>
      {/* 1) контейнер, куда TonConnectUI вставит свою кнопку */}
      <div
        id='ton-connect'
        className={styles.tonConnectRoot}
      />

      {/* 2) фолбэк-кнопка, если Mini-App не успеет загрузиться */}
      <button
        className={styles.payButton}
        onClick={() => payTon()}
      >
        {t("payWithTelegram")}
      </button>
    </div>
  );
}

//
// ─── Главный компонент страницы оплаты ────────────────────────────────────────
//
export default function PaymentPage() {
  const t = useTranslations("checkout");
  const { paymentMethod } = useCheckout();

  // Для Stripe нам нужен clientSecret
  const [clientSecret, setClientSecret] =
    useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Берём сумму заказа
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });
  const latestOrder = data?.[0];
  const totalAmount =
    latestOrder?.items.reduce(
      (sum: any, i: any) =>
        sum + i.product.priceTenge * i.quantity,
      0,
    ) ?? 0;

  // Если выбрали Stripe — запрашиваем PaymentIntent
  useEffect(() => {
    if (paymentMethod !== "stripe" || !totalAmount) return;

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: totalAmount,
        currency: "KZT",
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        setClientSecret(json.clientSecret);
      })
      .catch(() => setError(t("errorInitPayment")));
  }, [paymentMethod, totalAmount, t]);

  // Рендерим только Stripe-ветку
  if (paymentMethod === "stripe") {
    if (error)
      return <div className={styles.loader}>{error}</div>;
    if (!clientSecret)
      return (
        <div className={styles.loader}>{t("loading")}</div>
      );

    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{t("stepPayment")}</h2>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <StripeCheckoutForm clientSecret={clientSecret} />
        </Elements>
      </div>
    );
  }

  // Иначе — TON/Telegram
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("stepPayment")}</h2>
      <TelegramCheckout />
    </div>
  );
}
