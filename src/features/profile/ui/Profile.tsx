/** @format */
// src/features/auth/ui/Profile.tsx

"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Profile.module.scss";
import avatar from "../assets/avatar.png";
import { authApi } from "@/features/auth/api/authApi";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const Profile: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        onClickOutside,
      );
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      // 1) remove cached "me" so all useQuery(['me']) return undefined
      queryClient.removeQueries({ queryKey: ["me"] });
      // 2) close our menu
      setOpen(false);
      // 3) re-fetch any server components/layouts that depend on session
      router.refresh();
    } catch (err) {
      console.error("Ошибка выхода:", err);
    }
  };

  return (
    <div className={styles.profile} ref={menuRef}>
      <img
        className={styles.avatar}
        src={avatar.src}
        alt='avatar'
        onClick={() => setOpen((v) => !v)}
      />
      {open && (
        <div className={styles.dropdown}>
          <Link
            href='/profile'
            className={styles.dropdownItem}
            onClick={() => setOpen(false)}
          >
            Профиль
          </Link>
          <hr className={styles.divider} />
          <button
            type='button'
            className={`${styles.dropdownItem} ${styles.signOut}`}
            onClick={handleLogout}
          >
            Выйти из профиля
          </button>
        </div>
      )}
    </div>
  );
};
