import { createStore, applyMiddleware, compose, Store, Action } from 'redux';

const configureStore = (
  initialState?: Partial<IRootState>,
): Store<IRootState> => {
  const { rootReducer } = require('./rootReduser');

  const store = createStore<IRootState, Action<any>, {}, {}>(
    rootReducer,
    initialState,
  );
  return store;
};

export { configureStore };
