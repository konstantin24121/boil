import * as actions from './actions';
import { EAvaliableLanguages } from 'static/locales/types';
import { ILocale } from 'eo-locale/dist/models';

export type ILocaleModuleState = {
  readonly currentLocale: EAvaliableLanguages;
  readonly locales: ILocale[];
};

export const LocaleModuleActions = actions.Actions;
export type TLocaleModuleActions = typeof LocaleModuleActions;
