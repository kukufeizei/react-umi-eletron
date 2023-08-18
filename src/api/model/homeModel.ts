import type { DefaultBasicResult } from './basicResultModel';

export interface StatsOrderCountData {
  purchaseWaitConfirm?: number;
  purchaseWaitPrint?: number;
  purchaseWaitSign?: number;
  refundWaitSign?: number;
  refundWaitFinance?: string;
  refundWaitPay?: string;
  purchaseTimeOutWare?: number;
  purchaseTimeOutServe?: number;
  purchaseTimeOutWareAmount?: string;
  purchaseTimeOutServeAmount?: string;
  refundNumber?: number;
  refundTotalMoney?: string;
  purchaseWaitFinance?: string;
  purchaseWaitPay?: string;
}

export interface StatsPriceTrendData {
  todayAmount?: string;
  yesterdayAmount?: string;
  monthAmount?: string;
  yearAmount?: string;
  xaxisData?: string[];
  seriesYearData?: string[];
  seriesLastYearData?: string[];
}

export type StatsOrderCountResult = DefaultBasicResult<StatsOrderCountData>;

export type StatsPriceTrendResult = DefaultBasicResult<StatsPriceTrendData>;
