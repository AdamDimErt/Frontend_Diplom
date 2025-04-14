/** @format */

"use client";
import React from "react";
import styles from "./Header.module.scss";
import LanguageSwitcher from "@/features/languageSwitcher/ui/LanguageSwitcher";
import Cart from "@/features/cart/ui/Cart";
import { Profile } from "@/features/profile/ui/Profile";

import { raleway } from "@/shared/fonts/raleway";
import { instrumentSans } from "@/shared/fonts/instrumentSans";
import { useAuthUser } from "@/features/auth/model/useAuthUser";
import Link from "next/link";

const Header = () => {
  const { user, isLoading } = useAuthUser();
  return (
    <div className={styles.header}>
      <ul
        className={`${styles.header__list} ${instrumentSans.className}`}
      >
        <li>Shop</li>
        <li>About</li>
      </ul>
      <h3
        className={`${styles.header__title} ${raleway.className}`}
      >
        SmartSphere
      </h3>
      <div className={styles.header__right_menu}>
        <LanguageSwitcher />
        <Cart />
        <nav>
          {isLoading ? (
            <span>Загрузка...</span>
          ) : user ? (
            <p>авторизован</p>
          ) : (
            <Link
              href='/login'
              className={styles.header__link}
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
