import { getLodop } from '@/utils/Lodop/LodopFuncs';
import moment from 'moment';
// 创建销售单待打印模板
export const CreatePrintPageSales = (LODOP: any, data: any, index: number) => {
  const {
    brandName,
    useCarType,
    skuCode,
    saleOrderNo,
    factName,
    skuName,
    supplierId,
    vinCode,
    supplyShouldNum,
    scanContent,
    cutoffOrderTime,
    supplyPrintTime,
  } = data;
  LODOP.ADD_PRINT_HTM(8, 15, 180, 20, '<p>' + `${vinCode}` + '</p>');
  // LODOP.ADD_PRINT_IMAGE(10, 260, 62, 20, '<img src=' + `${titleImg}` + ' />');
  LODOP.ADD_PRINT_BARCODE(38, 260, 62, 62, 'QRCode', scanContent);
  LODOP.ADD_PRINT_HTM(28, 15, 200, 20, '<p>' + `${useCarType.substring(0, 20)}` + '</p>');
  LODOP.ADD_PRINT_HTM(48, 15, 280, 20, '<p>' + `${skuName.substring(0, 20)}` + '</p>');
  LODOP.ADD_PRINT_HTM(68, 15, 280, 20, '<p>' + `${skuName.substring(20, skuName.length)}` + '</p>');
  LODOP.ADD_PRINT_HTM(88, 15, 230, 20, '<p>' + `${factName}` + '</p>');
  LODOP.ADD_PRINT_HTM(108, 15, 180, 20, '<p>' + `${brandName}` + '</p>');
  LODOP.ADD_PRINT_HTM(128, 15, 250, 20, '<p>' + `${skuCode.substring(0, 30)}` + '</p>');
  LODOP.ADD_PRINT_HTM(108, 260, 100, 20, '<p>' + `${supplierId}` + '</p>');
  LODOP.ADD_PRINT_HTM(
    148,
    15,
    200,
    20,
    '<p>' + `${saleOrderNo || ''}${saleOrderNo ? '.' : ''}${supplyShouldNum}-${index}` + '</p>',
  );
  LODOP.ADD_PRINT_HTM(128, 255, 100, 20, '<p>' + `${supplyPrintTime || ''}` + '</p>');
  LODOP.ADD_PRINT_HTM(148, 255, 100, 20, '<p>' + `${cutoffOrderTime || ''}` + '</p>');
};

// 创建单个退供单待打印模板
export const CreatePrintPageRefund = (LODOP: any, data: any) => {
  const { brandName, useCarType, skuCode, refundNo, factName, skuName, supplierName, vinCode } =
    data;
  LODOP.ADD_PRINT_HTM(8, 15, 180, 20, '<p>' + `${vinCode || ''}` + '</p>');
  // LODOP.ADD_PRINT_IMAGE(10, 260, 62, 20, '<img src=' + `${titleImg}` + ' />');
  LODOP.ADD_PRINT_BARCODE(38, 260, 62, 62, 'QRCode', refundNo);
  LODOP.ADD_PRINT_HTM(28, 15, 200, 20, '<p>' + `${useCarType.substring(0, 20)}` + '</p>');
  LODOP.ADD_PRINT_HTM(48, 15, 180, 20, '<p>' + `${skuName}` + '</p>');
  LODOP.ADD_PRINT_HTM(68, 15, 230, 20, '<p>' + `${factName}` + '</p>');
  LODOP.ADD_PRINT_HTM(88, 15, 180, 20, '<p>' + `${brandName}` + '</p>');
  LODOP.ADD_PRINT_HTM(108, 15, 250, 20, '<p>' + `${skuCode}` + '</p>');
  LODOP.ADD_PRINT_HTM(128, 15, 200, 20, '<p>' + `${supplierName}` + '</p>');
  LODOP.ADD_PRINT_HTM(148, 15, 170, 20, '<p>' + `${refundNo}` + '</p>');
  LODOP.ADD_PRINT_HTM(148, 255, 100, 20, '<p>' + `${moment().format('YYYY-MM-DD')}` + '</p>');
};

// 循环多个任务，任务中循环页数，分页分任务
export const MTaskByMpage = (data: any, actionType: any, source: string) => {
  const LODOP = getLodop();
  LODOP.PRINT_INIT(''); // 初始化在外循环中
  LODOP.SET_PRINT_MODE('CATCH_PRINT_STATUS', true);
  if (LODOP.CVERSION) {
    LODOP.SET_PRINT_PAGESIZE(1, 900, 500, 'lss');
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      source === 'sales'
        ? CreatePrintPageSales(LODOP, data[i], i + 1)
        : CreatePrintPageRefund(LODOP, data[i]);
      LODOP.NewPage();
    }
  } else {
    console.log('c-lodop出错了');
  }
  LODOP[actionType]();
};
