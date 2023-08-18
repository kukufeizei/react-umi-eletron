interface TabsProps {
  key?: string;
  label: string;
  count?: number;
  name?: string;
}
export const quoteTabItems: TabsProps[] = [
  {
    key: '4',
    label: `全部`,
  },
  {
    key: '1',
    label: `待报价`,
    name: 'waitQuote',
  },
  {
    key: '2',
    label: `报价中`,
    name: 'afootQuote',
  },
  {
    key: '3',
    label: `已报价`,
    name: 'alreadyQuote',
  },
];

export const refundTabItems: TabsProps[] = [
  {
    key: '1',
    label: `全部`,
    count: 0,
    name: 'allCount',
  },
  {
    key: '2',
    label: `待签收`,
    count: 0,
    name: 'waitSigningCount',
  },
  {
    key: '3',
    label: `已签收`,
    count: 0,
    name: 'signedCount',
  },
];

export const orderTabItems: TabsProps[] = [
  // {
  //   key: 'undefined',
  //   label: `全部`,
  //   count: 0,
  //   name: 'allCount',
  // },
  {
    key: '0',
    label: `待确认`,
    count: 0,
    name: 'waitConfirmCount',
  },
  {
    key: '20',
    label: `待审核`,
    count: 0,
    name: 'waitReviewCount',
  },
  {
    key: '30',
    label: `待打印`,
    count: 0,
    name: 'waitPrintCount',
  },
  {
    key: '40',
    label: `待签收`,
    count: 0,
    name: 'waitSignCount',
  },
  {
    key: '45',
    label: `部分签收`,
    count: 0,
    name: 'sectionSignCount',
  },
  {
    key: '50',
    label: `已完成`,
    count: 0,
    name: 'completeCount',
  },
  {
    key: '-1',
    label: `已取消`,
    count: 0,
    name: 'closeCount',
  },
];

export const salesBillTabItemsDays: TabsProps[] = [
  {
    key: 'undefined',
    label: `全部`,
    count: 0,
    name: 'allCount',
  },
  {
    key: '0',
    label: `待供对账`,
    count: 0,
    name: 'financeSupplyCount',
  },
  {
    key: '1',
    label: `申诉处理中`,
    count: 0,
    name: 'disputeCount',
  },
  {
    key: '2',
    label: `待采对账`,
    count: 0,
    name: 'financeCount',
  },
  {
    key: '3',
    label: `对账完成`,
    count: 0,
    name: 'financeSuccessCount',
  },
];

export const salesBillTabItemsMonth: TabsProps[] = [
  {
    key: 'undefined',
    label: `全部`,
    count: 0,
    name: 'allCount',
  },
  {
    key: '0',
    label: `待确认`,
    count: 0,
    name: 'waitConfirmCount',
  },
  {
    key: '1',
    label: `已确认`,
    count: 0,
    name: 'confirmCount',
  },
];

export const salesBillTabItems: TabsProps[] = [
  {
    key: '60',
    label: `待对账`,
    count: 0,
    name: 'financeSupplyCount',
  },
  {
    key: '70',
    label: `待收款`,
    name: 'disputeCount',
    count: 0,
  },
  {
    key: '80',
    label: `已收款`,
    count: 0,
    name: 'paySuccessCount',
  },
];

export const salesRefundTabItems: TabsProps[] = [
  {
    key: '3',
    label: `待对账`,
    count: 0,
    name: 'signedCount',
  },
  {
    key: '4',
    label: `审核通过`,
    count: 0,
    name: 'finishCount',
  },
  {
    key: '5',
    label: `审核不过`,
    count: 0,
    name: 'rejectCount',
  },
];

export const purchaseFinanceOrderInfoItems: TabsProps[] = [
  {
    key: '1',
    label: `销售明细`,
  },
  {
    key: '2',
    label: `退供明细`,
  },
];
