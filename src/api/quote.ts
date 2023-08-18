import req from '@/services/index';
import { GatewayEnum } from '@/enums/httpEnum';
import type {
  QuoteListParams,
  QuoteResultData,
  QuerySupplierSkuParams,
  SupplierSkuResultData,
  QueryInfoParams,
  ResultInfoData,
  QuoteParams,
  DeleteRowsParams,
  BrandByQualityParams,
  BrandByQualityResult,
} from '@/api/model/quoteModel';
import type { DefaultBasicResult } from '@/api/model/basicResultModel';

// 报价列表
export const pagingList = (data: QuoteListParams) =>
  req.post<QuoteResultData>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/query/pagingList`,
    data,
  });

// 报价-明细列表
export const getInfo = (data: QueryInfoParams) =>
  req.post<ResultInfoData>({
    url: `${GatewayEnum.CUSTOMER}//enquiry/query/info`,
    data,
  });

// 供应商配件匹配
export const querySupplierSku = (data: QuerySupplierSkuParams) =>
  req.post<SupplierSkuResultData>({
    url: `${GatewayEnum.CUSTOMER}/supplierSku/query/querySupplierSku`,
    data,
  });

// 报价
export const postQuote = (data: QuoteParams) =>
  req.post<DefaultBasicResult | any>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/operate/quote`,
    data,
  });

// 暂存
export const postStaging = (data: QuoteParams) =>
  req.post<DefaultBasicResult | any>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/operate/staging`,
    data,
  });

// 删除行
export const deleteRows = (data: DeleteRowsParams) =>
  req.post<DefaultBasicResult | any>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/operate/deleteRows`,
    data,
  });

// 获取品质
export const getQualityList = (data: any) =>
  req.post<any>({
    url: `/operationApi/system/query/dictKV`,
    data,
  });

// 获取品牌
export const getBrandByQuality = (data: BrandByQualityParams) =>
  req.post<BrandByQualityResult>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/query/listItemBrandByQualityByGroupIds`,
    data,
  });

// tabs 数量统计
export const topCount = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.CUSTOMER}/enquiry/query/topCount`,
    data,
  });

// 维护配件商编码
export const buildFittings = (data: any) =>
  req.post<DefaultBasicResult>({
    url: `${GatewayEnum.CUSTOMER}/supplierSku/operate/buildFittings`,
    data,
  });
