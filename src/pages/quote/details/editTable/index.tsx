/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Table, Select, Tag, Row, Col, message, Modal } from 'antd';
import { mergeCells, trans, setTargetObj } from './utils';
import { useModel } from 'umi';
import { getQualityList } from '@/api/quote';
import QualityModal from './qualityModal';
import BrandQualitySelect from './brandQualitySelect';
import {
  getBrandByQuality,
  querySupplierSku,
  deleteRows,
  postQuote,
  postStaging,
  buildFittings,
} from '@/api/quote';
import styles from './index.less';
import type { FieldTypes, ItemType } from './types';
import type { EnquiryDetail } from '@/api/model/quoteModel';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

interface Types {
  onClose: () => void;
}

const EditTable: React.FC<Types> = ({ onClose }) => {
  const { quoteData, upStreamEnquiryNo } = useModel<any>('global');
  const [form] = Form.useForm();
  const [data, setData] = useState<EnquiryDetail[] | undefined>(undefined);
  const [qualityList, setQualityList] = useState([]);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isBuildFittingsModal, setIsBuildFittingsModal] = useState<boolean>(false);
  const [modalInputVal, setModalInputVal] = useState<string | undefined>(undefined);
  const [currentData, setCurrentData] = useState<any>(undefined);
  const [handleIndex, setHandleIndex] = useState<number | null>(null);
  const [saveType, setSaveType] = useState<number | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [saveLoading, setSaveloading] = useState<boolean>(false);
  const [refArr, setRefArr] = useState<React.RefObject<HTMLDivElement>[]>([]);
  const arr: React.RefObject<HTMLDivElement>[] = [];

  const fields = form.getFieldsValue();
  const { tableForm } = fields;

  // 表单显示/隐藏逻辑
  const disableFlagFormItem = (record: EnquiryDetail) => {
    return record.stockOut === 1 || record.lapse === 1 || record.quoteStatus === 3;
  };

  // 多选弹窗
  const handleAdd = (index: number) => {
    setHandleIndex(index);
    setModalOpen(true);
  };

  // 删除
  const handleDel = async (index: number) => {
    const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};

    try {
      //如果有id  则后端删除 否则是前端删除
      if (record.id) {
        const { success } = await deleteRows({ batchIds: [record.id as number] });
        if (success) {
          const delData = data!.filter((_item, i) => i !== index);
          setData(mergeCells(trans(delData), 'title'));
          message.success('删除成功');
        }
      } else {
        const delData = data!.filter((_item, i) => i !== index);
        setData(mergeCells(trans(delData), 'title'));
        message.success('删除成功');
      }
    } catch {
      message.error('删除失败');
    }
  };

  // 品质切换 清空部分数据
  const handleChangeQuality = (val: number, index: number) => {
    const record: EnquiryDetail = form.getFieldValue('tableForm')[index];
    const targetVal = {
      price: null,
      brandName: null,
      brandId: null,
      taxQuotePrice: null,
      quotePriceSourceDesc: '',
      quotePriceSource: 1,
      enquiryQuality: val,
      // @ts-ignore
      enquiryQualityDesc: qualityList.filter((item) => item.value === val)[0].name,
    };

    Object.assign(record, { ...targetVal });
    form.setFieldsValue(tableForm);
    // @ts-ignore
    refArr?.[index].current?.clearVal();
  };

  /**
   * 缺货 && 重新报价 && 失效
   * @param changeTarget 要修改的字段名
   * @param targetVal 要修改的值
   * @param index 当前索引
   *
   */

  const handleStockOrReprice = (
    changeTarget: string,
    targetVal: number | string | null,
    index: number,
  ) => {
    try {
      const record: EnquiryDetail = form.getFieldValue('tableForm')[index];
      Object.assign(record, { [changeTarget]: targetVal });
      form.setFieldsValue(tableForm);
    } catch {
      message.error('未知错误，请联系管理员');
    }
  };

  // 切换品牌触发匹配规则
  const handleChangeBrandName = async (newValue: string, rowIndex: number) => {
    const record: EnquiryDetail = form.getFieldValue('tableForm')[rowIndex];
    // @ts-ignore
    refArr?.[rowIndex].current?.setVal(newValue);

    try {
      const { data } = await getBrandByQuality({
        brandName: newValue,
        enquiryQuality: record.enquiryQuality as number,
      });
      const index = data?.findIndex((item) => {
        return item.name === newValue;
      });

      if (index! > -1) {
        const set = {
          brandId: data![index as number].id,
          brandName: data![index as number].name,
          qualityId: data![index as number].qualityGroupId,
          qualityName: data![index as number].qualityGroupName,
        };

        Object.assign(record, { ...set });
        form.setFieldsValue(tableForm);

        if (record.oeCode && record.qualityId && record.brandId) {
          const info = await querySupplierSku({
            oeCode: record.oeCode,
            brandId: data![index as number].id as number,
            qualityId: data![index as number].qualityGroupId as number,
          });
          if (!info.success) return message.error('匹配失败');

          const targetVal = setTargetObj(info.data);
          Object.assign(record, { ...targetVal });
          form.setFieldsValue(tableForm);
        }
      }
    } catch {
      message.error('未知错误,请联系管理员');
    }
  };

  const handleFit = (record: EnquiryDetail, index: number) => {
    setCurrentData(record);
    setIsBuildFittingsModal(true);
  };

  // columns
  const quoteColumns = () => {
    return [
      {
        title: '询价配件',
        dataIndex: 'title',
        key: 'title',
        width: 180,
        fixed: 'left',
        onCell: (_: any, index: number) => {
          const record = form.getFieldValue('tableForm')[index];
          return { rowSpan: record.rowSpan };
        },
        render(_: any, _field: any, index: number) {
          // 注意：这里的 field 不是当前行数据，而是 Form.List field
          return (
            <Form.Item shouldUpdate={true}>
              {({ getFieldValue }) => {
                // 获取当前行数据，然后渲染你要的数据
                const record: EnquiryDetail = (getFieldValue('tableForm') || [])?.[index] || {};
                return (
                  <>
                    <div>
                      {record.skuName} * {record.num}
                    </div>
                    <div>OE码:{record.oeCode}</div>
                  </>
                );
              }}
            </Form.Item>
          );
        },
      },
      {
        title: '',
        dataIndex: 'stockOut',
        key: 'stockOut',
        width: 70,
        render(_text: any, _field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return record.stockOut ? <span className={styles.stockOutIcon}>缺货</span> : null;
        },
      },
      {
        title: '',
        dataIndex: 'lapse',
        key: 'lapse',
        width: 70,
        render(_text: any, _field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return record.lapse ? <span className={styles.lapseIcon}>失效</span> : null;
        },
      },

      {
        title: '配件商配件编码/OE码',
        dataIndex: 'supplierOeCode',
        key: 'supplierOeCode',
        width: 200,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          if (record.quotePriceSource !== 2) {
            return (
              <>
                <Form.Item name={[field.name, 'supplierOeCode']}>
                  <Input allowClear disabled={disableFlagFormItem(record)} />
                </Form.Item>
                {record.needAdd === 1 && (
                  <p className={styles.needAdd} onClick={() => handleFit(record, index)}>
                    请维护配件商配件编码
                  </p>
                )}
              </>
            );
          } else {
            return <span>{record.supplierOeCode}</span>;
          }
        },
      },
      {
        title: '配件名称',
        dataIndex: 'supplierSkuName',
        key: 'supplierSkuName',
        width: 200,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplierSkuName']}>
              {record.quotePriceSource !== 2 ? (
                <Input allowClear disabled={disableFlagFormItem(record)} />
              ) : (
                <span>{record.supplierSkuName}</span>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: () => {
          return (
            <>
              <span className={styles.requireIcon}>*</span>上询品质
            </>
          );
        },
        dataIndex: 'enquiryQuality',
        key: 'enquiryQuality',
        width: 120,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'enquiryQuality']}>
              {record.stockOut !== 1 && record.quotePriceSource !== 2 ? (
                <Select
                  onChange={(val) => handleChangeQuality(val, index)}
                  disabled={disableFlagFormItem(record)}
                >
                  {qualityList.map((item: ItemType) => {
                    return (
                      <Select.Option key={item.value} value={item.value}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              ) : (
                <span>{record.enquiryQualityDesc}</span>
              )}
            </Form.Item>
          );
        },
      },
      {
        title: () => {
          return (
            <>
              <span className={styles.requireIcon}>*</span>一级品质
            </>
          );
        },
        dataIndex: 'qualityName',
        key: 'qualityName',
        width: 120,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'quantityName']}>
              <span>{record.qualityName}</span>
            </Form.Item>
          );
        },
      },
      {
        title: () => {
          return (
            <>
              <span className={styles.requireIcon}>*</span>品牌
            </>
          );
        },
        dataIndex: 'brandName',
        key: 'brandName',
        width: 130,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'brandName']}>
              <BrandQualitySelect
                key={index}
                brandName={record.brandName}
                ref={refArr?.[index]}
                enquiryQuality={record.enquiryQuality as number}
                disabled={disableFlagFormItem(record)}
                // @ts-ignore
                handleChangeBrandName={(e: any) => handleChangeBrandName(e, index)}
              />
            </Form.Item>
          );
        },
      },
      {
        title: '历史采购价',
        dataIndex: 'price',
        key: 'price',
        width: 120,
        render(_text: any, _field: FieldTypes, index: number) {
          return (
            <Form.Item shouldUpdate={true}>
              {({ getFieldValue }) => {
                const record: EnquiryDetail = (getFieldValue('tableForm') || [])?.[index] || {};
                return (
                  <span>{record.quotePriceSource === 3 ? record.recentPurchasePrice : ''}</span>
                );
              }}
            </Form.Item>
          );
        },
      },
      {
        title: () => {
          return (
            <>
              <span className={styles.requireIcon}>*</span>报价单价
            </>
          );
        },
        dataIndex: 'taxQuotePrice',
        key: 'taxQuotePrice',
        width: 100,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'taxQuotePrice']}>
              <Input allowClear disabled={disableFlagFormItem(record)} />
            </Form.Item>
          );
        },
      },
      {
        title: '价格性质',
        dataIndex: 'quotePriceSourceDesc',
        key: 'quotePriceSourceDesc',
        width: 100,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          if (record.quotePriceSource === 2) {
            return <span>一口价</span>;
          } else if (record.quotePriceSource === 3) {
            return <span>采购价</span>;
          } else {
            return '';
          }
        },
      },
      {
        title: '供货方式',
        dataIndex: 'supplyType',
        key: 'supplyType',
        width: 120,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'supplyType']}>
              <Select
                placeholder="请选择"
                disabled={disableFlagFormItem(record)}
                onChange={(e) => form.setFieldsValue(tableForm)}
              >
                <Select.Option value={1}>现货</Select.Option>
                <Select.Option value={2}>调货</Select.Option>
                <Select.Option value={3}>订货</Select.Option>
              </Select>
            </Form.Item>
          );
        },
      },
      {
        title: '订货天数',
        dataIndex: 'orderDays',
        key: 'orderDays',
        width: 100,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'orderDays']}>
              <Input
                disabled={record.stockOut === 1 || record.lapse === 1 || record.supplyType !== 3}
              />
            </Form.Item>
            // <Form.Item  name={[field.name, 'orderDays']}>
            //   {({ getFieldValue }) => {
            //     const record: EnquiryDetail = (getFieldValue('tableForm') || [])?.[index] || {};
            //     return (
            //       <Input
            //         disabled={
            //           record.stockOut === 1 || record.lapse === 1 || record.supplyType !== 3
            //         }
            //       />
            //     );
            //   }}
            // </Form.Item>
          );
        },
      },
      {
        title: '状态',
        dataIndex: 'quoteStatusDesc',
        key: 'quoteStatusDesc',
        width: 100,
        render(_: any, _field: any, index: number) {
          return (
            <Form.Item shouldUpdate={true}>
              {({ getFieldValue }) => {
                // 获取当前行数据，然后渲染你要的数据
                const record: EnquiryDetail = (getFieldValue('tableForm') || [])?.[index] || {};
                let color = record.quoteStatusDesc === '待报价' ? 'red' : 'green';
                if (record.quoteStatusDesc === '已关闭') color = 'volcano';
                return (
                  <span>
                    <Tag color={color} key={record.quoteStatusDesc}>
                      {record.quoteStatusDesc}
                    </Tag>
                  </span>
                );
              }}
            </Form.Item>
          );
        },
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
        width: 180,
        render(_text: any, field: FieldTypes, index: number) {
          const record: EnquiryDetail = (form.getFieldValue('tableForm') || [])?.[index] || {};
          return (
            <Form.Item name={[field.name, 'remark']}>
              <Input allowClear disabled={disableFlagFormItem(record)} />
            </Form.Item>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        className: 'operate',
        width: 220,
        fixed: 'right',
        render(_text: any, _field: FieldTypes, index: number) {
          return (
            <Form.Item shouldUpdate={true}>
              {({ getFieldValue }) => {
                const record: EnquiryDetail = (getFieldValue('tableForm') || [])?.[index] || {};
                return (
                  <div className={styles.handleBtn}>
                    {record.quoteStatus === 1 && (
                      <span onClick={() => handleAdd(index)}>新增品质行</span>
                    )}
                    {record.lineSource === 2 &&
                      record.stockOut !== 1 &&
                      record.quoteStatus === 1 && (
                        <span onClick={() => handleDel(index)}>删除</span>
                      )}
                    {record.quotePriceSource !== 2 &&
                      record.stockOut !== 1 &&
                      record.quoteStatus === 1 && (
                        <span onClick={() => handleStockOrReprice('stockOut', 1, index)}>缺货</span>
                      )}
                    {record.quotePriceSource === 2 &&
                      record.stockOut !== 1 &&
                      record.quoteStatus === 1 &&
                      record.lapse !== 1 && (
                        <span onClick={() => handleStockOrReprice('lapse', 1, index)}>失效</span>
                      )}
                    {record.stockOut === 1 && record.quoteStatus === 1 && (
                      <span onClick={() => handleStockOrReprice('stockOut', 0, index)}>
                        重新报价
                      </span>
                    )}
                  </div>
                );
              }}
            </Form.Item>
          );
        },
      },
    ];
  };

  // 获取品质
  const getQuality = async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { data } = await getQualityList({ dictCode: 'enquiryQuality' });
    setQualityList(data);
  };

  // 新增行
  const getModalQualityCheckVal = (val: CheckboxValueType[]) => {
    if (!val.length) return message.error('请选择品质');

    const currentFieldsVal = form.getFieldValue('tableForm')[handleIndex as number];
    const newItems = val.map((quality) => ({
      ...currentFieldsVal,
      supplierSkuCode: '',
      id: null,
      rowspan: 0,
      lineSource: 2,
      stockOut: 0,
      lapse: 0,
      quoteStatus: 1,
      qualityId: null,
      quotePriceSource: 1,
      newAdd: 2,
      enquiryQuality: quality,
      //@ts-ignore
      enquiryQualityDesc: qualityList.filter((item) => item.value === quality)[0].name,
      quotePriceSourceDesc: '',
      qualityName: null,
      taxQuotePrice: null,
      brandId: null,
      brandName: null,
      recentPurchasePrice: null,
      dtSkuCode: null,
      dtSkuId: null,
      needAdd: 2,
    }));

    const targetI = form.getFieldValue('tableForm').findIndex((item: any) => {
      return item.title === currentFieldsVal.title;
    });
    Object.assign(tableForm[targetI], { rowSpan: (tableForm[targetI].rowSpan += newItems.length) });
    tableForm.splice((handleIndex as number) + 1, 0, ...newItems);
    form.setFieldsValue({ tableForm });
    setData(mergeCells(trans(form.getFieldValue('tableForm')), 'title'));
  };

  // 完成编辑 saveType 0 暂存  1 提交报价
  const onFinish = async (values: any) => {
    try {
      const api = saveType ? postQuote : postStaging;
      saveType ? setSubmitLoading(true) : setSaveloading(true);
      const submitData = {
        enquiryQuoteDetails: values.tableForm,
        upstreamEnquiryNo: upStreamEnquiryNo,
      };

      const data = await api(submitData);
      data.success && message.success(`${saveType ? '提交' : '暂存'}成功`);
      onClose();
      saveType ? setSubmitLoading(false) : setSaveloading(false);
    } catch {
      saveType ? setSubmitLoading(false) : setSaveloading(false);
      onClose();
      throw new Error('未知错误，请联系管理员');
    }
  };

  // 维护配件编码
  const handleOk = async () => {
    try {
      const submitData = {
        skuId: currentData.dtSkuId,
        skuCode: currentData.dtSkuCode,
        supplierOe: modalInputVal,
      };
      await buildFittings(submitData);
      if (currentData.oeCode && currentData.qualityId && currentData.brandId) {
        const info = await querySupplierSku({
          oeCode: currentData.oeCode,
          brandId: currentData.brandId,
          qualityId: currentData.qualityId,
        });
        if (!info.success) return message.error('匹配失败');

        const targetVal = setTargetObj(info.data);
        Object.assign(currentData, { ...targetVal });
        form.setFieldsValue(tableForm);
      }

      setIsBuildFittingsModal(false);
    } catch {
      throw new Error('请求错误');
    }
  };

  useEffect(() => {
    getQuality();
    setData(quoteData?.enquiryDetails);
  }, [quoteData]);

  // 设置form 初始值
  useEffect(() => {
    form.setFieldsValue({
      tableForm: data,
    });

    if (data) {
      for (let i = 0; i < data!.length; i++) {
        arr.push(React.createRef<HTMLDivElement>());
      }

      setRefArr(arr);
    }
  }, [data]);

  return (
    <div className={styles.editTable}>
      <Form className="table-edit-form" form={form} onFinish={onFinish}>
        <Form.List name="tableForm">
          {(dataSource, { add, remove }) => {
            return (
              <Table
                scroll={{ x: 500, y: 500 }}
                dataSource={dataSource}
                // @ts-ignore
                columns={quoteColumns()}
                rowKey={(record) => record.key}
                pagination={false}
              />
            );
          }}
        </Form.List>
        <Form.Item>
          <Row>
            <Col span={24} className={styles.btn}>
              <Button
                htmlType="submit"
                style={{ margin: '0 8px' }}
                onClick={() => setSaveType(0)}
                loading={saveLoading}
              >
                暂存
              </Button>
              <Button
                htmlType="submit"
                type="primary"
                onClick={() => setSaveType(1)}
                loading={submitLoading}
              >
                提交报价
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>

      <QualityModal
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        qualityList={qualityList}
        getModalQualityCheckVal={getModalQualityCheckVal}
      />

      {/* 维护配件商编码 */}
      <Modal
        title="维护配件商编码"
        open={isBuildFittingsModal}
        onOk={handleOk}
        onCancel={() => setIsBuildFittingsModal(false)}
      >
        <Input
          placeholder="请输入"
          value={modalInputVal}
          onChange={(e) => setModalInputVal(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default EditTable;
