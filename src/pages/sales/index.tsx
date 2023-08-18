/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  salesOrderList,
  salesOrderDetailList,
  salesOrderEdit,
  orderDetailCount,
} from '@/api/sales';
import { columns, detailsColumns } from './columns';
import type { SalesOrderResultItem } from '@/api/model/salesModel';
import StatusTabComp from '@/components/StatusTab';
import { orderTabItems } from '@/tabItems';
import { Space, Button, Modal, Input, message } from 'antd';
import SaleDetailsDrawer from './details';
import PreviewPrintModal from '@/components/PreviewPrint';
import { useModel } from 'umi';
import moment from 'moment';
import CopyIconCom from '@/components/CopyIcon';
import StatusColorCom from '@/components/StatusColorCom';

interface sendRefTypes {
  page: number;
  pageSize: number;
  source: number;
  status?: number | undefined | string;
}

const Sales = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { currentOrderNo, setCurrentOrderNo } = useModel<any>('global');
  const [inputVal, setInputVal] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>(undefined);
  const [tabs, setTabs] = useState<object[] | undefined>(orderTabItems);
  // 分页入参
  const sendParams = useRef<sendRefTypes>({
    page: currentPage,
    pageSize: 20,
    source: 1,
    status: 0,
  });

  // 数量统计
  const getTopCount = async (filter: any) => {
    const res = await orderDetailCount({ ...filter, ...sendParams.current });
    if (res?.data) {
      Object.keys(res?.data)?.forEach((key) => {
        tabs?.map((ele: any) => {
          if (ele.name === key) {
            // @ts-ignore
            ele.count = res?.data[key];
          }
        });
      });
      setTabs([...(tabs as object[])]);
    }
  };

  // 订单分页请求
  const request = async (filter: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }
    const api = [30, 40, 45, 50, -1].includes(Number(sendParams.current.status as number))
      ? salesOrderDetailList
      : salesOrderList;

    const { data } = await api({ ...filter, ...sendParams.current });
    getTopCount(filter);
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

  // table header tab
  const titleHtmlRender = () => {
    return tabs && <StatusTabComp items={tabs} handleChangeTabs={handleChangeTabs} />;
  };

  /**
   * 确认 && 详情
   * @param record 当前行数据
   * @param type 操作类型
   */

  const handleClick = (record: SalesOrderResultItem, handleType: string) => {
    setCurrentOrderNo(record.orderNo);
    setTimeout(() => {
      setType(handleType);
    }, 200);
  };

  // 改仓
  const handleChange = (orderNo: string) => {
    setInputVal(undefined);
    setCurrentOrderNo(orderNo);
    setIsModalOpen(true);
  };

  // 改仓
  const handleOk = async () => {
    if (!inputVal) return message.error('请输入内容');
    const data = await salesOrderEdit({
      orderNo: currentOrderNo,
      supplyWareName: inputVal,
    });
    data.success && message.success('改仓成功');
    setIsModalOpen(false);
  };

  const handlePreviewPrint = (id: string) => {
    setCurrentId(id);
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

  useEffect(() => {
    if (!currentId) {
      setTimeout(() => {
        if (actionRef.current) {
          // @ts-ignore
          actionRef.current?.reloadAndRest?.();
        }
      }, 300);
    }
  }, [currentId]);

  // 全部 待确认 待审核 展示 columns
  // 待打印 待签收 已完成 已取消 展示 detailsColumns
  const setColumns = () => {
    return [
      {
        title: '销售单号',
        dataIndex: 'orderNo',
        width: 200,
        render: (text: any, record: any) => {
          return (
            <>
              <span className={'copy-number-style'} onClick={() => handleClick(record, 'view')}>
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
        title: () => {
          return (
            <>
              {[30, 40, 50, 45, -1].includes(Number(sendParams.current.status) as number)
                ? '明细状态'
                : '订单状态'}
            </>
          );
        },
        dataIndex: 'statusDesc',
        width: 100,
        hideInSearch: true,
        render: (text: any, record: any) => {
          return <StatusColorCom status={record.status} statusDesc={text} />;
        },
      },
      ...([30, 40, 50, 45, -1].includes(Number(sendParams.current.status) as number)
        ? detailsColumns
        : columns),
      {
        title: '下单时间',
        dataIndex: 'createTime',
        width: 190,
        valueType: 'dateRange',
        render: (_: any, record: any) => {
          return <span>{record?.createTime}</span>;
        },
        search: {
          transform: (value: any) => ({
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
      {
        title: '操作',
        dataIndex: 'operate',
        width: 180,
        valueType: 'dateRange',
        hideInSearch: true,
        fixed: 'right',
        render: (_: any, record: any) => {
          return (
            <Space>
              {record.status === 0 && (
                <Button
                  type="text"
                  style={{ color: '#3d66e4' }}
                  onClick={() => handleClick(record, 'save')}
                >
                  确认
                </Button>
              )}
              <Button
                type="text"
                style={{ color: '#3d66e4' }}
                onClick={() => handleClick(record, 'view')}
              >
                详情
              </Button>
              {record.status === 0 && (
                <Button
                  type="text"
                  style={{ color: '#3d66e4' }}
                  onClick={() => handleChange(record.orderNo as string)}
                >
                  改仓
                </Button>
              )}
              {[30, 40, 45].includes(record.status) && sendParams.current.status && (
                <Button
                  type="text"
                  style={{ color: '#3d66e4' }}
                  onClick={() => handlePreviewPrint(record.id as unknown as string)}
                >
                  打印预览
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  };

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          headerTitle={titleHtmlRender()}
          scroll={{ y: 500, x: 1000 }}
          rowKey={(record: SalesOrderResultItem) => record?.id}
          key={'list-item'}
          search={{
            labelWidth: 120,
            defaultCollapsed: false,
          }}
          request={request}
          columns={setColumns()}
          pagination={paginationProps}
        />
      </PageContainer>

      {currentOrderNo && (
        <SaleDetailsDrawer
          type={type as string}
          setType={setType}
          currentOrderNo={currentOrderNo as string}
        />
      )}

      {/* 改仓 */}
      <Modal
        title="改仓"
        width={400}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="请输入"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </Modal>
      {/* 打印预览 */}
      {currentId && (
        <PreviewPrintModal currentId={currentId} setCurrentId={setCurrentId} source={'sales'} />
      )}
    </>
  );
};

export default Sales;
