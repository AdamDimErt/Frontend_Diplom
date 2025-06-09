/** @format */

// src/app/profile/me/page.tsx
/** @format */
"use client";

import React, { useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import styles from "./MePage.module.css";

export default function MePage() {
  const t = useTranslations("profile.page");
  const qc = useQueryClient();

  // ─── Загрузка профиля ───────────────────────────────────────────────
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ["me"],
    queryFn: authApi.me, // <-- здесь вызываем GET /auth/me
  });

  // Если в будущем появится эндпоинт PUT /auth/me, его можно подключить так:
  // const update = useMutation<any, any, any>({
  //   mutationFn: (vals) => authApi.updateProfile(vals),
  //   onSuccess() {
  //     qc.invalidateQueries({ queryKey: ["me"] });
  //     alert(t("saved"));
  //   },
  // });

  const { register, handleSubmit, reset } = useForm<any>();

  // Заполняем форму, когда данные пришли
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  // Заглушка для сабмита (пока нет updateProfile)
  const onSubmit = (values: any) => {
    console.log("values to save:", values);
    alert(t("saved"));
    // update.mutate(values);
  };

  if (isLoading) {
    return (
      <div className={styles.loader}>{t("loading")}</div>
    );
  }
  if (isError) {
    return <div className={styles.error}>{t("error")}</div>;
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t("title")}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <label className={styles.field}>
          {t("email")}
          <input
            {...register("email")}
            disabled
            className={styles.input}
          />
        </label>
        <label className={styles.field}>
          {t("name")}
          <input
            {...register("name")}
            className={styles.input}
          />
        </label>
        <label className={styles.field}>
          {t("surname")}
          <input
            {...register("surname")}
            className={styles.input}
          />
        </label>
        <label className={styles.field}>
          {t("phone")}
          <input
            {...register("phone")}
            className={styles.input}
          />
        </label>
        <button type='submit' className={styles.button}>
          {t("save")}
        </button>
      </form>
    </div>
  );
}
