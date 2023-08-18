import type { RefundListResultItem } from '@/api/model/refundModel';

export const columns: any[] = [
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    width: 200,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    width: 130,
    hideInSearch: true,
  },
  {
    title: '操作内容',
    dataIndex: 'content',
    width: 250,
    hideInSearch: true,
  },
];
