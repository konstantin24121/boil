import { ILocaleModuleState } from './';
import * as actions from './actions';
import { EAvaliableLanguages, DEFAULT_LANGUAGE } from 'static/locales/types';

const locales = [
  {
    language: EAvaliableLanguages.EN,
    messages: require('static/locales/en.json'),
  },
  {
    language: EAvaliableLanguages.RU,
    messages: require('static/locales/ru.json'),
  },
];

export const initialState: ILocaleModuleState = {
  currentLocale: DEFAULT_LANGUAGE,
  locales,
};

export function localeReducer(state = initialState, action: actions.TActions): ILocaleModuleState {
  switch (action.type) {
    case actions.ETypes.ChangeLocale: {
      return { ...state, currentLocale: action.payload.locale };
    }
    default:
      return { ...state };
  }
}

export interface ILocaleState extends ILocaleModuleState {}
