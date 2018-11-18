import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { EAvaliableLanguages } from 'static/locales/types';

export enum ETypes {
  ChangeLocale = 'CHANGE_LOCALE',
}

export const Actions = {
  changeLocale: (locale: EAvaliableLanguages) =>
    createAction(ETypes.ChangeLocale, { locale }),
};

export type TActions = ActionsUnion<typeof Actions>;
