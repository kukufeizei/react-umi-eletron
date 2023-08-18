/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { purchaseFinanceMonthOrderInfo } from '@/api/bill';
import { columns, refundColums } from './column';
import StatusTabComp from '@/components/StatusTab';
import { purchaseFinanceOrderInfoItems } from '@/tabItems';
import type { PurchaseFinanceMonthOrderInfoData } from '@/api/model/billModel';

interface Types {
  currentFinanceNo: string | undefined;
}

const DetailsTable: React.FC<Types> = ({ currentFinanceNo }) => {
  const [tabs] = useState<object[] | undefined>(purchaseFinanceOrderInfoItems);
  const [dataSource, setDataSource] = useState<PurchaseFinanceMonthOrderInfoData | any>([]);
  const [tableKey, setTableKey] = useState<string | undefined | number>(1);
  // 分页请求
  const request = async () => {
    const { data } = await purchaseFinanceMonthOrderInfo({
      financeNo: currentFinanceNo as string,
      source: 1,
    });
    setDataSource(data as PurchaseFinanceMonthOrderInfoData);
  };

  // 切换tab 重新请求
  const handleChangeTabs = (key: string) => {
    setTableKey(key);
  };

  useEffect(() => {
    request();
  }, [currentFinanceNo]);

  return (
    <>
      <StatusTabComp items={tabs} handleChangeTabs={handleChangeTabs} />
      <Table
        scroll={{ y: 500, x: 1000 }}
        rowKey={(record: any) => record?.id}
        pagination={false}
        locale={{ emptyText: '暂无数据' }}
        dataSource={tableKey == '1' ? dataSource?.actualList : dataSource?.refundList}
        columns={tableKey == '1' ? columns : refundColums}
      />
    </>
  );
};

export default DetailsTable;
