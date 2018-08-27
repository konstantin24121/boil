import { combineReducers, Reducer } from 'redux';

import { userReducer, IUserState } from './modules/user/reducer';

declare global {
  interface IRootState {
    user: IUserState;
  }
}

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  user: userReducer,
});

export { rootReducer };
