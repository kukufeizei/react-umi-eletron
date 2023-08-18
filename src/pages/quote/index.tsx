/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { pagingList } from '@/api/quote';
import { Button, Space, Tag } from 'antd';
import { columns } from './columns';
import type { QuoteListParams, QuoteResultItem } from '@/api/model/quoteModel';
import StatusTabComp from '@/components/StatusTab';
import { quoteTabItems } from '@/tabItems';
import DetailsDrawerComp from './details/index';
import { useModel } from 'umi';
import moment from 'moment';
import CopyIconCom from '@/components/CopyIcon';

const Quote = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentQueryId, setCurrentQueryId] = useState<number | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [tabs, setTabs] = useState<object[] | undefined>(quoteTabItems);
  const { setUpStreamEnquiryNo } = useModel<any>('global');
  // 分页入参
  const sendParams = useRef<QuoteListParams>({
    page: currentPage,
    pageSize: 20,
    status: [1],
  });

  // 分页请求
  const request = async (filter?: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }
    const { data } = await pagingList({ ...filter, ...sendParams.current });
    setTotal(data?.total as number);
    return {
      success: true,
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

  // 切换tab 重新请求
  const handleChangeTabs = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    key !== '4'
      ? (sendParams.current.status = [Number(key)])
      : (sendParams.current.status = undefined);
    // 这里加定时器是因为 每次切换tab reloadAndRest会有卡顿 待优化
    setTimeout(() => {
      if (actionRef.current) {
        // @ts-ignore
        actionRef.current?.reloadAndRest?.();
      }
    }, 300);
  };

  // 详情/报价
  const handleDetails = (viewType: string, record: QuoteResultItem) => {
    setType(viewType);
    setCurrentQueryId(record.id);
    setUpStreamEnquiryNo(record.upstreamEnquiryNo as string);
  };

  // 表格左侧头部
  const titleHtmlRender = () => {
    return (
      tabs && (
        <StatusTabComp items={tabs} handleChangeTabs={handleChangeTabs} defaultActiveKey={4} />
      )
    );
  };

  useEffect(() => {
    if (!type) {
      setTimeout(() => {
        if (actionRef.current) {
          // @ts-ignore
          actionRef.current?.reloadAndRest?.();
        }
      }, 300);
    }
  }, [type]);

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          scroll={{ y: 500, x: 1000 }}
          headerTitle={titleHtmlRender()}
          rowKey={(record: QuoteResultItem) => record?.id}
          key={'list-item'}
          search={{
            defaultCollapsed: false,
            labelWidth: 120,
          }}
          request={request}
          columns={[
            {
              title: '序号',
              render: (_text: string, _record: QuoteResultItem, index: number) => index + 1,
              width: 50,
              hideInSearch: true,
            },
            {
              title: '报价单号',
              dataIndex: 'supplierQuoteNo',
              width: 200,
              render: (text: any, record: QuoteResultItem) => {
                return (
                  <>
                    <span
                      className={'copy-number-style'}
                      onClick={() => handleDetails('view', record)}
                    >
                      {text}
                    </span>
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
              title: '询价单号',
              dataIndex: 'upstreamEnquiryNo',
              render: (text: any, record: QuoteResultItem) => {
                return (
                  <>
                    <span
                      className={'copy-number-style'}
                      onClick={() => handleDetails('view', record)}
                    >
                      {text}
                    </span>
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
              title: '报价截止时间',
              dataIndex: 'deadlineTimeDesc',
              hideInSearch: true,
              width: 240,
              render: (text: string, record: QuoteListParams) => {
                const timeOutFlag =
                  record.willTimeout === 1 &&
                  record.timeout !== 1 &&
                  [1, 2].includes(record.status as any);
                return (
                  <div>
                    {text}{' '}
                    <Tag color={timeOutFlag ? 'warning' : 'error'}>
                      {timeOutFlag ? '即将超时' : '已超时'}
                    </Tag>
                  </div>
                );
              },
            },
            ...columns,
            {
              title: '询价时间',
              dataIndex: 'createTime',
              width: 190,
              valueType: 'dateRange',
              render: (_, record) => {
                return <span>{record?.pushTimeDesc}</span>;
              },
              search: {
                transform: (value) => ({
                  startCreateTime: value[0],
                  startEndTime: value[1],
                }),
              },
              //设置默认值
              initialValue: [
                moment().subtract(7, 'days').format('YYYY-MM-DD'),
                moment().format('YYYY-MM-DD'),
              ],
            },
            {
              title: '操作',
              dataIndex: '',
              key: 'x',
              hideInSearch: true,
              render: (_, record) => (
                <>
                  <Space>
                    {[1, 2].includes(record.status) && (
                      <Button type="primary" onClick={() => handleDetails('quote', record)}>
                        报价
                      </Button>
                    )}
                    <Button onClick={() => handleDetails('view', record)}>详情</Button>
                  </Space>
                </>
              ),
            },
          ]}
          pagination={paginationProps}
        />
      </PageContainer>

      {currentQueryId && (
        <DetailsDrawerComp
          type={type}
          setType={setType}
          currentQueryId={currentQueryId as number}
        />
      )}
    </>
  );
};

export default Quote;
