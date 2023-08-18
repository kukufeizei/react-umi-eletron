/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { returnOrderDetailList } from '@/api/refund';
import { columns } from './columns';
import type { OrderDetailListResultItem } from '@/api/model/refundModel';
import moment from 'moment';
import CopyIconCom from '@/components/CopyIcon';

interface SendParamsTypes {
  page: number;
  pageSize: number;
  source: number;
}

const Refund = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // 退货分页入参
  const sendParams = useRef<SendParamsTypes>({
    page: currentPage,
    pageSize: 20,
    source: 1,
  });

  // 退货分页请求
  const request = async (filter: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }
    const { data } = await returnOrderDetailList({ ...filter, ...sendParams.current });
    setTotal(data?.total as number);

    return {
      success: true,
      // @ts-ignore
      data: data?.list,
      total: data?.total,
    };
  };

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

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          scroll={{ y: 500, x: 1000 }}
          rowKey={(record: OrderDetailListResultItem) => record?.id as unknown as number}
          key={'list-item-refund'}
          search={{
            defaultCollapsed: false,
            labelWidth: 120,
          }}
          request={request}
          columns={[
            {
              title: '退货单号',
              dataIndex: 'refundNo',
              width: 200,
              fixed: 'left',
              render: (text: any) => {
                return (
                  <>
                    <span className={'copy-number-style'}>{text}</span>
                    {text && (
                      <span>
                        <CopyIconCom text={text} />
                      </span>
                    )}
                  </>
                );
              },
            },
            {
              title: '销售单号',
              dataIndex: 'orderNo',
              width: 200,
              render: (text: string) => {
                return (
                  <>
                    <span className={'copy-number-style'}>{text}</span>
                    {text && (
                      <span>
                        <CopyIconCom text={text} />
                      </span>
                    )}
                  </>
                );
              },
            },
            ...columns,
            {
              title: '创建时间',
              dataIndex: 'createTime',
              width: 190,
              valueType: 'dateRange',
              render: (_, record) => {
                return <span>{record?.createTime}</span>;
              },
              search: {
                transform: (value) => ({
                  createTimeBegin: value[0],
                  createTimeEnd: value[1],
                }),
              },
              //设置默认值
              initialValue: [
                moment().subtract(7, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
              ],
            },
          ]}
          pagination={paginationProps}
        />
      </PageContainer>
    </>
  );
};

export default Refund;
