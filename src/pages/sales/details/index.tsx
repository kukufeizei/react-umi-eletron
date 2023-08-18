/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Drawer, Button, Space } from 'antd';
import Header from './header';
import EditTable from './editTable';
import { salesOrderInfo } from '@/api/sales';
import { useModel } from 'umi';
import { CloseOutlined } from '@ant-design/icons';
import RecordModal from '@/components/Record';
interface Types {
  type: string;
  currentOrderNo: string;
  setType: (type: string | undefined) => void;
}
const SaleDetailsDrawer: React.FC<Types> = ({ type, currentOrderNo, setType }) => {
  const { orderData, setOrderData } = useModel<any>('global');
  const [isModalOpen, setIsModalOpen] = useState<undefined | boolean>(false);
  const onClose = () => {
    setType(undefined);
  };

  const request = async () => {
    try {
      const res = await salesOrderInfo({
        source: 1,
        orderNo: currentOrderNo,
      });

      // 销售数量默认取计划采购数  供货类型如果没有返回值 则取默认现货
      res.data?.detailList?.forEach((item: any) => {
        item.supplyShouldNum = item.num;
        if (!item.supplyType) {
          item.supplyType = 10;
        }
      });

      res.success && setOrderData(res.data);
    } catch {
      throw new Error('请求失败');
    }
  };

  useEffect(() => {
    !!type && request();
  }, [type, currentOrderNo]);

  const title = () => {
    return (
      <>
        <span style={{ marginRight: '20px' }}>{type === 'view' ? '详情' : '确认'}</span>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          查看日志
        </Button>
      </>
    );
  };
  return (
    <Drawer
      destroyOnClose
      closable={false}
      bodyStyle={{ background: '#f5f5f5' }}
      title={title()}
      placement="right"
      onClose={onClose}
      width={'90%'}
      open={!!type}
      extra={
        <Space>
          <CloseOutlined onClick={onClose} />
        </Space>
      }
    >
      {orderData && <Header onClose={onClose} />}
      <div
        style={{
          padding: '14px',
          background: '#fff',
          overflow: 'auto',
          marginTop: '14px',
          height: 'calc(100vh - 300px)',
        }}
      >
        {orderData && <EditTable onClose={onClose} type={type} />}
      </div>

      {currentOrderNo && isModalOpen && (
        <RecordModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          orderNo={currentOrderNo}
          orderType={'SUPPLY_PURCHASE'}
        />
      )}
    </Drawer>
  );
};
export default SaleDetailsDrawer;
