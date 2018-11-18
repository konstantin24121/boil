import { ofType } from '@martin_hotell/rex-tils';
import { ETypes, Actions } from './actions';
import { ActionsObservable } from 'redux-observable';
import { delay, mapTo } from 'rxjs/operators';

const increment = (action$: ActionsObservable<Actions>) =>
  action$.pipe(
    ofType(ETypes.Inc),
    delay(1000),
    mapTo(Actions.decrement(2)),
  );

export default [increment];
