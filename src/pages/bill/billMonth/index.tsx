/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Space, Popconfirm } from 'antd';
import ProTable from '@ant-design/pro-table';
import { purchaseFinanceMonthList, purchaseFinanceOrderConfirm } from '@/api/bill';
import StatusTabComp from '@/components/StatusTab';
import { salesBillTabItemsMonth } from '@/tabItems';
import { columns } from './columns';
import BillMonthDetailsDrawer from './details';
import type { PurchaseFinanceMonthListItem } from '@/api/model/billModel';
import CopyIconCom from '@/components/CopyIcon';

/* 销售月对账 */
const BillSalesMonth = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[] | undefined>(undefined);
  const [tabs, setTabs] = useState<object[] | undefined>(salesBillTabItemsMonth);
  const [currentFinanceNo, setCurrentFinanceNo] = useState<string | undefined>(undefined);
  const [currentData, setCurrentData] = useState<any>(undefined);

  // 分页入参
  const sendParams = useRef<any>({
    page: currentPage,
    pageSize: 20,
    source: 1,
  });

  // 分页请求
  const request = async (filter: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }

    const { data } = await purchaseFinanceMonthList({ ...filter, ...sendParams.current });
    if (data) {
      // @ts-ignore
      Object.keys(data)?.forEach((key) => {
        tabs?.map((ele: any) => {
          if (ele.name === key) {
            // @ts-ignore
            ele.count = data[key];
          }
        });
      });
      setTabs([...(tabs as object[])]);
    }
    // @ts-ignore
    setTotal(data?.pageRsp.total as number);
    return {
      success: true,
      // @ts-ignore
      data: data?.pageRsp.list,
      // @ts-ignore
      total: data?.pageRsp.total,
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
    // @ts-ignore
    key === 'undefined'
      ? (sendParams.current.status = undefined)
      : (sendParams.current.status = key);
    // 这里加定时器是因为 每次切换tab reloadAndRest会有卡顿 待优化
    setTimeout(() => {
      if (actionRef.current) {
        // @ts-ignore
        actionRef.current?.reloadAndRest?.();
      }
    }, 300);
  };

  // 表格左侧头部
  const titleHtmlRender = () => {
    return tabs && <StatusTabComp items={tabs} handleChangeTabs={handleChangeTabs} />;
  };

  // 多选
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (keys: number) => {
      setSelectedRowKeys(keys as any);
    },
  };

  // 确认对账
  const handleSave = async (id: Number, type: string) => {
    const data = await purchaseFinanceOrderConfirm({
      idList: type === 'once' ? [id as number] : (selectedRowKeys as unknown as number[]),
    });
    if (data.success) {
      message.success('操作成功');
      setTimeout(() => {
        if (actionRef.current) {
          // @ts-ignore
          actionRef.current?.reloadAndRest?.();
        }
      }, 300);
    }
  };

  // 表格渲染工具栏
  const toolBarRender = () => {
    return [
      <div key={'item-btn-12'}>
        {sendParams.current.status == 0 && (
          <Space>
            <Button
              type="primary"
              disabled={!selectedRowKeys?.length}
              onClick={() => handleSave(0, 'batch')}
            >
              批量确认
            </Button>
          </Space>
        )}
      </div>,
    ];
  };

  // 详情
  const handleDetails = (record: PurchaseFinanceMonthListItem) => {
    setCurrentFinanceNo(record.financeNo);
    setCurrentData(record);
  };

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          headerTitle={titleHtmlRender()}
          scroll={{ y: 500, x: 1000 }}
          rowKey={(record: any) => record?.id}
          rowSelection={rowSelection}
          toolBarRender={() => toolBarRender()}
          search={{
            labelWidth: 120,
          }}
          request={request}
          columns={[
            {
              title: '对账单号',
              dataIndex: 'financeNo',
              render: (text: any, record: PurchaseFinanceMonthListItem) => {
                return (
                  <>
                    <span className={'copy-number-style'} onClick={() => handleDetails(record)}>
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
            ...columns,
            {
              title: '操作',
              dataIndex: 'operate',
              width: 230,
              hideInSearch: true,
              fixed: 'right',
              render: (_text: string, record: PurchaseFinanceMonthListItem) => {
                return (
                  <>
                    <Button
                      type="text"
                      size="small"
                      style={{ color: '#3d66e4', marginRight: '10px' }}
                      onClick={() => handleDetails(record)}
                    >
                      详情
                    </Button>
                    {record.status === 0 && (
                      <>
                        <Popconfirm
                          title="是否确认对账"
                          onConfirm={() => handleSave(record.id as number, 'once')}
                          okText="确认"
                          cancelText="取消"
                        >
                          <Button type="text" size="small" style={{ color: '#3d66e4' }}>
                            确认
                          </Button>
                        </Popconfirm>
                      </>
                    )}
                  </>
                );
              },
            },
          ]}
          pagination={paginationProps}
        />
      </PageContainer>

      {/* 详情 */}
      {currentFinanceNo && (
        <BillMonthDetailsDrawer
          currentData={currentData}
          currentFinanceNo={currentFinanceNo as string}
          setCurrentFinanceNo={setCurrentFinanceNo}
        />
      )}
    </>
  );
};

export default BillSalesMonth;
