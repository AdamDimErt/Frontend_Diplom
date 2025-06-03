/** @format */

// src/shared/i18n/dictionary.ts

import { Dictionary } from "./dto/dictionary.dto";

export const getDictionary = async (
  locale: string,
): Promise<Dictionary> => {
  try {
    const module = await import(`./${locale}.json`);
    return module.default as Dictionary;
  } catch {
    const fallback = await import(`./ru.json`);
    return fallback.default as Dictionary;
  }
};
