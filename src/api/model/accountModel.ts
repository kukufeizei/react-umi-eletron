import type { DefaultBasicResult } from './basicResultModel';

export interface LoginParams {
  name: string;
  pwd: string;
}

export interface UserInfoData {
  avatar?: string;
  orgs?: any[];
  realName?: string;
  relationId?: string;
  relationType?: string;
  tenantId?: number;
  tenantCode?: number;
  tenantName?: string;
  userId?: number;
  roles?: any[];
  cnme?: string;
}

export interface ChangPwsParams {
  oldPwd: string;
  newPwd: string;
}

export type UserInfoResult = DefaultBasicResult<UserInfoData>;
