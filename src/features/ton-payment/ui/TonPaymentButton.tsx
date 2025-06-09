/** @format */

"use client";

import { useEffect, useRef } from "react";
import { TonConnectUI } from "@tonconnect/ui";

export const TonPaymentButton = () => {
  const tonConnectRef = useRef<TonConnectUI | null>(null);

  useEffect(() => {
    // Проверка, не зарегистрирован ли уже tc-root
    if (!document.querySelector("tc-root")) {
      tonConnectRef.current = new TonConnectUI({
        manifestUrl:
          "https://adamdim-2911717626d6.herokuapp.com/tonconnect-manifest.json",
        buttonRootId: "ton-connect",
      });
    }
  }, []);

  const handlePay = async () => {
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

    await tonConnectRef.current?.sendTransaction(tx);
  };

  return (
    <div>
      <div id='ton-connect' />
      <button onClick={handlePay}>Оплатить TON</button>
    </div>
  );
};
