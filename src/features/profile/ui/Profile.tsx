/** @format */

"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Profile.module.scss";
import avatar from "../assets/avatar.png";
import { authApi } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push("/"); // Перенаправляем на страницу входа
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return (
    <div className={styles.profile} ref={menuRef}>
      <img
        className={styles.avatar}
        src={avatar.src}
        alt='avatar'
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className={styles.dropdown}>
          <button onClick={handleLogout}>
            Выйти из профиля
          </button>
        </div>
      )}
    </div>
  );
};
