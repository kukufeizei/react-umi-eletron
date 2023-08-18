import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Input, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { refundFinanceList, supplierBatchAudit, supplierAudit } from '@/api/bill';
import { columns } from './columns';
import StatusTabComp from '@/components/StatusTab';
import { salesRefundTabItems } from '@/tabItems';
import moment from 'moment';

const BillRefund = () => {
  const actionRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [recordData, setRecordData] = useState<object | any>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabs, setTabs] = useState<object[] | undefined>(salesRefundTabItems);
  const { TextArea } = Input;

  // 退货分页入参
  const sendParams = useRef({
    page: currentPage,
    pageSize: 20,
    status: 3,
  });

  // 操作成功回调函数
  const successCallback = (flag: boolean) => {
    if (flag) {
      setIsModalOpen(false);
      message.success('操作成功');
      setTimeout(() => {
        if (actionRef.current) {
          // @ts-ignore
          actionRef.current?.reloadAndRest?.();
        }
      }, 300);
    }
  };

  // 退货分页请求
  const request = async (filter: any) => {
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }
    const { data } = await refundFinanceList({ ...filter, ...sendParams.current });
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
    setTotal(data?.total as number);
    return {
      success: true,
      data: data?.refund?.list,
      total: data?.refund?.total,
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
    sendParams.current.status = Number(key);
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

  // 批量通过
  const handleClickBatch = async () => {
    const data = await supplierBatchAudit({ refundNos: selectedRowKeys as string[] });
    successCallback(data.success as boolean);
  };

  // 表格渲染工具栏
  const toolBarRender = () => {
    return [
      <div key={'item-btn-2'}>
        <Button type="primary" disabled={!selectedRowKeys.length} onClick={handleClickBatch}>
          批量通过
        </Button>
      </div>,
    ];
  };

  // 对账
  const handleChange = async (record: any, auditResult: number) => {
    setRecordData(record);
    if (!auditResult) return setIsModalOpen(true);
    const data = await supplierAudit({
      refundNo: record.refundNo,
      auditStatus: auditResult,
      remark: undefined,
    });
    successCallback(data.success as boolean);
  };

  const handleOk = async () => {
    if (!value) return message.warning('请输入不通过理由');
    const data = await supplierAudit({
      refundNo: recordData.refundNo,
      auditStatus: 2,
      remark: value,
    });
    successCallback(data.success as boolean);
  };

  // 多选
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  const handleChangeVal = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          headerTitle={titleHtmlRender()}
          scroll={{ y: 500, x: 1000 }}
          rowKey={(record: any) => record?.refundNo}
          rowSelection={rowSelection}
          key={'list-item'}
          toolBarRender={() => toolBarRender()}
          search={{
            labelWidth: 120,
            defaultCollapsed: false,
          }}
          request={request}
          columns={[
            ...columns,
            {
              title: '下单时间',
              dataIndex: 'createTime',
              width: 190,
              valueType: 'dateRange',
              render: (_, record) => {
                return <span>{record?.createTime}</span>;
              },
              search: {
                transform: (val: any) => ({
                  createStartTime: val[0],
                  createEndTime: val[1],
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
              width: 200,
              hideInSearch: true,
              fixed: 'right',
              onCell: (record: any, index: number) => {
                return { rowSpan: record.rowSpan };
              },
              render: (_text: string, record: any) => {
                return (
                  <>
                    {record.status === 3 && (
                      <>
                        <Button
                          type="text"
                          style={{ color: '#3d66e4', marginRight: '10px' }}
                          onClick={() => handleChange(record, 1)}
                        >
                          通过
                        </Button>
                        <Button type="text" onClick={() => handleChange(record, 0)}>
                          不通过
                        </Button>
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

      <Modal open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <TextArea
          rows={4}
          placeholder="请输入不通过理由"
          maxLength={200}
          value={value}
          onChange={handleChangeVal}
        />
      </Modal>
    </>
  );
};

export default BillRefund;
