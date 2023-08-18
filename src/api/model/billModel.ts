import type {
  DefaultBasicResult,
  DefaultBasicResultList,
  DefaultBasicParams,
} from './basicResultModel';

export interface FinanceAuditParams {
  orderNo?: string;
  auditType?: number;
  auditResult?: number;
  financeRemark?: string;
  failReason?: string;
  detailList?: DetailList[];
}

export interface DetailList {
  id?: number;
  financeUnitPrice?: number;
}

export interface FinanceListParams {
  page?: number;
  pageSize?: number;
  status?: number;
  orderNo?: string;
  supplyOrderNo?: string;
  createTimeBegin?: Date;
  createTimeEnd?: Date;
}

export interface RefundFinanceListParams {
  page?: number;
  pageSize?: number;
  refundNo?: string;
  skuCode?: string;
  skuName?: string;
  brandName?: string;
  createStartTime?: Date;
  createEndTime?: Date;
  status?: number;
}

export interface FinanceListItem {
  id?: number;
  orderNo?: string;
  type?: number;
  typeDesc?: string;
  status?: number;
  statusDesc?: string;
  totalFinancePrice?: number;
  createTime?: Date;
  detailList?: DetailList[];
}

export interface DetailList {
  id?: number;
  orderNo?: string;
  supplyOrderNo?: string;
  createTime?: Date;
  skuId?: number;
  skuName?: string;
  skuCode?: string;
  factName?: string;
  useCarType?: string;
  brandName?: string;
  qualityName?: string;
  supplyShouldNum?: number;
  supplyPrice?: number;
  financeUnitPrice?: number;
  financePrice?: number;
  supplyPrintTime?: Date;
}

export type FinanceListResult = DefaultBasicResultList<FinanceListItem[]>;

export interface FinanceListData {
  financeSupplyCount?: number;
  waitPayCount?: number;
  paySuccessCount?: number;
}

export type financeCountResult = DefaultBasicResult<FinanceListData>;

export interface SupplierBatchAuditParams {
  refundNos: string[];
}

export interface SupplierAuditParams {
  refundNo: string;
  auditStatus: number;
  remark?: string;
}

export interface ActualListParams extends DefaultBasicParams {
  source?: number;
  status?: number | undefined;
  orderNo?: string;
  type?: number;
  saleOrderNo?: string;
  supplierName?: string;
  adminName?: string;
  supplyOrderNo?: string;
  actualDateBegin?: string;
  actualDateEnd?: string;
}

export interface ActualListItem {
  id?: number;
  actualDate?: Date;
  orderNo?: string;
  supplyOrderNo?: string;
  type?: number;
  typeDesc?: string;
  adminId?: number;
  adminName?: string;
  supplierId?: number;
  supplierName?: string;
  skuCode?: string;
  skuName?: string;
  factId?: number;
  factName?: string;
  useCarType?: string;
  brandId?: number;
  brandName?: string;
  qualityId?: number;
  qualityName?: string;
  supplyShouldNum?: number;
  actualNum?: number;
  wareHouseCode?: string;
  wareHouseName?: string;
  supplyPrice?: number;
  financeUnitPrice?: number;
  status?: number;
  statusDesc?: string;
  disputeContent?: string;
  disputeFileUrlList?: string[];
  disputeFileUrl?: string;
  rejectReason?: string;
  detailId?: number;
}

export type ActualListResult = DefaultBasicResultList<ActualListItem[]>;

export interface ActualCountData {
  allCount?: number;
  financeSupplyCount?: number;
  disputeCount?: number;
  financeCount?: number;
  financeSuccessCount?: number;
}

export type ActualCountResult = DefaultBasicResult<ActualCountData>;

export interface FinanceAuditParamsDays {
  idList?: number[];
  auditType?: number;
}

export interface DisputeParmas {
  idList: number[];
  disputeFileUrlList?: any[];
  disputeContent?: string;
}

export interface DisputeCancelParams {
  idList: number[];
}

export interface PurchaseFinanceMonthListParams extends DefaultBasicParams {
  source?: number;
  financeMonth?: string;
  financeNo?: string;
  status?: number;
}

export interface PurchaseFinanceMonthListItem {
  id?: number;
  financeMonth?: string;
  financeNo?: string;
  status?: number;
  statusDesc?: string;
  adminId?: number;
  adminName?: string;
  supplierId?: number;
  supplierName?: string;
  financePrice?: number;
}

export type PurchaseFinanceMonthListResult = DefaultBasicResultList<PurchaseFinanceMonthListItem[]>;

export interface PurchaseFinanceMonthOrderInfoParams {
  source: number;
  financeNo: string;
}

export interface PurchaseFinanceMonthOrderInfoData {
  id?: number;
  financeMonth?: string;
  financeNo?: string;
  status?: number;
  tenantId?: number;
  adminId?: number;
  adminName?: string;
  supplierId?: number;
  supplierName?: string;
  financePrice?: number;
  createBy?: string;
  createTime?: Date;
  updateBy?: string;
  updateTime?: Date;
  actualList?: ActualList[];
  refundList?: RefundList[];
}

export interface ActualList {
  actualDate?: Date;
  saleOrderNo?: string;
  supplyOrderNo?: string;
  type?: number;
  typeDesc?: string;
  adminId?: number;
  adminName?: string;
  skuId?: number;
  skuCode?: string;
  skuName?: string;
  brandId?: number;
  brandName?: string;
  actualNum?: number;
  supplyPrice?: number;
  financeUnitPrice?: number;
  totalFinancePrice?: number;
  status?: number;
  statusDesc?: string;
}

export interface RefundList {
  refundNo?: string;
  orderNo?: string;
  salesOrderNo?: string;
  salesRefundNo?: string;
  supplierOrderNo?: string;
  supplierId?: number;
  supplierName?: string;
  skuId?: number;
  skuName?: string;
  skuCode?: string;
  brandId?: number;
  brandName?: string;
  warehouseCode?: string;
  warehouseName?: string;
  totalPrice?: number;
  signingTime?: Date;
}

export type PurchaseFinanceMonthOrderInfoResult =
  DefaultBasicResult<PurchaseFinanceMonthOrderInfoData>;
