/** @format */

import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/widgets/header/ui/Header";
import "./globals.css";
import "@/shared/styles/variables.css";

export const metadata = {
  title: "shop",
  description: "shop",
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  let messages;
  try {
    messages = (
      await import(
        `@/shared/config/i18n/locales/${locale}.json`
      )
    ).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
