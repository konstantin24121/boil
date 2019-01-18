import { ConnectionManager } from 'common/managers/ConnectionManager';
import { from, Observable } from 'rxjs';

export interface IGetUserInfoResponse {
  login: string;
  id: number;
  avatar_url: string;
}

export const Api = {
  getUserInfo: (login: string): Promise<IGetUserInfoResponse> =>
    ConnectionManager.rest<IGetUserInfoResponse>({
      path: ['user', login],
    }),
};
