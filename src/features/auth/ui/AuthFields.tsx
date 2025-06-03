/** @format */

import styles from "./AuthForm.module.css";
import {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { AuthFormValues } from "../lib/schema";

interface Props {
  formRegister: UseFormRegister<AuthFormValues>;
  mode: "login" | "register";
  t: (key: string) => string;
  errors: FieldErrors<AuthFormValues>;
}

export const AuthFields = ({
  formRegister,
  mode,
  t,
  errors,
}: Props) => {
  return (
    <>
      {mode === "register" && (
        <>
          <input
            type='text'
            placeholder={t("name")}
            {...formRegister("name")}
            className={styles.input}
          />
          {errors.name && (
            <span className={styles.error}>
              {t(errors.name.message as string)}
            </span>
          )}
        </>
      )}

      <input
        type='email'
        placeholder={t("email")}
        {...formRegister("email")}
        className={styles.input}
      />
      {errors.email && (
        <span className={styles.error}>
          {t(errors.email.message as string)}
        </span>
      )}

      <input
        type='password'
        placeholder={t("password")}
        {...formRegister("password")}
        className={styles.input}
      />
      {errors.password && (
        <span className={styles.error}>
          {t(errors.password.message as string)}
        </span>
      )}

      {mode === "register" && (
        <>
          <input
            type='password'
            placeholder={t("confirmPassword")}
            {...formRegister("confirmPassword")}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>
              {t(errors.confirmPassword.message as string)}
            </span>
          )}
        </>
      )}
    </>
  );
};
