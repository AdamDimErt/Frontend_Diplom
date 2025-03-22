/** @format */

// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { getUserLocale } from "@/features/languageSwitcher/service/locale";

export default getRequestConfig(async () => {
  const locale = await getUserLocale();
  return {
    locale,
    messages: (await import(`@/shared/i18n/${locale}.json`))
      .default,
  };
});
