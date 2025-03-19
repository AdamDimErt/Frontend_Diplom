/** @format */

import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ru"]; // поддерживаемые языки
const defaultLocale = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Проверка: есть ли в URL язык
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) &&
      pathname !== `/${locale}`,
  );

  // Если нет — делаем редирект на defaultLocale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, req.url),
    );
  }
}

export const config = {
  // Применяем middleware только к указанным путям
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
