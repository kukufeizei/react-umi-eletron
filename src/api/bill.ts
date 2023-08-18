import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type {
  FinanceListParams,
  FinanceListResult,
  financeCountResult,
  RefundFinanceListParams,
  SupplierBatchAuditParams,
  SupplierAuditParams,
  ActualListResult,
  ActualListParams,
  ActualCountResult,
  FinanceAuditParamsDays,
  DisputeParmas,
  DisputeCancelParams,
  PurchaseFinanceMonthListParams,
  PurchaseFinanceMonthListResult,
  PurchaseFinanceMonthOrderInfoParams,
  PurchaseFinanceMonthOrderInfoResult,
} from '@/api/model/billModel';
import type { DefaultBasicResult } from './model/basicResultModel';

// 采购单对账
export const financeAudit = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/operate/financeAudit`,
    data,
  });

// 采购单对账列表
export const financeList = (data: FinanceListParams) =>
  req.post<FinanceListResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/query/financeList`,
    data,
  });

// 采购单对账 数量统计
export const financeCount = (data: FinanceListParams) =>
  req.post<financeCountResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/query/financeCount`,
    data,
  });

// 采购单 导出
export const exportFinanceList = (data: FinanceListParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrder/query/exportFinanceList`,
    data,
  });

// 退供单列表
export const refundFinanceList = (data: RefundFinanceListParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/query/financeList`,
    data,
  });

// 退供单批量审核
export const supplierBatchAudit = (data: SupplierBatchAuditParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/operate/supplierBatchAudit`,
    data,
  });

// 退供单单个审核
export const supplierAudit = (data: SupplierAuditParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/operate/supplierAudit`,
    data,
  });

// 入库对账列表
export const actualList = (data: ActualListParams) =>
  req.post<ActualListResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderActual/query/actualList`,
    data,
  });

// 入库对账列表数量统计
export const actualCount = (data: ActualListParams) =>
  req.post<ActualCountResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderActual/query/actualCount`,
    data,
  });

// 日对账确认
export const financeAuditDays = (data: FinanceAuditParamsDays) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderActual/operate/financeAudit`,
    data,
  });

// 供应商批量申诉
export const dispute = (data: DisputeParmas) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderActual/operate/dispute`,
    data,
  });

// 供应商取消申诉
export const disputeCancel = (data: DisputeCancelParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseOrderActual/operate/disputeCancel`,
    data,
  });

// 月对账单查询
export const purchaseFinanceMonthList = (data: PurchaseFinanceMonthListParams) =>
  req.post<PurchaseFinanceMonthListResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseFinance/query/orderList`,
    data,
  });

// 月对账单详情
export const purchaseFinanceMonthOrderInfo = (data: PurchaseFinanceMonthOrderInfoParams) =>
  req.post<PurchaseFinanceMonthOrderInfoResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseFinance/query/orderInfo`,
    data,
  });

// 月对账单确认
export const purchaseFinanceOrderConfirm = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseFinance/operate/orderConfirm`,
    data,
  });
