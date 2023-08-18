/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect } from 'react';
import { Drawer, Space } from 'antd';
import Header from './header';
import { purchaseFinanceMonthOrderInfo } from '@/api/bill';
import { useModel } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
import type { PurchaseFinanceMonthListItem } from '@/api/model/billModel';
import DetailsTable from './table';

interface Types {
  currentFinanceNo: string | undefined;
  setCurrentFinanceNo: (str: any) => void;
  currentData: PurchaseFinanceMonthListItem;
}
const BillMonthDetailsDrawer: React.FC<Types> = ({
  currentFinanceNo,
  setCurrentFinanceNo,
  currentData,
}) => {
  const { orderData, setOrderData } = useModel<any>('global');
  const onClose = () => {
    setCurrentFinanceNo(undefined);
  };

  const request = async () => {
    try {
      const res = await purchaseFinanceMonthOrderInfo({
        source: 1,
        financeNo: currentFinanceNo as string,
      });

      res.success && setOrderData(res.data);
    } catch {
      throw new Error('请求失败');
    }
  };

  useEffect(() => {
    !!currentFinanceNo && request();
  }, [currentFinanceNo]);

  return (
    <Drawer
      destroyOnClose
      closable={false}
      bodyStyle={{ background: '#f5f5f5' }}
      title={'详情'}
      placement="right"
      onClose={onClose}
      width={'90%'}
      open={!!currentFinanceNo}
      extra={
        <Space>
          <CloseOutlined onClick={onClose} />
        </Space>
      }
    >
      {orderData && <Header currentData={currentData} />}
      <div
        style={{
          padding: '14px',
          background: '#fff',
          overflow: 'auto',
          marginTop: '14px',
          height: 'calc(100vh - 300px)',
        }}
      >
        {currentFinanceNo && <DetailsTable currentFinanceNo={currentFinanceNo} />}
      </div>
    </Drawer>
  );
};
export default BillMonthDetailsDrawer;
