export interface DefaultBasicParams {
  page?: number;
  pageSize?: number;
}

export interface DefaultBasicResult<T = any> {
  code?: number;
  data?: T;
  msg?: string;
  success?: boolean;
}

export interface DefaultBasicResultList<T = any> {
  code?: number;
  data?: {
    total: number;
    current: number;
    pageSize: number;
    list?: T;
  };
  msg?: string;
  success?: boolean;
}
