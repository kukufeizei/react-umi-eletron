import { ReqClass } from './request';
import { message } from 'antd';
import { history } from 'umi';

interface resTypes {
  code?: number;
  data?: any;
  msg?: string;
  success?: boolean;
}
const url =
  process.env.REACT_APP_ENV === 'dev'
    ? 'https://sitapi.dingteng.tech'
    : 'https://dtapi.delight.tech';

const req = new ReqClass({
  baseURL: url,
  timeout: 30000,
  interceptors: {
    requestSuccessFn: (config) => {
      // console.log('请求成功的拦截', config);
      return config;
    },
    requestFailureFn: (err) => {
      console.log('请求失败的拦截', err);
      return err;
    },
    // @ts-ignore
    responseSuccessFn: (res: resTypes) => {
      const { code, msg } = res;
      if (code === 501) {
        message.error('请重新登录');

        localStorage.clear();
        history.replace({
          pathname: '/user/login',
        });
      } else if (code !== 0 && code !== 200) {
        message.error(msg || '请求失败');
      }
      return res;
    },
    // responseFailureFn: (err) => {
    //   console.log('响应失败', err);
    //   return err;
    // },
  },
});
export default req;
