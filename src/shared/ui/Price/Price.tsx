/** @format */

// Price.tsx
import { FC } from "react";
import styles from "./Price.module.scss";
import { instrumentSans } from "@/shared/fonts/instrumentSans";

interface PriceProps {
  value: number;
}

export const Price: FC<PriceProps> = ({ value }) => {
  const formatted = value.toLocaleString("ru-RU");
  const parts = formatted.split(/\s/);
  const lastPart = parts.pop();
  const mainPart = parts.join(" ");

  return (
    <span
      className={`${styles.price} ${instrumentSans.className}`}
    >
      {mainPart && mainPart + " "}
      <span className={styles.smallDigits}>{lastPart}</span>
    </span>
  );
};
