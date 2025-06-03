/** @format */

import Header from "@/widgets/header/ui/Header";
import { Footer } from "@/widgets/footer/ui/Footer";
import type { PropsWithChildren } from "react";
import "@/shared/styles/layout.module.css";

export const AppShell = ({
  children,
}: PropsWithChildren) => {
  return (
    <div className='appShell'>
      <Header />
      <main className='mainContent' role='main'>
        {children}
      </main>
      <Footer />
    </div>
  );
};
