import { userReducer, userInitialState } from '../reducer';
import * as actions from '../actions';
import * as epics from '../epics';
import { TestScheduler } from 'rxjs/testing';

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe('User reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, { type: 'SOMETHING' } as any)).toEqual(
      userInitialState,
    );
  });

  it('should increment value', () => {
    const changeLocaleAction = actions.Actions.increment();
    const expected = userInitialState.count + 1;
    expect(userReducer(undefined, changeLocaleAction).count).toEqual(expected);
  });

  it('should decrement value on 1 by default', () => {
    const changeLocaleAction = actions.Actions.decrement();
    const expected = userInitialState.count - 1;
    expect(userReducer(undefined, changeLocaleAction).count).toEqual(expected);
  });

  it('should decrement custom value', () => {
    const customDec = 10;
    const changeLocaleAction = actions.Actions.decrement(customDec);
    const expected = userInitialState.count - customDec;
    expect(userReducer(undefined, changeLocaleAction).count).toEqual(expected);
  });
});

describe('User actions', () => {
  it('should return increment action', () => {
    const expectedAction = { type: actions.ETypes.Inc };
    expect(actions.Actions.increment()).toEqual(expectedAction);
  });

  it('should return decrement default action', () => {
    const expectedAction = {
      type: actions.ETypes.Dec,
      payload: { count: 1 },
    };
    expect(actions.Actions.decrement()).toEqual(expectedAction);
  });

  it('should return decrement with custom count action', () => {
    const customDec = 10;
    const expectedAction = {
      type: actions.ETypes.Dec,
      payload: { count: customDec },
    };
    expect(actions.Actions.decrement(customDec)).toEqual(expectedAction);
  });
});

describe('User epics', () => {
  it('should call increment epic', () => {
    scheduler.run(({ hot, expectObservable }) => {
      const action$ = hot('-a', {
        a: actions.Actions.increment(),
      });

      const state$ = null;

      const output$ = epics.increment(action$ as any, state$);

      expectObservable(output$).toBe('- 1000ms a', {
        a: actions.Actions.decrement(2),
      });
    });
  });
});
