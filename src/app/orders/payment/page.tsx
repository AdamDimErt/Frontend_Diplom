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
import axios from "axios";

import { getMyOrders } from "@/entities/order/api/orderApi";
import { useCheckout } from "@/features/checkout/model/useCheckout";
import { useCheckoutMutations } from "@/features/checkout/model/useCheckoutMutations";
import { useTonConnect } from "@/features/checkout/lib/useTonConnect";
import { useTonPayment } from "@/features/checkout/lib/useTonPayment";

import styles from "./Payment.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

async function updateOrderStatus(
  id: string,
  status: "paid" | "cancelled",
) {
  await axios.post(`/api/order/${id}/status`, { status });
}

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
  const { clear } = useCheckoutMutations(latestOrder?.id!);

  const totalAmount = latestOrder
    ? latestOrder.items.reduce(
        (sum: any, i: any) =>
          sum + i.product.priceTenge * i.quantity,
        0,
      )
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !latestOrder) return;

    const res = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (res.error) {
      alert(res.error.message);
      // обновляем статус на cancelled
      await updateOrderStatus(latestOrder.id, "cancelled");
    } else {
      // @ts-ignore
      const pi = res.paymentIntent;
      if (pi?.status === "succeeded") {
        alert(t("paid"));
        await updateOrderStatus(latestOrder.id, "paid");
        clear.mutate();
      } else {
        alert(t("paymentFailed"));
        await updateOrderStatus(
          latestOrder.id,
          "cancelled",
        );
      }
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

function TelegramCheckout() {
  const t = useTranslations("checkout");
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });
  const latestOrder = useMemo(() => data?.[0], [data]);
  const { clear } = useCheckoutMutations(latestOrder?.id!);
  const tonRef = useTonConnect();
  const payTon = useTonPayment(
    tonRef,
    latestOrder?.items ?? [],
    latestOrder?.id!,
  );

  const handleTony = async () => {
    try {
      await payTon();
      await updateOrderStatus(latestOrder!.id, "paid");
      clear.mutate();
    } catch {
      alert(t("paymentFailed"));
      await updateOrderStatus(latestOrder!.id, "cancelled");
    }
  };

  return (
    <div className={styles.paymentBox}>
      <div
        id='ton-connect'
        className={styles.tonConnectRoot}
      />
      <button
        className={styles.payButton}
        onClick={handleTony}
      >
        {t("payWithTelegram")}
      </button>
    </div>
  );
}

export default function PaymentPage() {
  const t = useTranslations("checkout");
  const { paymentMethod } = useCheckout();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

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
        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      })
      .catch(() => setError(t("errorInitPayment")));
  }, [paymentMethod, totalAmount, t]);

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
          stripe={stripePromise!}
          options={{ clientSecret }}
        >
          <StripeCheckoutForm clientSecret={clientSecret} />
        </Elements>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("stepPayment")}</h2>
      <TelegramCheckout />
    </div>
  );
}
