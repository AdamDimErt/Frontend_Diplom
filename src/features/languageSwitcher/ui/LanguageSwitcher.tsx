/** @format */
"use client";

import { useState } from "react";
import { switchLanguage } from "../api/switchLanguage";
import styles from "./LanguageSwitcher.module.scss";
import { locales } from "@/shared/i18n/config";
import { useLocale } from "next-intl";

import { instrumentSans } from "@/shared/fonts/instrumentSans";

export default function LanguageSwitcherSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Текущая локаль из next-intl
  const locale = useLocale();

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  async function handleChangeLanguage(value: string) {
    try {
      setLoading(true);
      await switchLanguage(value);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`${styles.language} ${instrumentSans.className}`}
    >
      <button
        className={styles.language__btn}
        aria-label={locale}
        onClick={toggleDropdown}
        disabled={loading}
      >
        {locale}
        <svg
          width='25'
          height='15'
          viewBox='0 0 25 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
            marginLeft: "8px", // Чтобы отделить иконку
          }}
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M24.4772 0.521977C23.7794 -0.173994 22.649 -0.173994 21.9511 0.521977L12.5003 9.95768L3.04875 0.521977C2.35095 -0.173994 1.22054 -0.173994 0.523351 0.521977C-0.17445 1.21861 -0.17445 2.34712 0.523351 3.04383L11.2369 13.7394L12.5002 15L13.7629 13.7394L24.4771 3.04383C25.1743 2.34719 25.1743 1.21868 24.4772 0.521977Z'
            fill='black'
          />
        </svg>
      </button>

      {isOpen && (
        <ul className={styles.language__list}>
          {locales.map((item) => (
            <li key={item} style={{ marginBottom: "4px" }}>
              <button
                className={styles.language__list_btn}
                onClick={() => handleChangeLanguage(item)}
              >
                {item}
                {/* переделать */}
                {item === locale && (
                  <span style={{ color: "green" }}>
                    (current)
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
