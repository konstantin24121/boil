import { combineReducers, Reducer } from 'redux';

import { userReducer, IUserState } from './modules/user/reducer';
import { localeReducer, ILocaleState } from './modules/locale/reducer';

declare global {
  interface IRootState {
    user: IUserState;
    locale: ILocaleState;
  }
}

const rootReducer: Reducer<IRootState> = combineReducers<IRootState>({
  user: userReducer,
  locale: localeReducer,
});

export { rootReducer };
