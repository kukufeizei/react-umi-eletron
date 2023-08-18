import type { AxiosResponse, AxiosRequestConfig } from 'axios';
export interface OWNInterceptos<T = AxiosResponse> {
  requestSuccessFn?: (config: any) => any;
  requestFailureFn?: (err: any) => any;
  responseSuccessFn?: (res: T) => T;
  responseFailureFn?: (err: any) => any;
}

export interface OWNRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: OWNInterceptos<T>;
}
