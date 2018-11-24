import { ILocaleModuleState } from './';
import * as actions from './actions';
import { EAvaliableLanguages, DEFAULT_LANGUAGE } from 'static/locales/types';

export const localeReducerInitialState: ILocaleModuleState = {
  currentLocale: DEFAULT_LANGUAGE,
  locales: [],
};

export function localeReducer(
  state = localeReducerInitialState,
  action: actions.TActions,
): ILocaleModuleState {
  switch (action.type) {
    case actions.ETypes.ChangeLocale: {
      if (Object.values(EAvaliableLanguages).includes(action.payload.locale)) {
        return { ...state, currentLocale: action.payload.locale };
      }
      return { ...state, currentLocale: DEFAULT_LANGUAGE };
    }
    case actions.ETypes.SetUpLocale: {
      const locales = [...state.locales];
      locales.push({
        language: action.payload.lang,
        messages: action.payload.messages,
      });
      return { ...state, locales };
    }
    default:
      return { ...state };
  }
}

export interface ILocaleState extends ILocaleModuleState {}
