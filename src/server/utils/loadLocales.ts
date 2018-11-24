import { ILocale } from 'eo-locale/dist/models';
import { EAvaliableLanguages, DEFAULT_LANGUAGE } from 'static/locales/types';
import { Request } from 'express';

function loadlLocale(language: string): Promise<ILocale> {
  return new Promise((resolve) => {
    import(/* webpackChunkName: "locale" */
    `static/locales/${language}.json`).then((messages) => {
      resolve({ language, messages: messages.default });
    });
  });
}

export function loadLocales(locales: string[]): Promise<ILocale[]> {
  const localesPreloaders = [];
  localesPreloaders.push(loadlLocale(DEFAULT_LANGUAGE));

  for (const locale of locales) {
    if (Object.values(EAvaliableLanguages).includes(locale)) {
      localesPreloaders.push(loadlLocale(locale));
    }
  }

  return Promise.all(localesPreloaders);
}

export function getClientLanguage(req: Request): EAvaliableLanguages[] {
  if (
    req.cookies &&
    Object.values(EAvaliableLanguages).includes(req.cookies.language)
  ) {
    return [req.cookies.language];
  }
  const browserLanguage = req.acceptsLanguages(
    Object.values(EAvaliableLanguages),
  );
  if (browserLanguage && browserLanguage !== DEFAULT_LANGUAGE) {
    return [browserLanguage as EAvaliableLanguages];
  }
  return [];
}
