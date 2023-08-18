import type { RefundListResultItem } from '@/api/model/refundModel';

export const columns: any[] = [
  {
    title: '退货单号',
    dataIndex: 'refundNo',
    width: 150,
    fixed: 'left',
  },
  {
    title: '销售单号',
    dataIndex: 'orderNo',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '供应商单号',
    dataIndex: 'supplierOrderNo',
    width: 180,
  },
  {
    title: '签收时间',
    dataIndex: 'signingTime',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '商品编码',
    dataIndex: 'skuCode',
    width: 260,
    hideInSearch: true,
  },
  {
    title: '商品名称',
    dataIndex: 'skuName',
    width: 180,
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
    title: '退货数量',
    dataIndex: 'num',
    width: 80,
    hideInSearch: true,
  },
  {
    title: '退款单价（元）',
    dataIndex: 'price',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '退款金额（元）',
    dataIndex: 'totalPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'statusDesc',
    width: 180,
    hideInSearch: true,
  },
];
