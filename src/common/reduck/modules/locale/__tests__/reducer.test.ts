import { localeReducer, initialState } from '../reducer';
import * as actions from '../actions';
import { EAvaliableLanguages } from 'static/locales/types';

describe('Locale reducer', () => {
  it('should return initial state', () => {
    expect(localeReducer(undefined, { type: 'SOMETHING' } as any)).toEqual(initialState);
  });

  it('should change current language', () => {
    const newLocale = EAvaliableLanguages.RU;
    const changeLocaleAction = actions.Actions.changeLocale(newLocale);

    expect(localeReducer(undefined, changeLocaleAction).currentLocale).toEqual(newLocale);
  });
});
