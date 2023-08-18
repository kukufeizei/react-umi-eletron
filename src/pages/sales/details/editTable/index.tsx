/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Button, Table, Row, Col, InputNumber, Select, message, Input } from 'antd';
import { useModel } from 'umi';
import styles from './index.less';
import type { DetailList, List } from '@/api/model/salesModel';
import { salesOrderConfirm } from '@/api/sales';
interface Types {
  type: string;
  onClose: () => void;
}

const EditTable: React.FC<Types> = ({ type, onClose }) => {
  const { orderData, currentOrderNo } = useModel<any>('global');
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const fields = form.getFieldsValue();
  const { tableForm } = fields;

  // 缺货 && 重新确认
  const handleChangeSoldEmpty = (index: number) => {
    const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
    Object.assign(record, { soldEmpty: record.soldEmpty ? 0 : 1 });
    // 缺货后 需要把可供数量清0
    record.soldEmpty && Object.assign(record, { supplyShouldNum: 0 });
    form.setFieldsValue(tableForm);
  };

  //  如果没有标记缺货 并且status 不等于-1  则需要控制可供数量必须大于0
  const supplyShouldNumRules = (index: number) => {
    const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
    if (record.soldEmpty) return [];
    if (record.status === -1) return [];

    return [
      { required: true, message: '' },
      {
        validator: (_rule: any, value: number) => {
          if (value === 0) {
            return Promise.reject();
          } else {
            return Promise.resolve();
          }
        },
      },
    ];
  };

  // columns
  const orderColumns = () => {
    return [
      {
        title: '标记',
        dataIndex: 'soldEmpty',
        key: 'soldEmpty',
        width: 100,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return record.soldEmpty ? <span className={styles.soldEmptyIcon}>缺货</span> : '';
        },
      },
      {
        title: '状态',
        dataIndex: 'statusDesc',
        key: 'statusDesc',
        width: 120,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'statusDesc']}>
              <span>{record.statusDesc}</span>
            </Form.Item>
          );
        },
      },
      {
        title: '商品名称',
        dataIndex: 'skuName',
        key: 'skuName',
        width: 200,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.skuName}</span>;
        },
      },
      {
        title: '计划采购数',
        dataIndex: 'num',
        key: 'num',
        width: 130,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.num}</span>;
        },
      },
      {
        title: '销售数量',
        dataIndex: 'supplyShouldNum',
        key: 'supplyShouldNum',
        width: 120,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplyShouldNum']} rules={supplyShouldNumRules(index)}>
              {type === 'save' ? (
                <InputNumber disabled={record.status === -1} min={0} max={99999} precision={0} />
              ) : (
                <span>{record.supplyShouldNum}</span>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '供货类型',
        dataIndex: 'supplyType',
        key: 'supplyType',
        width: 130,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplyType']}>
              {type === 'save' ? (
                <Select
                  disabled={record.status === -1}
                  style={{ width: 110 }}
                  options={[
                    {
                      value: 10,
                      label: '现货',
                    },
                    {
                      value: 20,
                      label: '调货',
                    },
                    {
                      value: 30,
                      label: '订货',
                    },
                  ]}
                />
              ) : (
                <>
                  {record.supplyType === 10 && <span>现货</span>}
                  {record.supplyType === 20 && <span>调货</span>}
                  {record.supplyType === 30 && <span>订货</span>}
                </>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '报价单价（元）',
        dataIndex: 'purchaseUnitPrice',
        key: 'purchaseUnitPrice',
        width: 150,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.purchaseUnitPrice}</span>;
        },
      },
      {
        title: '确认单价（元）',
        dataIndex: 'supplyPrice',
        key: 'supplyPrice',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplyPrice']}>
              {type === 'save' ? (
                <InputNumber
                  disabled={record.status === -1}
                  step="0.01"
                  min={0}
                  max={9999}
                  parser={(value) => `${value}`.replace(/\$\s?|(,*)/g, '')}
                  precision={2}
                  defaultValue={record.purchaseUnitPrice}
                />
              ) : (
                <span>{record.supplyPrice}</span>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '供应商备注',
        dataIndex: 'supplyRemark',
        key: 'supplyRemark',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplyRemark']}>
              {type === 'save' ? (
                <Input disabled={record.status === -1} />
              ) : (
                <span>{record.supplyRemark}</span>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: '车型',
        dataIndex: 'useCarType',
        key: 'useCarType',
        width: 300,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.useCarType}</span>;
        },
      },
      {
        title: '厂牌',
        dataIndex: 'factName',
        key: 'factName',
        width: 150,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.factName}</span>;
        },
      },
      {
        title: '品质',
        dataIndex: 'qualityName',
        key: 'qualityName',
        width: 130,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.qualityName}</span>;
        },
      },
      {
        title: '品牌',
        dataIndex: 'brandName',
        key: 'brandName',
        width: 130,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.brandName}</span>;
        },
      },
      {
        title: '供应商仓库',
        dataIndex: 'supplyWareHouse',
        key: 'supplyWareHouse',
        width: 170,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.supplyWareHouse}</span>;
        },
      },
      {
        title: 'OE码',
        dataIndex: 'oeCode',
        key: 'oeCode',
        width: 200,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.oeCode}</span>;
        },
      },
      {
        title: '配件商配件编码/OE',
        dataIndex: 'test',
        key: 'test',
        width: 220,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>-</span>;
        },
      },
      {
        title: '采购备注',
        dataIndex: 'purchaseRemark',
        key: 'purchaseRemark',
        width: 200,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.purchaseRemark}</span>;
        },
      },
      {
        title: '商品编码',
        dataIndex: 'skuCode',
        key: 'skuCode',
        width: 300,
        render(_text: string, _field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.skuCode}</span>;
        },
      },
      {
        title: '实收数',
        dataIndex: 'actualNum',
        key: 'actualNum',
        width: 110,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.actualNum}</span>;
        },
      },
      {
        title: '打包数',
        dataIndex: 'packNum',
        key: 'packNum',
        width: 110,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.packNum}</span>;
        },
      },
      {
        title: '未签收数',
        dataIndex: 'noSignNum',
        key: 'noSignNum',
        width: 120,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return <span>{record.noSignNum}</span>;
        },
      },
      {
        title: '应出仓时间',
        dataIndex: '-',
        key: '-',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          // return <span>{record.actualNum}</span>;
          return null;
        },
      },
      {
        title: '出仓超时罚款',
        dataIndex: '-',
        key: '-',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          // return <span>{record.actualNum}</span>;
          return null;
        },
      },
      {
        title: '应送达时间',
        dataIndex: '-',
        key: '-',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          // return <span>{record.actualNum}</span>;
          return null;
        },
      },
      {
        title: '送达超时罚款',
        dataIndex: '-',
        key: '-',
        width: 150,
        render(_text: string, field: any, index: number) {
          const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
          // return <span>{record.actualNum}</span>;
          return null;
        },
      },
      type === 'save'
        ? {
            title: '操作',
            dataIndex: 'operate',
            className: 'operate',
            width: 220,
            fixed: 'right',
            render(_text: string, _field: any, index: number) {
              return (
                <Form.Item shouldUpdate={true}>
                  {({ getFieldValue }) => {
                    const record: DetailList = (getFieldValue('tableForm') || [])?.[index] || {};
                    return (
                      <div className={styles.handleBtn}>
                        <span onClick={() => handleChangeSoldEmpty(index)}>
                          {record.status !== -1 && (record.soldEmpty ? '重新确认' : '缺货')}
                        </span>
                      </div>
                    );
                  }}
                </Form.Item>
              );
            },
          }
        : {},
    ];
  };

  // 提交
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const arr = values.tableForm?.map((item: List) => {
        return {
          id: item.id,
          orderNo: item.orderNo,
          soldEmpty: item.soldEmpty,
          supplyShouldNum: item.supplyShouldNum,
          supplyType: item.supplyType,
          supplyPrice: item.supplyPrice || item.purchaseUnitPrice,
          purchaseRemark: item.purchaseRemark,
          supplyRemark: item.supplyRemark,
        };
      });
      const data = await salesOrderConfirm({
        orderNo: currentOrderNo,
        detailList: arr,
      });
      if (data.success) {
        message.success('提交成功');
        setLoading(false);
        onClose();
      }
    } catch {
      setLoading(false);
      throw new Error('未知错误，请联系管理员');
    }
  };

  const onFinishFailed = (err: any) => {
    err.errorFields[0].name[2] === 'supplyShouldNum' && message.error('请输入可供数量');
  };

  // 多选
  const rowSelection: any = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  // 批量缺货
  const handleBatchEmpty = () => {
    for (let i = 0; i < selectedRowKeys.length; i++) {
      const i = form
        .getFieldValue('tableForm')
        .findIndex((item: DetailList) => item.id === selectedRowKeys[i]);
      const record: DetailList = (form.getFieldValue('tableForm') || [])?.[i] || {};
      Object.assign(record, { soldEmpty: 1 });
    }

    form.setFieldsValue(tableForm);
  };

  const getRowKey = (_item: DetailList, index: number) => {
    const record: DetailList = (form.getFieldValue('tableForm') || [])?.[index] || {};
    return record.id;
  };

  // 设置form 初始值
  useEffect(() => {
    form.setFieldsValue({
      tableForm: orderData.detailList,
    });
  }, [orderData]);

  return (
    <div className={styles.editTable}>
      <Form
        className="table-edit-form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.List name="tableForm">
          {(dataSource) => {
            return (
              <Table
                key={String(new Date())}
                scroll={{ x: 3400 }}
                dataSource={dataSource}
                // @ts-ignore
                columns={orderColumns()}
                rowSelection={type === 'save' ? rowSelection : false}
                // @ts-ignore
                rowKey={(_item: DetailList, index: number) => getRowKey(_item, index)}
                pagination={false}
              />
            );
          }}
        </Form.List>
        <Form.Item>
          {type === 'save' && (
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  style={{ margin: '0 8px' }}
                  disabled={!selectedRowKeys.length}
                  onClick={handleBatchEmpty}
                >
                  批量缺货
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ margin: '0 8px' }}
                  loading={loading}
                >
                  确认
                </Button>
              </Col>
            </Row>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditTable;
