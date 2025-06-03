/** @format */

// features/auth/ui/AuthError.tsx

import styles from "./AuthForm.module.css";

export const AuthError = ({
  message,
}: {
  message: string | null;
}) => {
  if (!message) return null;
  return <div className={styles.error}>{message}</div>;
};
