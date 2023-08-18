export const columns: any[] = [
  {
    title: '退货类型',
    dataIndex: 'typeDesc',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '退货原因',
    dataIndex: 'refundReason',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '退货状态',
    dataIndex: 'status',
    width: 160,
    valueType: 'select',
    valueEnum: {
      '-1': {
        text: '已取消',
        status: -1,
      },
      '0': {
        text: '待审核',
        status: 0,
      },
      '1': {
        text: '待出库',
        status: 1,
      },
      '2': {
        text: '待签收',
        status: 2,
      },
      '3': {
        text: '已签收',
        status: 3,
      },
      '4': {
        text: '已拒收',
        status: 4,
      },
    },
    render: (_text: any, record: any) => {
      return record.statusDesc;
    },
  },
  {
    title: '退款状态',
    dataIndex: 'payStatus',
    width: 80,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '待退款',
        status: 0,
      },
      1: {
        text: '已退款',
        status: 1,
      },
    },
    render: (_text: any, record: any) => {
      return record.payStatusDesc;
    },
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
    title: '销售数量',
    dataIndex: 'purchaseNum',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '销售单价（元）',
    dataIndex: 'purchaseSupplyPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '销售金额（元）',
    dataIndex: 'totalPurchaseSupplyPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '退货数量',
    dataIndex: 'refundNum',
    width: 110,
    hideInSearch: true,
  },
  {
    title: '退货金额（元）',
    dataIndex: 'refundPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
    hideInSearch: true,
  },
];
