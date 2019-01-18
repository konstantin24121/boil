import * as actions from './actions';
import { UserInfo } from './models';
import { Api } from './api';

export type IUserModuleState = {
  readonly count: number;
  readonly profile: UserInfo;
};

export type TUserModuleActions = typeof UserModuleActions;
export const UserModuleActions = actions.Actions;
export const UserApi = Api;
export const UserModels = { UserInfo };
