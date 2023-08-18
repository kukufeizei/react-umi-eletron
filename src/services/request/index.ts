import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { OWNRequestConfig } from './Type';
import { RequestEnum } from '@/enums/httpEnum';

class ReqClass {
  instance: AxiosInstance;
  constructor(config: OWNRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (config) => {
        config.headers.appCode = 'supplier';
        config.headers.dt_sessionId = localStorage.getItem('dt_sessionId');
        config.headers.appVersion = 'v1.0.0';
        // console.log("全局请求成功的拦截");
        return config;
      },
      (err) => {
        console.log('全局请求失败拦截', err);
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应成功的拦截");
        return res.data;
      },
      (err) => {
        console.log('全局响应失败的拦截', err);
        return err;
      },
    );

    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.requestSuccessFn,
        config.interceptors?.requestFailureFn,
      );
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn,
      );
    }
  }

  request<T = any>(config: OWNRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      // eslint-disable-next-line no-param-reassign
      config = config.interceptors.requestSuccessFn(config);
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: OWNRequestConfig<T>) {
    return this.request({ ...config, method: RequestEnum.GET });
  }
  post<T = any>(config: OWNRequestConfig<T>) {
    return this.request({ ...config, method: RequestEnum.POST });
  }
  delete<T = any>(config: OWNRequestConfig<T>) {
    return this.request({ ...config, method: RequestEnum.DELETE });
  }
  patch<T = any>(config: OWNRequestConfig<T>) {
    return this.request({ ...config, method: RequestEnum.PATCH });
  }
  put<T = any>(config: OWNRequestConfig<T>) {
    return this.request({ ...config, method: RequestEnum.PUT });
  }
}
export { ReqClass };
