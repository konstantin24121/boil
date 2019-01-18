import { IGetUserInfoResponse } from './api';

export class UserInfo {
  public static createFromJson(data: IGetUserInfoResponse): UserInfo {
    const userInfo = new UserInfo();
    userInfo.name = data.login;
    userInfo.id = data.id;
    userInfo.avatar = data.login;
    return userInfo;
  }
  public name: string;
  public id: number;
  public avatar: string;
}
