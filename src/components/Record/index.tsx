import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Modal } from 'antd';
import { recordList } from '@/api/sales';
import type { RecordListParams, RecordListItem } from '@/api/model/salesModel';
import { columns } from './columns';

interface Types {
  isModalOpen?: boolean | undefined;
  setIsModalOpen: (bool: boolean) => void;
  orderNo?: string | undefined;
  orderType: string;
}
const RecordModal: React.FC<Types> = ({ isModalOpen, setIsModalOpen, orderNo, orderType }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const sendParams = useRef<RecordListParams>({
    page: currentPage,
    pageSize: 20,
    orderNo: orderNo,
    orderType: orderType,
  });

  // 分页
  const handlePageChange = (page: number) => {
    sendParams.current.page = page;
    setCurrentPage(page);
  };

  // 分页配置
  const paginationProps = {
    current: sendParams.current.page, //当前页码
    pageSize: sendParams.current.pageSize, // 每页数据条数
    total,
    onChange: (page: number) => handlePageChange(page),
    hideOnSinglePage: false,
    showSizeChanger: false,
  };

  // 日志列表
  const request = async (filter: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }
    const { data } = await recordList({ ...filter, ...sendParams.current });
    setTotal(data?.total as number);
    return {
      success: true,
      // @ts-ignore
      data: data?.list,
      total: data?.total,
    };
  };

  return (
    <>
      <Modal
        width={1200}
        footer={false}
        title="日志列表"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <ProTable
          search={false}
          scroll={{ y: 500, x: 450 }}
          rowKey={(record: RecordListItem) => record?.operateTime as string}
          key={'list-item-record'}
          request={request}
          columns={columns}
          pagination={paginationProps}
          toolBarRender={false}
        />
      </Modal>
    </>
  );
};

export default RecordModal;
