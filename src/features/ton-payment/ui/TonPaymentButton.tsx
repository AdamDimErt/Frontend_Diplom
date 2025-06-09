/** @format */

// src/components/TonPaymentButton.tsx
"use client";

import React, { useEffect, useRef } from "react";
import { TonConnectUI } from "@tonconnect/ui";

export const TonPaymentButton: React.FC = () => {
  const tonRef = useRef<TonConnectUI | null>(null);

  useEffect(() => {
    if (
      !tonRef.current &&
      !document.querySelector("tc-root")
    ) {
      tonRef.current = new TonConnectUI({
        manifestUrl:
          "https://adamdim-2911717626d6.herokuapp.com/tonconnect-manifest.json",
        buttonRootId: "ton-connect",
      });
    }
  }, []);

  const handlePay = async () => {
    if (!tonRef.current) return;

    const tx = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address:
            "UQAM7IgIUQqUohQ2YFE75JGdiV7ZtXhcBD_NAzZAnARFZZGm",
          amount: "20",
        },
      ],
    };

    try {
      await tonRef.current.sendTransaction(tx);
    } catch (error) {
      console.error(
        "Ошибка при отправке TON-транзакции:",
        error,
      );
    }
  };

  return (
    <div>
      {/* Контейнер для кнопки TonConnectUI */}
      <div id='ton-connect' />
      {/* Фолбэк-кнопка */}
      <button onClick={handlePay}>Оплатить TON</button>
    </div>
  );
};
