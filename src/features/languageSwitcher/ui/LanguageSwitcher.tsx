/** @format */

"use client";

import { FC, useState } from "react";
import { switchLanguage } from "../api/switchLanguage";
import type { LocaleSwitcherSelectProps } from "../model/types";
import styles from "./LanguageSwitcher.module.scss";

const LanguageSwitcherSelect: FC<
  LocaleSwitcherSelectProps
> = ({
  defaultValue,
  items,
  label = "Select language",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onChange(value: string) {
    setLoading(true);
    await switchLanguage(value);
    setLoading(false);
  }

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className={styles.language}>
      <button
        aria-label={label}
        onClick={toggleDropdown}
        disabled={loading}
      >
        {label}
      </button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "40px",
            left: 0,
            listStyle: "none",
            margin: 0,
            padding: "8px",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {items.map((item) => (
            <li
              key={item.value}
              style={{ marginBottom: "4px" }}
            >
              <button
                onClick={() => onChange(item.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
                {item.value === defaultValue && (
                  <span style={{ color: "green" }}>
                    (current)
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcherSelect;
