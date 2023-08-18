/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Input, message, Space, Popconfirm, Upload } from 'antd';
import ProTable from '@ant-design/pro-table';
import { actualList, financeAuditDays, actualCount, dispute, disputeCancel } from '@/api/bill';
import StatusTabComp from '@/components/StatusTab';
import { salesBillTabItemsDays } from '@/tabItems';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { columns } from './columns';
import axios from 'axios';
import RecordModal from '@/components/Record';
import CopyIconCom from '@/components/CopyIcon';

const BillSales = () => {
  const actionRef = useRef();
  const [total, setTotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenRecord, setIsModalOpenRecord] = useState<boolean>(false);
  const [recordId, setRecordId] = useState<undefined | number>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[] | undefined>(undefined);
  const [currentId, setCurrentId] = useState<number[] | undefined>(undefined);
  const [value, setValue] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<any>([]);
  const [tabs, setTabs] = useState<object[] | undefined>(salesBillTabItemsDays);
  const { TextArea } = Input;

  // 分页入参
  const sendParams = useRef<any>({
    page: currentPage,
    pageSize: 20,
    status: 0,
    source: 1,
  });

  //  自定义上传，赶进度 未封装
  const customRequest: any = async (option: any) => {
    const formData = new FormData();
    formData.append('file', option.file);
    axios({
      method: 'post',
      data: formData,
      url: `${
        process.env.REACT_APP_ENV === 'dev'
          ? 'https://sitapi.dingteng.tech'
          : 'https://dtapi.delight.tech'
      }/basicApi/file/upload/images`,
      headers: {
        dt_sessionId: localStorage.getItem('dt_sessionId') as string,
        ContentType: 'multipart/form-data',
      },
    }).then((res: any) => {
      // @ts-ignore
      if (!res.data.success) {
        return option.onError('上传失败');
      }
      setUrl(url.concat(res.data.data.fullUrl));
      return option.onSuccess(res.data);
    });
  };

  //  upload 配置项
  const props: UploadProps = {
    customRequest: customRequest,
    maxCount: 9,
  };

  // 数量统计
  const getTopCount = async (filter: any) => {
    const res = await actualCount({ ...filter, ...sendParams.current });
    // @ts-ignore
    if (res.data) {
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
    if (filter.current === 1) {
      sendParams.current.page = 1;
      setCurrentPage(1);
    }

    const { data } = await actualList({ ...filter, ...sendParams.current });
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

  const handleChangeVal = (e: any) => {
    setValue(e.target.value);
  };

  const handleChangeDispute = async (id: number, type: string) => {
    setCurrentId(type === 'once' ? [id] : selectedRowKeys);
    setIsModalOpen(true);
  };

  // 申诉
  const handleOk = async () => {
    if (!value) return message.warning('请输入申诉原因描述');
    if (!url?.length) return message.warning('请上传凭证');
    const data = await dispute({
      idList: currentId as number[],
      disputeContent: value,
      disputeFileUrlList: url,
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

  // 取消申诉
  const handleChangeCancelDispute = async (id: number) => {
    const data = await disputeCancel({
      idList: [id as number],
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

  // 多选
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (keys: number) => {
      setSelectedRowKeys(keys as any);
    },
  };

  // 确认对账
  const handleSave = async (id: Number, type: string) => {
    const data = await financeAuditDays({
      idList: type === 'once' ? [id as number] : (selectedRowKeys as unknown as number[]),
      auditType: 0,
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
            <Button
              type="primary"
              disabled={!selectedRowKeys?.length}
              onClick={() => handleChangeDispute(0, 'batch')}
            >
              批量申诉
            </Button>
          </Space>
        )}
      </div>,
    ];
  };

  const handleRecord = (id: number) => {
    setRecordId(id);
    setIsModalOpenRecord(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      setUrl([]);
      setValue(undefined);
    }
  }, [isModalOpen]);

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
              title: '销售单号',
              dataIndex: 'orderNo',
              width: 180,
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
            ...columns,
            {
              title: '操作',
              dataIndex: 'operate',
              width: 230,
              hideInSearch: true,
              fixed: 'right',
              render: (_text: string, record: any) => {
                return (
                  <>
                    {record.status === 0 && (
                      <>
                        <Popconfirm
                          title="是否确认对账"
                          onConfirm={() => handleSave(record.id, 'once')}
                          okText="确认"
                          cancelText="取消"
                        >
                          <Button
                            type="text"
                            size="small"
                            style={{ color: '#3d66e4', marginRight: '10px' }}
                          >
                            确认
                          </Button>
                        </Popconfirm>
                        <Button
                          style={{ color: '#3d66e4', marginRight: '10px' }}
                          type="text"
                          size="small"
                          onClick={() => handleChangeDispute(record.id, 'once')}
                        >
                          申诉
                        </Button>
                      </>
                    )}

                    {record.status === 1 && (
                      <>
                        <Button
                          type="text"
                          size="small"
                          style={{ color: '#3d66e4', marginRight: '10px' }}
                          onClick={() => handleChangeCancelDispute(record.id)}
                        >
                          取消申诉
                        </Button>
                      </>
                    )}

                    <Button
                      type="text"
                      style={{ color: '#3d66e4', marginRight: '10px' }}
                      onClick={() => handleRecord(record.id)}
                    >
                      查看日志
                    </Button>
                  </>
                );
              },
            },
          ]}
          pagination={paginationProps}
        />
      </PageContainer>

      <Modal
        title="对账申诉"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <TextArea
          rows={4}
          placeholder="请输入不通过理由"
          maxLength={200}
          value={value}
          onChange={handleChangeVal}
        />
        <div style={{ marginTop: '10px' }}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
        </div>
      </Modal>

      {recordId && isModalOpenRecord && (
        <RecordModal
          isModalOpen={isModalOpenRecord}
          setIsModalOpen={setIsModalOpenRecord}
          orderNo={recordId as any}
          orderType={'SUPPLY_ACTUAL'}
        />
      )}
    </>
  );
};

export default BillSales;
