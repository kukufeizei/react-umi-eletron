import type { QuoteListParams } from '@/api/model/quoteModel';

export const columns: any[] = [
  {
    title: '车型',
    dataIndex: 'carModel',
    width: 220,
    hideInSearch: true,
  },
  {
    title: 'VIN码',
    dataIndex: 'vinCode',
  },
  {
    title: '状态',
    dataIndex: 'statusDesc',
    hideInSearch: true,
    width: 70,
  },
  {
    title: '询价员',
    dataIndex: 'enquiryBy',
    width: 90,
  },
];
