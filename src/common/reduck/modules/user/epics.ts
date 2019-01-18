import { ofType } from '@martin_hotell/rex-tils';
import * as action from './actions';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { delay, mapTo, mergeMap, map } from 'rxjs/operators';
import { Api } from './api';
import { UserInfo } from './models';
import { from } from 'rxjs';

export const increment = (
  action$: ActionsObservable<action.TActions>,
  $state: StateObservable<IRootState>,
) =>
  action$.pipe(
    ofType(action.ETypes.Inc),
    delay(1000),
    mapTo(action.Actions.decrement(2)),
  );

export const fetchUser = (action$: ActionsObservable<action.TActions>) =>
  action$.pipe(
    ofType(action.ETypes.FetchUserInfo),
    mergeMap((catchedAction) =>
      from(Api.getUserInfo(catchedAction.payload.login)).pipe(
        map((response) => {
          const userInfo = UserInfo.createFromJson(response);
          return action.Actions.setUserInfo(userInfo);
        }),
      ),
    ),
  );

export default [increment, fetchUser];
