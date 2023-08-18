import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type { StatsOrderCountResult, StatsPriceTrendResult } from '@/api/model/homeModel';
import type { DefaultBasicResult } from './model/basicResultModel';

// 首页数据统计
export const homeStatsOrderCount = () =>
  req.get<StatsOrderCountResult>({
    url: `${GatewayEnum.SUPPLY}/homepage/query/statsOrderCount`,
  });

// 待报价 报价中
export const getQuoteCount = (data = {}) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/query/topCount`,
    data,
  });

// 查询最近15天销售额
export const homeStatsPriceTrend = () =>
  req.get<StatsPriceTrendResult>({
    url: `${GatewayEnum.SUPPLY}/homepage/query/statsPriceTrend`,
  });
