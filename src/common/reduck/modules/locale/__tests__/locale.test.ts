import { localeReducer, localeReducerInitialState } from '../reducer';
import * as actions from '../actions';
import * as epics from '../epics';
import { EAvaliableLanguages } from 'static/locales/types';
import { StateObservable } from 'redux-observable';
import { Subject } from 'rxjs';
import { userInitialState } from 'modules/user/reducer';

describe('Locale reducer', () => {
  it('should return initial state', () => {
    expect(
      localeReducer(undefined, {
        type: 'SOMETHING',
      } as any),
    ).toEqual(localeReducerInitialState);
  });

  it('should change current language', () => {
    const newLocale = EAvaliableLanguages.RU;
    const changeLocaleAction = actions.Actions.changeLocale(newLocale);

    expect(localeReducer(undefined, changeLocaleAction).currentLocale).toEqual(
      newLocale,
    );
  });

  it('should setup new locale', () => {
    const newLocale = EAvaliableLanguages.RU;
    const changeLocaleAction = actions.Actions.setupLocale(newLocale, {
      ZAD: 'zad',
    });

    expect(
      localeReducer(undefined, changeLocaleAction).locales.findIndex(
        (locale) => locale.language === newLocale,
      ),
    ).not.toEqual(newLocale);
  });
});

describe('Locale actions', () => {
  it('should return changeLocale action', () => {
    const expectedAction = {
      type: actions.ETypes.ChangeLocale,
      payload: { locale: EAvaliableLanguages.EN },
    };
    expect(actions.Actions.changeLocale(EAvaliableLanguages.EN)).toEqual(
      expectedAction,
    );
  });

  it('should return setupLocale action', () => {
    const expectedAction = {
      type: actions.ETypes.SetUpLocale,
      payload: { lang: EAvaliableLanguages.EN, messages: { ZAD: 'zad' } },
    };
    expect(
      actions.Actions.setupLocale(EAvaliableLanguages.EN, {
        ZAD: 'zad',
      }),
    ).toEqual(expectedAction);
  });
});

describe('Locale epics', () => {
  it('should call change locale epic with loadng locale', () => {
    global.scheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: actions.Actions.changeCurrentLocale(EAvaliableLanguages.EN),
      });

      const state$ = new StateObservable<Partial<IRootState>>(new Subject(), {
        locale: {
          currentLocale: EAvaliableLanguages.FR,
          locales: [{ language: EAvaliableLanguages.EN, messages: {} }],
        },
      });

      const output$ = epics.changeLocaleEpic(
        action$ as any,
        state$ as StateObservable<IRootState>,
      );

      expectObservable(output$).toBe('-a', {
        a: actions.Actions.changeLocale(EAvaliableLanguages.EN),
      });
    });
  });
});
