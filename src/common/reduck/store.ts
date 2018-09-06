import { createStore, applyMiddleware, compose, Store, Action } from 'redux';
import config from 'common/config';

const middleware = [];

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

  const store = createStore<IRootState, Action<any>, {}, {}>(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./rootReduser', () => {
      const nextRootReducer = require('./rootReduser').rootReducer;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export { configureStore };
