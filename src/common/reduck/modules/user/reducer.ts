import { IUserModuleState } from './';
import * as actions from './actions';
import { UserInfo } from './models';

export const userReducerInitialState: IUserModuleState = {
  count: 10,
  profile: new UserInfo(),
};

export function userReducer(
  state = userReducerInitialState,
  action: actions.TActions,
): IUserModuleState {
  switch (action.type) {
    case actions.ETypes.Inc: {
      const count = state.count + 1;
      return { ...state, count };
    }
    case actions.ETypes.Dec: {
      const { payload } = action;
      const count = state.count - payload.count;
      return { ...state, count };
    }
    case actions.ETypes.SetUserInfo: {
      const { userInfo } = action.payload;
      return { ...state, profile: userInfo };
    }
    default:
      return { ...state };
  }
}

export interface IUserState extends IUserModuleState {}
