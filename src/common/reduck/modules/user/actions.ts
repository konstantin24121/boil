import { ActionsUnion, createAction } from '@martin_hotell/rex-tils';
import { UserInfo } from './models';

export enum ETypes {
  Inc = '@user/INCREMENT',
  Dec = '@user/DECREMENT',
  SetUserInfo = '@user/SET_USER_INFO',
  FetchUserInfo = '@user/FETCH_USER_INFO',
}

export const Actions = {
  increment: () => createAction(ETypes.Inc),
  decrement: (count: number = 1) => createAction(ETypes.Dec, { count }),
  setUserInfo: (userInfo: UserInfo) =>
    createAction(ETypes.SetUserInfo, { userInfo }),
  fetchUser: (login: string) => createAction(ETypes.FetchUserInfo, { login }),
};

export type TActions = ActionsUnion<typeof Actions>;
