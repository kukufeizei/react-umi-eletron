/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState } from 'react';
import styles from './index.less';
import { Descriptions, Input, message } from 'antd';
import { useModel } from 'umi';
import { salesOrderEdit } from '@/api/sales';

const Header: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { orderData } = useModel<any>('global');
  const [saveFlag, setSaveFlag] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const { currentOrderNo } = useModel('global');
  const handleClick = async (type: string) => {
    // 编辑
    if (type === 'edit') {
      setValue(orderData.supplyOrderNo);
    }
    //保存
    if (type == 'save') {
      const res = await salesOrderEdit({
        orderNo: currentOrderNo,
        supplyOrderNo: value,
      });
      res.success && message.success('修改成功');
      onClose();
      setValue(value);
    }

    setSaveFlag(!saveFlag);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.orderHeader}>
      <div>
        <Descriptions column={5}>
          <Descriptions.Item label="销售单号">
            <span style={{ fontWeight: 'bold' }}>{orderData?.orderNo}</span>
          </Descriptions.Item>
          <Descriptions.Item label="类型">
            <span style={{ color: orderData?.type ? 'red' : '#3d66e4' }}>
              {orderData?.typeDesc}
            </span>
          </Descriptions.Item>
          {/* <Descriptions.Item label="报价车型">123123123</Descriptions.Item> */}
          <Descriptions.Item label="下单时间">{orderData?.createTime}</Descriptions.Item>
          <Descriptions.Item label="交货仓库">
            {orderData?.wareHouseName || '暂无'}
          </Descriptions.Item>
          <Descriptions.Item label="采购员">{orderData?.adminName}</Descriptions.Item>
          <Descriptions.Item label="状态">{orderData?.statusDesc}</Descriptions.Item>
          <Descriptions.Item label="履约送达时间">
            <span style={{ color: orderData?.urgentDeliveryTime && 'red' }}>
              {orderData?.urgentDeliveryTime || '暂无'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="供应商单号">
            {!saveFlag ? (
              <span>{orderData.supplyOrderNo || '暂无'}</span>
            ) : (
              <Input
                placeholder="请输入"
                size="small"
                style={{ width: '150px' }}
                value={value}
                onChange={handleChange}
              />
            )}
            <span>
              <span className={styles.save} onClick={() => handleClick('edit')}>
                {!saveFlag && '编辑'}
              </span>
              <span className={styles.save} onClick={() => handleClick('save')}>
                {saveFlag && '确认'}
              </span>
              <span className={styles.save} onClick={() => handleClick('cancel')}>
                {saveFlag && '取消'}
              </span>
            </span>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
};

export default Header;
