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
      return { ...state, currentLocale: action.payload.locale };
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
