import { createStore, applyMiddleware, compose, Store, Action } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { config } from 'common/config';

const epicMiddleware = createEpicMiddleware();

const middleware = [epicMiddleware];

let enhancer;

// Подключим REDUX_DEVTOOLS
if (__DEVELOPMENT__ && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      name: config.name,
    }) || compose;
  enhancer = composeEnhancers(applyMiddleware(...middleware));
  console.log('Open ReduxDevTools for debuging');
} else {
  enhancer = applyMiddleware(...middleware);
}

const configureStore = (initialState?: Partial<IRootState>): Store<IRootState> => {
  const { rootReducer } = require('./rootReduser');
  const { rootEpic } = require('./rootEpic');

  const epic$ = new BehaviorSubject(rootEpic);

  const hotReloadingEpic = (...args) => epic$.pipe(switchMap((epic) => epic(...args)));

  const store = createStore<IRootState, Action<{}>, {}, {}>(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./rootReduser', () => {
      const nextRootReducer = require('./rootReduser').rootReducer;

      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('./rootEpic', () => {
      const nextRootEpic = require('./rootEpic').rootEpic;
      epic$.next(nextRootEpic);
    });
  }

  epicMiddleware.run(hotReloadingEpic as any);

  return store;
};

export { configureStore };
