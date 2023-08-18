import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type {
  SalesOrderParams,
  SalesOrderResultData,
  SalesInfoParams,
  SalesOrderInfoResultData,
  SalesOrderConfirmParams,
  SalesOrderEditParams,
  DetailPrintParams,
  RecordListParams,
  RecordListResult,
} from '@/api/model/salesModel';

import type { DefaultBasicResult } from './model/basicResultModel';

// 采购单列表-订单维度
export const salesOrderList = (data: SalesOrderParams) =>
  req.post<SalesOrderResultData>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/query/orderList`,
    data,
  });

// 采购单列表-明细维度
export const salesOrderDetailList = (data: SalesOrderParams) =>
  req.post<SalesOrderResultData>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderDetail/query/orderDetailList`,
    data,
  });

// 采购单详情
export const salesOrderInfo = (data: SalesInfoParams) =>
  req.post<SalesOrderInfoResultData>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/query/orderInfo`,
    data,
  });

// 采购单确认
export const salesOrderConfirm = (data: SalesOrderConfirmParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/operate/orderConfirm`,
    data,
  });

// 修改采购单基础信息
export const salesOrderEdit = (data: SalesOrderEditParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/operate/orderEdit`,
    data,
  });

// 打印回调
export const detailPrintCallback = (data: DetailPrintParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderDetail/operate/detailPrintCallback`,
    data,
  });

// 打印预览
export const previewDetailPrint = (data: DetailPrintParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderDetail/query/detailPrint`,
    data,
  });

// 日志查询
export const recordList = (data: RecordListParams) =>
  req.post<RecordListResult>({
    url: `${GatewayEnum.SUPPLY}/record/query/recordList`,
    data,
  });

// 数量统计
export const orderDetailCount = (data: SalesOrderParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderDetail/query/orderDetailCount`,
    data,
  });
