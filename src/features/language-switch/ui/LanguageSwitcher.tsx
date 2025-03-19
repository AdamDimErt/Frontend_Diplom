/** @format */

"use client";
import React from "react";
import styles from "./LanguageSwitcher.module.scss";
import { useState } from "react";

const LanguageSwitcher = () => {
  const [open, setOpen] = useState();

  const Language = ["en", "ru", "kz"];

  return (
    <div className={styles.languageSwitcher}>
      LanguageSwitcher
    </div>
  );
};

export default LanguageSwitcher;
