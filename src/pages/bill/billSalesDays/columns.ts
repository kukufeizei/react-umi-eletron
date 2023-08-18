import moment from 'moment';
export const columns: any[] = [
  {
    title: '供应商单号',
    dataIndex: 'supplyOrderNo',
    width: 300,
  },
  {
    title: '发货时间',
    dataIndex: 'actualDate',
    width: 190,
    valueType: 'dateRange',
    render: (_: any, record: any) => {
      return record?.actualDate;
    },
    search: {
      transform: (value: any) => ({
        actualDateBegin: value[0],
        actualDateEnd: value[1],
      }),
    },
    //设置默认值
    initialValue: [
      moment().subtract(7, 'days').format('YYYY-MM-DD'),
      moment().format('YYYY-MM-DD'),
    ],
  },
  {
    title: '订单类型',
    dataIndex: 'typeDesc',
    width: 130,
    hideInSearch: true,
  },
  {
    title: '采购员',
    dataIndex: 'adminName',
    width: 130,
    hideInSearch: true,
  },
  {
    title: '鼎腾配件编码',
    dataIndex: 'skuCode',
    width: 200,
    hideInSearch: true,
  },
  {
    title: '配件名称',
    dataIndex: 'skuName',
    width: 130,
    hideInSearch: true,
  },
  {
    title: '品牌',
    dataIndex: 'brandName',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '供报价（元）',
    dataIndex: 'supplyPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '发货数量',
    dataIndex: 'actualNum',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '对账金额（元）',
    dataIndex: 'financeUnitPrice',
    width: 180,
    hideInSearch: true,
  },
  {
    title: '状态',
    dataIndex: 'statusDesc',
    width: 100,
    hideInSearch: true,
  },
];
