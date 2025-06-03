/** @format */

import { TranslationDto } from "./dto/translation.dto";



export function getTranslationForLocale(
  translations: TranslationDto[],
  locale?: string,
): TranslationDto {
  const lang = (locale ?? "ru").toLowerCase();
  const matched = translations.find(
    (t) => t.language.toLowerCase() === lang,
  );
  return matched ?? translations[0];
}
