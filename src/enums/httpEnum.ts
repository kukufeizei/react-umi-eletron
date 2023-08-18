// 请求方式
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// request headers content-type 类型
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}

// 网关
export enum GatewayEnum {
  SSO = '/ssoApi',
  CUSTOMER = '/customerApi',
  OPERATION = '/operationApi',
  PURCHASE = '/purchaseApi',
  FRONT = '/frontApi',
  SCM = '/scmApi',
  ITEM = '/itemApi',
  SUPPLY = '/supplyApi',
}
