/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import styles from './index.less';
import { Descriptions } from 'antd';
import type { PurchaseFinanceMonthListItem } from '@/api/model/billModel';

interface Types {
  currentData: PurchaseFinanceMonthListItem;
}
const Header: React.FC<Types> = ({ currentData }) => {
  return (
    <div className={styles.orderHeader}>
      <div>
        <Descriptions column={5}>
          <Descriptions.Item label="对账周期">{currentData?.financeMonth}</Descriptions.Item>
          <Descriptions.Item label="对账单号">{currentData?.financeNo}</Descriptions.Item>
          <Descriptions.Item label="供应商名称">{currentData?.supplierName}</Descriptions.Item>
          <Descriptions.Item label="对账状态">{currentData?.statusDesc}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default Header;
