import { EAvaliableLanguages } from 'static/locales/types';
import { ILocale } from 'eo-locale/dist/models';

export function localeExist(
  locales: ILocale[],
  language: EAvaliableLanguages,
): boolean {
  const existingLocale = locales.findIndex(
    (locale) => locale.language === language,
  );
  return existingLocale !== -1;
}
