import type { RefundListResultItem } from '@/api/model/refundModel';

export const columns: any[] = [
  {
    title: '销售单号',
    dataIndex: 'orderNo',
    width: 150,
    fixed: 'left',
    onCell: (record: any, index: number) => {
      return { rowSpan: record.rowSpan };
    },
  },
  {
    title: '供应商单号',
    dataIndex: 'supplyOrderNo',
    width: 180,
  },
  {
    title: '商品编码',
    dataIndex: 'skuCode',
    width: 300,
    hideInSearch: true,
  },
  {
    title: '商品名称',
    dataIndex: 'skuName',
    width: 250,
    hideInSearch: true,
  },
  {
    title: '车型',
    dataIndex: 'useCarType',
    width: 200,
    hideInSearch: true,
  },
  {
    title: '厂牌',
    dataIndex: 'factName',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '品质',
    dataIndex: 'qualityName',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '销售数量',
    dataIndex: 'supplyShouldNum',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '销售单价（元）',
    dataIndex: 'supplyPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '对账单价（元）',
    dataIndex: 'financeUnitPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '对账金额（元）',
    dataIndex: 'financePrice',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '整单金额（元）',
    dataIndex: 'totalFinancePrice',
    width: 180,
    hideInSearch: true,
    onCell: (record: any, index: number) => {
      return { rowSpan: record.rowSpan };
    },
  },
  {
    title: '状态',
    dataIndex: 'statusDesc',
    width: 100,
    hideInSearch: true,
    onCell: (record: any, index: number) => {
      return { rowSpan: record.rowSpan };
    },
  },
  {
    title: '打印时间',
    dataIndex: 'supplyPrintTime',
    width: 180,
    hideInSearch: true,
  },
];
