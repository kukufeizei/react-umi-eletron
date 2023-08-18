import type { DefaultBasicResultList, DefaultBasicResult } from './basicResultModel';

export interface QuoteListParams {
  page: number;
  pageSize: number;
  enquiryNO?: string;
  vinCode?: string;
  enquiryBy?: string;
  carModel?: string;
  startCreateTime?: string;
  endCreateTime?: string;
  status?: number[];
  willTimeout?: number;
  timeout?: number;
}

export interface QuoteResultItem {
  id: number;
  upstreamEnquiryNo: string;
  pushTime: string;
  pushTimeDesc: string;
  vinCode: string;
  carInfo: string;
  enquiryBy: string;
  status: number;
  statusDesc: string;
  willTimeout: number;
  timeout: number;
  deadlineTime: string;
  deadlineTimeDesc: string;
}

export type QuoteResultData = DefaultBasicResultList<QuoteResultItem[]>;

export interface QuerySupplierSkuParams {
  oeCode: string;
  qualityId: number;
  brandId: number;
}

export interface QuerySupplierSkuParams {
  oeCode: string;
  qualityId: number;
  brandId: number;
}

export interface SupplierSkuResultSingle {
  id: number;
  supplierId?: number;
  supplierDesc?: string;
  supplierSkuCode?: string | undefined | null;
  supplierSkuName?: string;
  firmProductCode?: string;
  dealPrice?: number;
  skuId?: number;
  dtSkuCode?: string;
  dtSkuName?: string;
  basicCategoryDesc?: string;
  brandId?: number;
  brandIdDesc?: string;
  qualityId?: number;
  qualityIdDesc?: string;
  oftenStockUp?: number;
  oftenStockUpDesc?: string;
  oeCode?: string;
  qualityGroup?: number;
  qualityGroupDesc?: string;
  recentPurchasePriceId?: number;
  recentPurchasePrice?: number | undefined | null;
  needAdd?: number;
  quotePriceSource?: number;
  brandName?: string;
  qualityGroupId?: number;
}

export type SupplierSkuResultData = DefaultBasicResult<SupplierSkuResultSingle>;

export interface QueryInfoParams {
  queryId: number;
}

export interface ResultInfoDataSingle {
  id?: number;
  vinCode?: string;
  carInfo?: CarInfo;
  upstreamEnquiryNo?: string;
  supplierQuoteNo?: string;
  pushTime?: Date;
  countdown?: number;
  status?: number;
  fileUrls?: string[];
  enquiryBy?: string;
  willTimeout?: number;
  timeout?: number;
  enquiryDetails?: EnquiryDetail[];
}

export interface CarInfo {
  carBrand?: string;
  carModel?: string;
  yearStyle?: string;
  carBrandCategory?: string;
}

export interface EnquiryDetail {
  title?: string;
  id?: number;
  upstreamEnquiryNo?: string;
  dtSkuId?: number;
  stock?: any;
  price?: any;
  dtSkuCode?: string;
  rowSpan?: number;
  newAdd?: any;
  skuName?: string;
  skuStandardName?: string;
  num?: number;
  oeCode?: string;
  brandId?: number;
  taxQuotePrice?: any;
  brandName?: string;
  qualityId?: number;
  qualityName?: string;
  supplierOeCode?: string | undefined | null;
  supplierSkuCode?: string | undefined | null;
  dealPrice?: number | undefined | null;
  quotePriceSource?: number;
  quotePriceSourceDesc?: string;
  supplyType?: number;
  orderDays?: string;
  stockOut?: number;
  qualityGroupId?: number;
  quoteStatus?: number;
  lineSource?: number;
  remark?: string;
  lapse?: number;
  supplierSkuName?: string | undefined | null;
  quoteStatusDesc?: string;
  supplierSkuId?: number | undefined | null;
  recentPurchasePrice?: number | undefined | null;
  needAdd?: number;
  enquiryQuality?: number;
  enquiryQualityDesc?: string;
}

export type ResultInfoData = DefaultBasicResult<ResultInfoDataSingle>;

export interface QuoteParams {
  upstreamEnquiryNo: string;
  enquiryQuoteDetails: EnquiryQuoteDetail[];
}

export interface EnquiryQuoteDetail {
  id?: number;
  skuName?: string;
  qualityId?: number;
  qualityName?: string;
  supplierOeCode?: string | undefined | null;
  supplierSkuCode?: string | undefined | null;
  brandId?: number;
  brandName?: string;
  taxQuotePrice?: number;
  supplyType?: number;
  orderDays?: string;
  stockOut: number;
  quoteStatus: number;
  lineSource: number;
  remark?: string;
  lapse: number;
  oeCode?: string;
  num: number;
  dtSkuId?: number;
  supplierSkuName?: string | undefined | null;
  supplierSkuId?: number | undefined | null;
  recentPurchasePrice?: number | undefined | null;
  needAdd?: number;
  quotePriceSource: number;
  enquiryQuality?: number;
}

export interface DeleteRowsParams {
  batchIds: number[];
}

export interface BrandByQualityParams {
  enquiryQuality: number;
  brandName?: string;
}

export interface BrandByQualityData {
  id?: number;
  brandCode?: string;
  name?: string;
  engName?: string;
  logo?: string;
  status?: number;
  statusDesc?: string;
  qualityId?: number;
  qualityName?: string;
  qualityGroupId?: number;
  qualityGroupName?: string;
  prodPlace?: number;
  prodPlaceDesc?: string;
}

export type BrandByQualityResult = DefaultBasicResult<BrandByQualityData[]>;
