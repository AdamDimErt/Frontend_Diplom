import { ReactNode } from "react";
import { Sidebar } from "@/features/profile/ui/Sidebar";
import styles from "./ProfileLayout.module.css";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>
      <main className={styles.content}>{children}</main>
    </div>
  );
}
