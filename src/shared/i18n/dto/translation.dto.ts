/**
 * Общий DTO для переводов сущностей.
 * - language: код языка (например, 'ru', 'en', 'kz')
 * - остальные поля могут быть любыми, в зависимости от сущности (title, description, и т.д.)
 *
 * @format
 */

export interface TranslationDto {
  /** Код языка, например 'ru', 'en', 'kz' */
  language: string;

  /** Заголовок/название на этом языке */
  title?: string;

  /** Описание на этом языке */
  description?: string;

  /** Дополнительные поля перевода */
  [key: string]: unknown;
}
