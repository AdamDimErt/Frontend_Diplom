/** @format */

// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import "@/shared/styles/variables.css";
import Header from "@/widgets/header/ui/Header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Providers } from "./providers";
import { Footer } from "@/widgets/footer/ui/Footer";

export const metadata: Metadata = {
  title: "shop",
  description: "shop",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
