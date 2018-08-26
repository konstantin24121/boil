import { combineReducers } from 'redux';

import { userReducer, IUserState } from './modules/user/reducer';

declare global {
  interface IRootState {
    user: IUserState;
  }
}

const rootReducer = combineReducers<IRootState>({
  user: userReducer,
});

export { rootReducer };
