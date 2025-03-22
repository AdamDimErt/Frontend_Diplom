/** @format */

// src/features/languageSwitcher/api/switchLanguage.ts

/**
 * Функция отправляет запрос на API‑роут для смены локали
 * и перезагружает страницу для применения новой локали.
 */
export async function switchLanguage(
  newLocale: string,
): Promise<void> {
  await fetch("/api/locale", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ locale: newLocale }),
  });
  window.location.reload();
}
