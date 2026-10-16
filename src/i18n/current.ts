import { LOCALES, DEFAULT_LOCALE, type Locale } from './ui';

/** The language of the page being rendered, from its URL. */
export function langOf(currentLocale: string | undefined): Locale {
  return (LOCALES as readonly string[]).includes(currentLocale ?? '') ? (currentLocale as Locale) : DEFAULT_LOCALE;
}
