/** @format */

import type { Metadata } from "next";
import "./globals.css";
import "@/shared/styles/variables.css";
import Header from "@/widgets/header/ui/Header";

export const metadata: Metadata = {
  title: "shop",
  description: "shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Header />
        
        {children}
      </body>
    </html>
  );
}
