/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import type { EnquiryDetail } from '@/api/model/quoteModel';
import { useModel } from 'umi';

const ViewTable = () => {
  const { quoteData } = useModel<any>('global');

  const quoteColumns: any[] = [
    {
      title: '询价配件',
      dataIndex: 'title',
      key: 'title',
      width: 180,
      onCell: (record: EnquiryDetail, index: number) => {
        return { rowSpan: record.rowSpan };
      },
      render: (text: string, record: EnquiryDetail, index: number) => {
        return (
          <>
            <div>
              {record.skuName} * {record.num}
            </div>
            <div>OE码:{record.oeCode}</div>
          </>
        );
      },
    },
    {
      title: '配件商配件编码/OE码',
      dataIndex: 'supplierOeCode',
      key: 'supplierOeCode',
    },
    {
      title: '配件名称',
      dataIndex: 'supplierSkuName',
      key: 'supplierSkuName',
    },
    {
      title: '品质',
      dataIndex: 'qualityName',
      key: 'qualityName',
      width: 100,
    },
    {
      title: '品牌',
      dataIndex: 'brandName',
      key: 'brandName',
      width: 100,
    },
    {
      title: '历史采购价',
      dataIndex: 'price',
      key: 'price',
      width: 110,
      render: (_: any, record: EnquiryDetail) => (
        <span>{record.quotePriceSource === 3 ? record.recentPurchasePrice : '-'}</span>
      ),
    },
    {
      title: '报价单价',
      dataIndex: 'taxQuotePrice',
      key: 'taxQuotePrice',
      width: 100,
    },
    {
      title: '价格性质',
      dataIndex: 'quotePriceSourceDesc',
      key: 'quotePriceSourceDesc',
      width: 100,
    },
    {
      title: '供货方式',
      dataIndex: 'supplyType',
      key: 'supplyType',
      width: 100,
    },
    {
      title: '订货天数',
      dataIndex: 'orderDays',
      key: 'orderDays',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'quoteStatusDesc',
      key: 'quoteStatusDesc',
      width: 100,
      render: (text: string) => {
        let color = text === '待报价' ? 'red' : 'green';
        if (text === '已关闭') color = 'volcano';
        return (
          <span>
            <Tag color={color} key={text}>
              {text}
            </Tag>
          </span>
        );
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      width: 100,
    },
  ];

  return (
    <>
      <Table
        bordered
        rowKey={(record: EnquiryDetail) => record.id as number}
        key={'list-item'}
        pagination={false}
        locale={{ emptyText: '暂无数据' }}
        dataSource={quoteData?.enquiryDetails}
        columns={quoteColumns}
      />
    </>
  );
};

export default ViewTable;
