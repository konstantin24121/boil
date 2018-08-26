import { createStore, applyMiddleware, compose } from 'redux';

const configureStore = (initialState?: Partial<IRootState>) => {
  const { rootReducer } = require('./rootReduser');

  const store = createStore(rootReducer, initialState);
  return store;
};

export { configureStore };
