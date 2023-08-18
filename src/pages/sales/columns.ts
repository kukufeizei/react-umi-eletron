export const columns: any[] = [
  {
    title: '订单类型',
    dataIndex: 'type',
    width: 100,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '备货',
        status: 0,
      },
      1: {
        text: '急件',
        status: 1,
      },
    },
    render: (_text: any, record: any) => {
      return record.typeDesc;
    },
  },
  {
    title: '计划采购总数',
    dataIndex: 'totalNum',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '计划采购总价（元）',
    dataIndex: 'planMoney',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '交货仓库',
    dataIndex: 'wareHouseName',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '采购员',
    dataIndex: 'adminName',
    width: 100,
  },
  {
    title: '供应商单号',
    dataIndex: 'supplyOrderNo',
    width: 100,
  },
  {
    title: '履约时间',
    dataIndex: 'urgentDeliveryTime',
    width: 100,
    hideInSearch: true,
  },
];

export const detailsColumns: any[] = [
  {
    title: '订单类型',
    dataIndex: 'typeDesc',
    width: 100,
    valueType: 'select',
    valueEnum: {
      0: {
        text: '备货',
        status: 0,
      },
      1: {
        text: '急件',
        status: 1,
      },
    },
  },
  {
    title: '应出仓时间',
    dataIndex: '-',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '应送达时间',
    dataIndex: '-',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '商品编码',
    dataIndex: 'skuCode',
    width: 250,
    hideInSearch: true,
  },
  {
    title: '商品名称',
    dataIndex: 'skuName',
    width: 260,
    hideInSearch: true,
  },
  {
    title: '厂牌',
    dataIndex: 'factName',
    width: 150,
    hideInSearch: true,
  },
  {
    title: '车型',
    dataIndex: 'useCarType',
    width: 280,
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
    width: 100,
    hideInSearch: true,
  },
  {
    title: '销售数量',
    dataIndex: 'num',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '可供数量',
    dataIndex: 'supplyShouldNum',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '确认单价（元）',
    dataIndex: 'supplyPrice',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '供货类型',
    dataIndex: 'supplyType',
    width: 100,
    hideInSearch: true,
    render: (text: number) => {
      return text === 10 ? '现货' : '供货';
    },
  },
  {
    title: '交货仓库',
    dataIndex: 'supplyWareHouse',
    width: 100,
    hideInSearch: true,
  },
  {
    title: '采购员',
    dataIndex: 'adminName',
    width: 100,
  },
  {
    title: '供应商单号',
    dataIndex: 'supplyOrderNo',
    width: 130,
  },
  {
    title: 'OE码',
    dataIndex: 'oeCode',
    width: 120,
    hideInSearch: true,
  },
  {
    title: '配件商配件编码/OE码',
    dataIndex: '-',
    width: 180,
    hideInSearch: true,
  },
];
