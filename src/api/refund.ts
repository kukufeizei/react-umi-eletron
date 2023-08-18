import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type {
  RefundListParams,
  RefundResultData,
  BackPrintParams,
  ReturnOrderDetailParams,
  OrderDetailListResult,
} from '@/api/model/refundModel';
import type { DefaultBasicResult } from './model/basicResultModel';

// 退货列表
export const refundCompanyList = (data: RefundListParams) =>
  req.post<RefundResultData>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/query/supplierList`,
    data,
  });

// 退货单打印
export const backPrint = (data: BackPrintParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/operate/backPrint`,
    data,
  });

// 退货单详情
export const refundDtail = (data: BackPrintParams) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.SUPPLY}/purchaseRefund/query/detail`,
    data,
  });

// 退货明细列表
export const returnOrderDetailList = (data: ReturnOrderDetailParams) =>
  req.post<OrderDetailListResult>({
    url: `${GatewayEnum.SUPPLY}/refundDetail/query/orderDetailList`,
    data,
  });
