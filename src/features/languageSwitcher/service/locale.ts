/** @format */

// src/features/languageSwitcher/service/locale.ts
"use server";

import { cookies } from "next/headers";
import { defaultLocale } from "@/shared/i18n/config"; // путь адаптируйте

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale(): Promise<string> {
  return (
    (await cookies()).get(COOKIE_NAME)?.value ||
    defaultLocale
  );
}

export async function setUserLocale(
  locale: string,
): Promise<void> {
  (await cookies()).set(COOKIE_NAME, locale);
}
