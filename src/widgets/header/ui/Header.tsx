/** @format */

"use client";

import React from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

import LanguageSwitcher from "@/features/languageSwitcher/ui/LanguageSwitcher";
import { CartButton } from "@/features/cartButton/ui/CartButton";
import { AuthHeaderNav } from "@/features/auth/ui/AuthHeaderNav";

import { useTranslations } from "next-intl";
import { raleway } from "@/shared/fonts/raleway";
import { instrumentSans } from "@/shared/fonts/instrumentSans";

const Header = () => {
  const t = useTranslations("header");

  return (
    <header className={styles.header}>
      <ul
        className={`${styles.header__list} ${instrumentSans.className}`}
      >
        <li>
          <Link href='/'>{t("shop")}</Link>
        </li>
      </ul>

      <h3
        className={`${styles.header__title} ${raleway.className}`}
      >
        SmartSphere
      </h3>

      <div className={styles.header__right_menu}>
        <LanguageSwitcher />
        <CartButton />
        <nav>
          <AuthHeaderNav />
        </nav>
      </div>
    </header>
  );
};

export default Header;
