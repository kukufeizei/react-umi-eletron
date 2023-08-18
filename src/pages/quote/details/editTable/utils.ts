import type { EnquiryDetail } from '@/api/model/quoteModel';

export const trans = (data: any[]) => {
  const cache = {};
  const indices: any[] = [];
  data.forEach((item, i) => {
    const title = item.title;
    // @ts-ignore
    const index = cache[title];
    if (index !== undefined) {
      indices[index].push(i);
    } else {
      // @ts-ignore
      cache[title] = indices.length;
      indices.push([i]);
    }
  });

  const result: any[] = [];
  indices.forEach((item) => {
    item.forEach((index: any) => {
      result.push(data[index]);
    });
  });
  return result;
};

// 处理合并
export const mergeCells = (data: any[], field: string) => {
  data.map((item) => (item.rowSpan = 1));
  let count = 0; //重复项的第一项
  let indexCount = 1; //下一项
  while (indexCount < data.length) {
    const item = data.slice(count, count + 1)[0]; //获取没有比较的第一个对象
    if (item[field] === data[indexCount][field]) {
      //第一个对象与后面的对象相比，有相同项就累加，并且后面相同项设置为0
      item.rowSpan++;
      data[indexCount].rowSpan = 0;
    } else {
      count = indexCount;
    }
    indexCount++;
  }
  return data;
};

// 切换品牌 做匹配赋值  老项目逻辑移过来的
export const setTargetObj = (info: any) => {
  let setVal: EnquiryDetail = {};
  if (info) {
    setVal = {
      dealPrice: info.dealPrice,
      stock: info.stock,
      supplierSkuCode: info.supplierSkuCode,
      newAdd: info.newAdd,
      supplierSkuId: info.dealPrice ? info.id : null,
    };
    if (info.supplierSkuName) setVal.supplierSkuName = info.supplierSkuName;
    if (info.qualityGroupDesc) setVal.qualityName = info.qualityGroupDesc;
    if (info.qualityGroup) setVal.qualityId = info.qualityGroup;
    if (info.oeCode) setVal.supplierOeCode = info.oeCode;
    if (info.skuId) setVal.dtSkuId = info.skuId;
    if (info.quotePriceSource) {
      setVal.quotePriceSource = info.quotePriceSource;
      setVal.recentPurchasePrice = info.recentPurchasePrice;
      setVal.taxQuotePrice = info.recentPurchasePrice;
      if (info.quotePriceSource === 3) {
        setVal.quotePriceSourceDesc = '采购价';
      }
      if (info.quotePriceSource === 2 && info.dealPrice) {
        setVal.quotePriceSourceDesc = '一口价';
      }
    } else {
      setVal.quotePriceSource = 1;
      setVal.recentPurchasePrice = null;
    }

    if (info.dealPrice) {
      setVal.taxQuotePrice = info.dealPrice;
    }
  } else {
    setVal = {
      newAdd: 2,
      dealPrice: null,
      stock: null,
      supplierSkuCode: null,
      supplierOeCode: null,
      supplierSkuName: null,
      supplierSkuId: null,
      price: null,
      taxQuotePrice: null,
      recentPurchasePrice: null,
    };
  }

  return setVal;
};
