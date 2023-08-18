export const columns: any[] = [
  {
    title: '对账周期',
    dataIndex: 'financeMonth',
    valueType: 'dateMonth',
  },
  {
    title: '对账员',
    dataIndex: 'adminName',
    hideInSearch: true,
  },
  {
    title: '对账金额（元）',
    dataIndex: 'financePrice',
    hideInSearch: true,
  },
  {
    title: '月对账状态',
    dataIndex: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '待确认',
        status: 0,
      },
      1: {
        text: '已确认',
        status: 1,
      },
    },
    render: (_: any, record: any) => {
      return record.statusDesc;
    },
  },
];
