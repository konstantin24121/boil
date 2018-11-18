import { ofType } from '@martin_hotell/rex-tils';
import * as action from './actions';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

export const increment = (
  action$: ActionsObservable<action.TActions>,
  $state: StateObservable<IRootState>,
) =>
  action$.pipe(
    ofType(action.ETypes.Inc),
    delay(1000),
    mapTo(action.Actions.decrement(2)),
  );

export default [increment];
