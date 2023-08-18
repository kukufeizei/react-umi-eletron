import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Input, message } from 'antd';
import ProTable from '@ant-design/pro-table';
import { financeList, financeAudit, exportFinanceList, financeCount } from '@/api/bill';
import { columns } from './columns';
import StatusTabComp from '@/components/StatusTab';
import { salesBillTabItems } from '@/tabItems';
import { mergeCellsBillSalesList } from '@/utils/utils';
import { getBase64Type, dataURLtoBlob } from '@/utils/fileTypeTransform';
import moment from 'moment';

const BillSales = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recordData, setRecordData] = useState<object>({});
  const [value, setValue] = useState<string | undefined>(undefined);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<object | undefined>(undefined);
  const [tabs, setTabs] = useState<object[] | undefined>(salesBillTabItems);
  const { TextArea } = Input;

  // 分页入参
  const sendParams = useRef({
    page: currentPage,
    pageSize: 20,
    status: 60,
  });

  // 数量统计
  const getTopCount = async (filter: any) => {
    const res = await financeCount({ ...filter, ...sendParams.current });
    // @ts-ignore
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

  // 分页请求
  const request = async (filter: any) => {
    setFilterData(filter);
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }

    const { data } = await financeList({ ...filter, ...sendParams.current });
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

  // 对数据做处理
  const setData = (data: any) => {
    const arr: any = [];
    data.forEach((res: any) => {
      res.detailList.forEach((item: any) => {
        item.totalFinancePrice = res.totalFinancePrice;
        item.statusDesc = res.statusDesc;
      });
      arr.push(...res.detailList);
    });

    return mergeCellsBillSalesList(arr, 'orderNo');
  };

  const handleChangeVal = (e: any) => {
    setValue(e.target.value);
  };

  // 对账
  const handleChange = async (record: any, auditResult: number) => {
    setRecordData(record);
    if (!auditResult) return setIsModalOpen(true);
    const data = await financeAudit({
      orderNo: record.orderNo,
      auditType: 1,
      auditResult: auditResult,
      failReason: undefined,
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

  const handleOk = async () => {
    if (!value) return message.warning('请输入不通过理由');
    const data = await financeAudit({
      // @ts-ignore
      orderNo: recordData.orderNo,
      auditType: 1,
      auditResult: 1,
      failReason: value,
    });
    if (data.success) {
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

  // 导出
  const handleExport = async () => {
    setExportLoading(true);
    const res = await exportFinanceList({ ...filterData, ...sendParams.current });
    const base64File = getBase64Type('xlsx') + `${res.data}`;
    const blob = dataURLtoBlob(base64File);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.target = '_blank';
    a.download = '对账-销售单.xlsx';
    a.click();
    document.body.removeChild(a);
    // @ts-ignore
    window.URL.revokeObjectURL(blob);
    setExportLoading(false);
  };

  // 表格渲染工具栏
  const toolBarRender = () => {
    return [
      <div key={'item-btn-12'}>
        {/* <Button type="primary" style={{ marginRight: '10px' }}>批量通过</Button> */}
        <Button type="primary" onClick={handleExport} loading={exportLoading}>
          导出
        </Button>
      </div>,
    ];
  };

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          headerTitle={titleHtmlRender()}
          scroll={{ y: 500, x: 1000 }}
          rowKey={(record: any, index: number) => index}
          toolBarRender={() => toolBarRender()}
          search={{
            defaultCollapsed: false,
            labelWidth: 120,
          }}
          request={request}
          postData={setData}
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
                  createTimeBegin: val[0],
                  createTimeEnd: val[1],
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
                    {record.statusDesc === '待对账' && (
                      <>
                        <Button
                          type="text"
                          style={{ color: '#3d66e4', marginRight: '10px' }}
                          onClick={() => handleChange(record, 1)}
                        >
                          通过
                        </Button>
                        <Button
                          style={{ color: '#3d66e4', marginRight: '10px' }}
                          type="text"
                          onClick={() => handleChange(record, 0)}
                        >
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

export default BillSales;
