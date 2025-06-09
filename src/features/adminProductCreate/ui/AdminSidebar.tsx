/** @format */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { authApi } from "@/features/auth/api/authApi";
import styles from "./AdminSidebar.module.css";

export function AdminSidebar() {
  const t = useTranslations("admin.nav");
  const path = usePathname();
  const isActive = (p: string) => path === p;

  const logout = async () => {
    await authApi.logout();
    window.location.href = "/";
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.menu}>
        <li
          className={
            isActive("/admin") ? styles.active : ""
          }
        >
          <Link href='/admin'>{t("dashboard")}</Link>
        </li>
        <li
          className={
            isActive("/admin/products/create")
              ? styles.active
              : ""
          }
        >
          <Link href='/admin/products/create'>
            {t("createProduct")}
          </Link>
        </li>
        <li
          className={
            isActive("/admin/orders") ? styles.active : ""
          }
        >
          <Link href='/admin/orders'>
            {t("ordersList")}
          </Link>
        </li>
      </ul>
      <button className={styles.logout} onClick={logout}>
        {t("signOut")}
      </button>
    </nav>
  );
}
