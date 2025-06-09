/** @format */

// src/app/layout.tsx
/** @format */

import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { AppShell } from "./ui/AppShell";
import { getDictionary } from "@/shared/i18n/dictionary";
import type { Metadata } from "next";

import "@/shared/styles/globals.css";
import "@/shared/styles/variables.css";
import { CheckoutProvider } from "@/features/checkout/model/useCheckout";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <CheckoutProvider>
              <AppShell>{children}</AppShell>
            </CheckoutProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
