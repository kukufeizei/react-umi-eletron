import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type { LoginParams, UserInfoResult, ChangPwsParams } from '@/api/model/accountModel';
import type { DefaultBasicResult } from '@/api/model/basicResultModel';
// req
//   .request({
//     url: "/entire/list",
//     params: {
//       offset: 0,
//       size: 20,
//     },
//     headers: new AxiosHeaders(),
//   })
//   .then((res) => {
//     console.log(res.data);
//   });
// req
//   .post<IHomeData>({
//     url: "/home/highscore",
//     interceptors: {
//       requestSuccessFn: (config) => {
//         console.log("/home/highscore请求成功的拦截");
//         return config;
//       },
//       responseSuccessFn: (res) => {
//         console.log("/home/highscore响应成功的拦截");
//         return res;
//       },
//     },
//   })
//   .then((res) => {
//     console.log(res.list, res.subtitle, res.title, res.type, res._id);
//   });

// 登录
export const doLogin = (data: LoginParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SSO}/app/doLogin`,
    data,
  });

// 退出
export const doLogOut = () =>
  req.get<DefaultBasicResult>({
    url: `/sso/logout`,
  });

// 获取用户信息
export const getUserInfo = (data: any) =>
  req.post<UserInfoResult>({
    url: `${GatewayEnum.OPERATION}/perm/query/myInfo`,
    data,
  });

// 获取供应商信息
export const getCompanyInfo = (data: any) =>
  req.post<UserInfoResult>({
    url: `${GatewayEnum.CUSTOMER}/supplier/query/supplierInfo`,
    data,
  });

// 修改密码
export const postChangePws = (data: ChangPwsParams) =>
  req.post<DefaultBasicResult>({
    url: `usercenterApi/user/operate/modifyPassword`,
    data,
  });

// 员工账号
export const postTenantRelationUserList = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.OPERATION}/tenant/query/tenantRelationUserList`,
    data,
  });
