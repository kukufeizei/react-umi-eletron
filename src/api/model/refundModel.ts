import type { DefaultBasicResultList, DefaultBasicParams } from './basicResultModel';

export interface RefundListParams {
  page?: number;
  pageSize?: number;
  pno?: string;
  newPno?: string;
  oem?: string;
  pname?: string;
  createTimeBegin?: string;
  createTimeEnd?: string;
  queryType?: number;
  orderByAsc?: string;
  no?: string;
}

export interface RefundListResultItem {
  id: string;
  refundOrderNo?: string;
  refundNo?: string;
  pno?: string;
  pName?: string;
  oem?: string;
  newPno?: string;
  factName?: string;
  useCarType?: string;
  num?: string;
  unitMoney?: string;
  totalMoney?: string;
  status?: number;
  createTime?: Date;
  signTime?: string;
  produceId?: number;
  brandIdDesc?: string;
  qualityIdDesc?: string;
  statusDesc?: string;
  no?: string;
  sureTime?: string;
}

export type RefundResultData = DefaultBasicResultList<RefundListResultItem[]>;

export interface BackPrintParams {
  refundNos: string[];
}

export interface ReturnOrderDetailParams extends DefaultBasicParams {
  source?: number;
  refundNo?: string;
  saleRefundNo?: string;
  orderNo?: string;
  type?: number;
  refundReason?: number;
  status?: number;
  payStatus?: number;
  supplierId?: number;
  skuId?: number;
  factId?: number;
  qualityId?: number;
  createTimeBegin?: Date;
  createTimeEnd?: Date;
}

export interface OrderDetailListResultItem {
  id?: number;
  refundNo?: string;
  orderNo?: string;
  wareHouseNo?: string;
  saleRefundNo?: string;
  type?: number;
  typeDesc?: string;
  status?: number;
  statusDesc?: string;
  payStatus?: number;
  payStatusDesc?: string;
  refundReason?: number;
  refundReasonDesc?: string;
  tenantId?: number;
  supplierId?: number;
  supplierName?: string;
  skuId?: number;
  skuName?: string;
  skuCode?: string;
  factId?: number;
  factName?: string;
  qualityId?: number;
  qualityName?: string;
  purchaseNum?: number;
  purchaseSupplyPrice?: number;
  inventoryNum?: number;
  refundNum?: number;
  refundPrice?: number;
  remark?: string;
  createBy?: string;
  createTime?: Date;
}

export type OrderDetailListResult = DefaultBasicResultList<OrderDetailListResultItem[]>;
