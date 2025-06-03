/** @format */

// features/auth/ui/AuthTabs.tsx

import styles from "./AuthForm.module.css";
import { useTranslations } from "next-intl";

interface Props {
  mode: "login" | "register";
  onChange: (mode: "login" | "register") => void;
  onReset: () => void;
}

export const AuthTabs = ({
  mode,
  onChange,
  onReset,
}: Props) => {
  const t = useTranslations("auth");

  return (
    <div className={styles.tabs}>
      {["login", "register"].map((m) => (
        <button
          key={m}
          className={`${styles.tab} ${
            mode === m ? styles.active : ""
          }`}
          onClick={() => {
            onChange(m as any);
            onReset();
          }}
        >
          {t(m)}
        </button>
      ))}
    </div>
  );
};
