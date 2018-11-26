import { ofType } from '@martin_hotell/rex-tils';
import * as actions from './actions';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { switchMap, tap, map, ignoreElements } from 'rxjs/operators';
import { localeExist } from './utils';
import { Observable } from 'rxjs';
import * as cookie from 'js-cookie';

export const changeLocaleEpic = (
  action$: ActionsObservable<actions.TActions>,
  state$: StateObservable<IRootState>,
) =>
  action$.pipe(
    ofType(actions.ETypes.ChangeCurrentLocale),
    switchMap((action) => {
      return new Observable<actions.TActions>((observer) => {
        const { locale } = action.payload;
        if (localeExist(state$.value.locale.locales, locale)) {
          observer.next(actions.Actions.changeLocale(locale));
          return observer.complete();
        }

        import(/* webpackChunkName: "locale" */
        `static/locales/${locale}.json`).then((messages) => {
          observer.next(actions.Actions.setupLocale(locale, messages));
          observer.next(actions.Actions.changeLocale(locale));
          observer.complete();
        });
      });
    }),
  );

export const setLocaleToCookieEpic = (
  action$: ActionsObservable<actions.TActions>,
  state$: StateObservable<IRootState>,
) =>
  action$.pipe(
    ofType(actions.ETypes.ChangeLocale),
    tap((action) => {
      cookie.set('language', action.payload.locale);
    }),
    ignoreElements(),
  );

export default [changeLocaleEpic, setLocaleToCookieEpic];
