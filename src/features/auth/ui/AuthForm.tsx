/** @format */

// src/features/auth/ui/AuthForm.tsx
/** @format */

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { useAuthUser } from "../model/useAuthUser";
import { useAuthActions } from "../model/useAuthActions";

import { AuthTabs } from "./AuthTabs";
import { AuthFields } from "./AuthFields";
import { AuthError } from "./AuthError";

import styles from "./AuthForm.module.css";
import { authSchema, AuthFormValues } from "../lib/schema";

const AuthForm = () => {
  const t = useTranslations("auth");
  const { user } = useAuthUser();
  const { login, register } = useAuthActions();

  const [mode, setMode] = useState<"login" | "register">(
    "login",
  );
  const [error, setError] = useState<string | null>(null);

  const {
    register: formRegister,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  useEffect(() => {
    const sub = watch(() => setError(null));
    return () => sub.unsubscribe();
  }, [watch]);

  const onSubmit = (data: AuthFormValues) => {
    setError(null);

    if (mode === "register") {
      const payload = {
        email: data.email,
        password: data.password,
        name: data.name?.trim() || "",
      };
      register.mutate(payload, {
        onSuccess: () =>
          toast.success(t("registerSuccess")),
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message?.[0] ||
            t("errorGeneric");
          setError(msg);
          toast.error(t("errorGeneric"));
        },
      });
    } else {
      console.log("hi login");

      const payload = {
        email: data.email,
        password: data.password,
      };

      console.log("▶ login payload:", payload);
      login.mutate(payload, {
        onSuccess: () => toast.success(t("loginSuccess")),
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message ||
            t("errorGeneric");
          setError(msg);
          toast.error(t("errorGeneric"));
        },
      });
    }
  };

  if (user) {
    return (
      <div className={styles.loggedIn}>
        {t("welcome")} <b>{user.email}</b>
      </div>
    );
  }

  const isLoading = login.isPending || register.isPending;

  return (
    <div className={styles.container}>
      <AuthTabs
        mode={mode}
        onChange={setMode}
        onReset={reset}
      />
      <AuthError message={error} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <AuthFields
          formRegister={formRegister}
          mode={mode}
          t={t}
          errors={errors}
        />
        <button
          type='submit'
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading
            ? t("loading")
            : mode === "register"
            ? t("register")
            : t("login")}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
