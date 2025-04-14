/** @format */

"use client";

import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import { useAuth } from "../model/useAuth";

export const AuthForm = () => {
  const { login, register, user } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "login" | "register"
  >("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [name, setName] = useState(""); // 👈 добавили имя

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (activeTab === "register") {
      if (!name.trim()) {
        return setError("Имя обязательно для заполнения.");
      }
      if (password !== confirmPassword) {
        return setError("Пароли не совпадают.");
      }

      register.mutate(
        { email, password, name },
        {
          onError: (err: any) => {
            setError(
              err?.response?.data?.message?.[0] ||
                "Ошибка при регистрации",
            );
          },
        },
      );
    } else {
      login.mutate(
        { email, password },
        {
          onError: (err: any) => {
            setError(
              err?.response?.data?.message ||
                "Ошибка при входе",
            );
          },
        },
      );
    }
  };

  if (user) {
    return (
      <div className={styles.loggedIn}>
        Вы вошли как {user.email}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "login" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("login")}
        >
          Вход
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "register" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("register")}
        >
          Регистрация
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {activeTab === "register" && (
          <input
            type='text'
            placeholder='Имя'
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type='email'
          placeholder='Email'
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type='password'
          placeholder='Пароль'
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {activeTab === "register" && (
          <input
            type='password'
            placeholder='Подтвердите пароль'
            className={styles.input}
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        )}

        <button type='submit' className={styles.button}>
          {activeTab === "register"
            ? "Зарегистрироваться"
            : "Войти"}
        </button>
      </form>
    </div>
  );
};
