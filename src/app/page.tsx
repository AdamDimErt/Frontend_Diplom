/** @format */

"use client";

import styles from "./page.module.css";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("Test");
  const locale = useLocale();
  return (
    <div className={styles.page}>
      hi <p>Current locale: {locale}</p>
      <h1>{t("greeting")}</h1>
    </div>
  );
}
