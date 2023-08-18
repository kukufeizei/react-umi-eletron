import type {
  DefaultBasicParams,
  DefaultBasicResultList,
  DefaultBasicResult,
} from './basicResultModel';

export interface SalesOrderParams extends DefaultBasicParams {
  source: number;
  status?: number;
  orderNo?: string;
  saleOrderNo?: string;
  supplierName?: string;
  adminName?: string;
  type?: number;
  supplyOrderNo?: string;
  createTimeBegin?: string;
  createTimeEnd?: string;
}

export interface SalesOrderResultItem {
  id: number;
  orderNo?: string;
  saleOrderNo?: string;
  adminName?: string;
  supplierName?: string;
  planMoney?: number;
  actualMoney?: number;
  type?: number;
  typeDesc?: string;
  status?: number;
  statusDesc?: string;
  totalNum?: number;
  totalSupplyShouldNum?: number;
  totalActualNum?: number;
  remark?: string;
  urgentDeliveryTime?: string;
  createTime?: string;
}

export type SalesOrderResultData = DefaultBasicResultList<SalesOrderResultItem[]>;

export interface SalesInfoParams {
  source: number;
  orderNo: string;
}

export interface SalesInfoData {
  id?: number;
  orderNo?: string;
  type?: number;
  typeDesc?: string;
  status?: number;
  statusDesc?: string;
  adminId?: number;
  adminName?: string;
  supplierId?: number;
  supplierName?: string;
  saleOrderNo?: string;
  supplyOrderNo?: string;
  payOrderNo?: string;
  totalNum?: number;
  totalSupplyShouldNum?: number;
  totalActualNum?: number;
  planMoney?: number;
  actualMoney?: number;
  wareHouse?: string;
  planType?: number;
  allowPayNo?: number;
  taxRate?: number;
  isInvoice?: number;
  isQuotaIntax?: number;
  remark?: string;
  adminFinanceTime?: string;
  supplyFinanceTime?: string;
  financeMoney?: number;
  financeRemark?: string;
  createBy?: string;
  createTime?: string;
  isMbTagsUser?: number;
  urgentDeliveryTime?: string;
  detailList?: DetailList[];
}

export interface DetailList {
  id?: number;
  orderNo?: string;
  type?: number;
  soldEmpty?: number;
  typeDesc?: string;
  status?: number;
  statusDesc?: string;
  skuId?: number;
  skuName?: string;
  skuCode?: string;
  oeCode?: string;
  brandName?: string;
  qualityName?: string;
  unit?: string;
  useCarType?: string;
  supplierId?: number;
  supplierName?: string;
  adminId?: number;
  adminName?: string;
  supplyOrderNo?: string;
  num?: number;
  supplyShouldNum?: number;
  actualNum?: number;
  packNum?: number;
  noSignNum?: number;
  salePrice?: number;
  purchaseUnitPrice?: number;
  supplyPrice?: number;
  financeUnitPrice?: number;
  supplyType?: number;
  supplyWareHouse?: string;
  supplyConfirmTime?: string;
  supplyPrintTime?: string;
  sweepTime?: string;
  packTime?: string;
  purchaseRemark?: string;
  supplyRemark?: string;
  createBy?: string;
  createTime?: string;
  expectPrepareTime?: string;
  expectDeliverTime?: string;
  actualPrepareTime?: string;
  timeoutPrepareMillisecondCount?: number;
  prepareTotalForfeit?: number;
  actualDeliverTime?: string;
  timeoutDeliverMillisecondCount?: number;
  deliverTotalForfeit?: number;
  totalPurchasePrice?: number;
  factName?: string;
  taxPurchasePrice?: number;
  noTaxPurchasePrice?: number;
  actualPurchasePrice?: number;
  settlementPrice?: number;
}

export type SalesOrderInfoResultData = DefaultBasicResult<SalesInfoData>;

export interface SalesOrderConfirmParams {
  orderNo: string;
  detailList: List[];
}

export interface List {
  id: number;
  orderNo: string;
  soldEmpty: number;
  supplyShouldNum: number;
  supplyType: number;
  supplyPrice: number;
  purchaseRemark?: string;
  purchaseUnitPrice?: number;
  supplyRemark?: string;
}

export interface SalesOrderEditParams {
  orderNo?: string;
  supplyWareName?: string;
  supplyOrderNo?: string;
  allowPayNo?: number;
  isInvoice?: number;
}

export interface DetailPrintParams {
  batchIds: string[];
}

export interface RecordListParams extends DefaultBasicParams {
  orderNo?: string;
  orderType?: string;
}

export interface RecordListItem {
  operateTime?: string;
  operator?: string;
  content?: string;
}

export type RecordListResult = DefaultBasicResultList<RecordListItem[]>;
