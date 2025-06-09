/** @format */

// src/app/orders/address/page.tsx

import React from "react";
import { AddressForm } from "@/features/checkout/address/AddressForm";
import styles from "../Checkout.module.css"; // при желании можно переиспользовать стили или создать новые
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function AddressPage() {
  const t = useTranslations("checkout");

  return (
    <div className={styles.checkout}>
      <h2>{t("stepAddress")}</h2>
      <AddressForm />

      <div style={{ marginTop: "24px" }}>
        <Link href='/orders'>
          <span
            style={{ color: "#0070f3", cursor: "pointer" }}
          >
            ← {t("backToCart")}
          </span>
        </Link>
      </div>
    </div>
  );
}
