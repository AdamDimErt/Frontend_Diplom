/** @format */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import styles from "./Sidebar.module.css";
import { authApi } from "@/features/auth/api/authApi";

export function Sidebar() {
  const t = useTranslations("profile.nav");
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await authApi.logout();
    window.location.href = "/";
  };

  return (
    <div className={styles.sidebar}>
      <ul className={styles.menu}>
        <li
          className={
            isActive("/profile") ? styles.active : ""
          }
        >
          <Link href='/profile'>{t("profile")}</Link>
        </li>
        <li
          className={
            isActive("/profile/orders") ? styles.active : ""
          }
        >
          <Link href='/profile/orders'>{t("orders")}</Link>
        </li>
        <li
          className={
            isActive("/profile/featured")
              ? styles.active
              : ""
          }
        >
          <Link href='/profile/featured'>
            {t("featured")}
          </Link>
        </li>
      </ul>
      <button
        className={styles.logout}
        onClick={handleLogout}
      >
        {t("signOut")}
      </button>
    </div>
  );
}
