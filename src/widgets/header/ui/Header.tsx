/** @format */
import React from "react";
import styles from "./Header.module.scss";
import LanguageSwitcher from "@/features/languageSwitcher/ui/LanguageSwitcher";
import Cart from "@/features/cart/ui/Cart";
import { Profile } from "@/features/profile/ui/Profile";

import { raleway } from "@/shared/fonts/raleway";
import { instrumentSans } from "@/shared/fonts/instrumentSans";

const Header = () => {
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
        <LanguageSwitcher
          defaultValue='ru'
          items={[
            { value: "ru", label: "Русский" },
            { value: "kz", label: "Қазақ" },
            { value: "en", label: "англ" },
          ]}
          label='Выберите язык'
        />
        <Cart />
        <Profile />
      </div>
    </div>
  );
};

export default Header;
