import { UserModule } from '@modules/user';
import * as actions from '@modules/user/actions';

const initialState: UserModule.IState = {
  count: 0,
};

export function userReducer(
  state = initialState,
  action: actions.TActions,
): UserModule.IState {
  switch (action.type) {
    case actions.ETypes.Inc: {
      const count = state.count - 1;
      return { ...state, count };
    }
    case actions.ETypes.Dec: {
      const { payload } = action;
      const count = state.count - payload.count;
      return { ...state, count };
    }
    default:
      return { ...state };
  }
}

export interface IUserState extends UserModule.IState {}
