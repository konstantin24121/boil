import { IUserModuleState } from './';
import * as actions from './actions';

const initialState: IUserModuleState = {
  count: 10,
};

export function userReducer(
  state = initialState,
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
    default:
      return { ...state };
  }
}

export interface IUserState extends IUserModuleState {}
