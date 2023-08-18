/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import React, { useEffect } from 'react';
import { Drawer, message, Space } from 'antd';
import GlobalHeader from './header';
import ViewTable from './viewTable/index';
import EditTable from './editTable/index';
import { CloseOutlined } from '@ant-design/icons';
import { getInfo } from '@/api/quote';
import { useModel } from 'umi';
import { trans, mergeCells } from '@/utils/utils';
interface Types {
  type: string | undefined;
  setType: (type: string | undefined) => void;
  currentQueryId: number;
}

const DetailsDrawer: FC<Types> = ({ type, setType, currentQueryId }) => {
  const { quoteData, setQuoteData } = useModel<any>('global');

  // 详情数据
  const getData = async () => {
    try {
      const res = await getInfo({
        queryId: currentQueryId,
      });

      res.data?.enquiryDetails!.map((item) => {
        item.title = `${item.oeCode}${item.skuName}${item.num}`;
      });

      const _data = mergeCells(trans(res.data), 'title');
      setQuoteData(_data);
    } catch {
      message.error('请求失败，请稍后重试');
    }
  };

  useEffect(() => {
    !!type && getData();
  }, [type, currentQueryId]);

  const onClose = () => {
    setType(undefined);
  };

  return (
    <Drawer
      destroyOnClose
      closable={false}
      bodyStyle={{ background: '#f5f5f5' }}
      title={type === 'view' ? '详情' : '报价'}
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
      {quoteData && <GlobalHeader />}
      <div
        style={{
          padding: '14px',
          background: '#fff',
          marginTop: '14px',
          overflow: 'auto',
          height: 'calc(100vh - 280px)',
        }}
      >
        {type === 'view' ? <ViewTable /> : <EditTable onClose={onClose} />}
      </div>
    </Drawer>
  );
};

export default DetailsDrawer;
