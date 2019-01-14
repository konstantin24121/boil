import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { EAvaliableLanguages } from 'static/locales/types';
import { TMessage } from 'eo-locale/dist/models';

export enum ETypes {
  ChangeLocale = 'CHANGE_LOCALE',
  ChangeCurrentLocale = 'CHANGE_CURRENT_LOCALE',
  SetUpLocale = 'SETUP_LOCALE',
}

export const Actions = {
  changeCurrentLocale: (locale: EAvaliableLanguages) =>
    createAction(ETypes.ChangeCurrentLocale, { locale }),
  changeLocale: (locale: EAvaliableLanguages) =>
    createAction(ETypes.ChangeLocale, { locale }),
  setupLocale: (
    lang: EAvaliableLanguages,
    messages: Record<string, TMessage>,
  ) => createAction(ETypes.SetUpLocale, { lang, messages }),
};

export type TActions = ActionsUnion<typeof Actions>;
