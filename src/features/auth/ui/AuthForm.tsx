/** @format */

// src/features/auth/ui/AuthForm.tsx

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { useAuthUser } from "../model/useAuthUser";
import { useAuthActions } from "../model/useAuthActions";

import { AuthTabs } from "./AuthTabs";
import { AuthFields } from "./AuthFields";
import { AuthError } from "./AuthError";

import styles from "./AuthForm.module.css";

type AuthFormValues = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "errorRequired" })
    .email({ message: "errorInvalidEmail" }),
  password: z
    .string()
    .nonempty({ message: "errorRequired" })
    .min(6, { message: "errorMinLength" }),
});

const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: "errorRequired" })
      .email({ message: "errorInvalidEmail" }),
    password: z
      .string()
      .nonempty({ message: "errorRequired" })
      .min(6, { message: "errorMinLength" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "errorRequired" })
      .min(6, { message: "errorMinLength" }),
    name: z
      .string()
      .nonempty({ message: "errorNameRequired" })
      .min(2, { message: "errorNameRequired" }),
  })
  .refine(
    (vals) => vals.password === vals.confirmPassword,
    {
      message: "errorPasswordMismatch",
      path: ["confirmPassword"],
    },
  );

export const AuthForm = () => {
  const t = useTranslations("auth");
  const { user } = useAuthUser();
  const { login, register } = useAuthActions();

  const [mode, setMode] = useState<"login" | "register">(
    "login",
  );
  const [error, setError] = useState<string | null>(null);

  // Выбираем схему по mode
  const currentSchema =
    mode === "register" ? registerSchema : loginSchema;

  const {
    register: formRegister,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(currentSchema),
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
        onSuccess: () => {
          toast.success(t("registerSuccess"));
          reset();
        },
        onError: (err: any) => {
          const msg =
            err?.response?.data?.message?.[0] ||
            t("errorGeneric");
          setError(msg);
          toast.error(t("errorGeneric"));
        },
      });
    } else if (mode === "login") {
      const payload = {
        email: data.email,
        password: data.password,
      };

      login.mutate(payload, {
        onSuccess: () => {
          toast.success(t("loginSuccess"));
          reset();
        },
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

  return (
    <div className={styles.container}>
      <AuthTabs
        mode={mode}
        onChange={(newMode) => {
          setMode(newMode);
          reset();
        }}
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

        <button type='submit' className={styles.button}>
          {mode === "register" ? t("register") : t("login")}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
