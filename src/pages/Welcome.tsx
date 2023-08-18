/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Button, Badge, Empty, message } from 'antd';
import {
  NotificationOutlined,
  FieldTimeOutlined,
  AreaChartOutlined,
  RedEnvelopeOutlined,
  PropertySafetyOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  PrinterOutlined,
  BookOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import EchartsCom from '@/components/EchartsCom';
import { notificationList, notificationAllRead } from '@/api/message';
import { homeStatsOrderCount, homeStatsPriceTrend, getQuoteCount } from '@/api/home';
import type { StatsOrderCountData, StatsPriceTrendData } from '@/api/model/homeModel';
import type { MessageItem } from '@/api/model/messageModel';
import { cloneDeep } from 'lodash';

const tabItems = () => {
  return [
    {
      key: 'waitQuote',
      title: '待报价订单',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <AccountBookOutlined />,
      suffix: '',
    },
    {
      key: 'afootQuote',
      title: '报价中订单',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <AccountBookOutlined />,
      suffix: '',
    },
    {
      key: 'purchaseWaitConfirm',
      title: '待确认采购订单',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <BookOutlined />,
      suffix: '',
    },
    {
      key: 'purchaseWaitPrint',
      title: '待打印配件数',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <PrinterOutlined />,
      suffix: '',
    },
    {
      key: 'purchaseWaitSign',
      title: '待签收配件数',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <RotateRightOutlined />,
      suffix: '',
    },
    {
      key: 'refundWaitSign',
      title: '待签收退货单',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <RotateLeftOutlined />,
      suffix: '',
    },
    {
      key: 'purchaseWaitFinance',
      title: '待对账总金额(元)',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <PropertySafetyOutlined />,
      suffix: '',
    },
    {
      key: 'purchaseWaitPay',
      title: '待收款总金额(元)',
      value: 0,
      valueStyle: { color: '#3d66e4', fontWeight: 'bold', fontSize: '20px' },
      prefix: <RedEnvelopeOutlined />,
      suffix: '',
    },
  ];
};

const salesItem = () => {
  return [
    {
      key: 'todayAmount',
      title: '今日销售额',
      value: 0,
    },
    {
      key: 'yesterdayAmount',
      title: '昨日销售额',
      value: 0,
    },
    {
      key: 'monthAmount',
      title: '本月累计',
      value: 0,
    },
    {
      key: 'yearAmount',
      title: '本年累计',
      value: 0,
    },
  ];
};

const Welcome = () => {
  const [list, setList] = useState<MessageItem[] | undefined>(undefined);
  const [countData, setCountData] = useState<any>(tabItems());
  const [salesData, setSalesData] = useState<any>(salesItem());
  const [xaxis, setXaxis] = useState<string[] | undefined>(undefined);
  const [seriesLastYearData, setSeriesLastYearData] = useState<string[] | undefined>(undefined);
  const [seriesYearData, setSeriesYearData] = useState<string[] | undefined>(undefined);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['本年累计', '去年累计'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xaxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '去年累计',
        type: 'line',
        stack: 'Total',
        data: seriesLastYearData,
      },
      {
        name: '本年累计',
        type: 'line',
        stack: 'Total',
        data: seriesYearData,
      },
    ],
  };

  // 消息列表
  const getMessage = async () => {
    const { data, success } = await notificationList({ page: 1, pageSize: 99 });
    success && setList(data!.list);
  };

  // 消息列表render
  const listItemCom = () => {
    return (
      <div className={styles.boxHeightRight}>
        {list?.length &&
          list?.map((item) => {
            return (
              <div className={styles.list} key={item.id}>
                <p>
                  <Badge status={item.status ? 'default' : 'processing'} />
                  {item?.content}
                </p>
                <p style={{ textAlign: 'right', fontSize: '14px' }}>{item?.createTime}</p>
              </div>
            );
          })}
      </div>
    );
  };

  // 全部已读
  const handleAllRead = async () => {
    const { success } = await notificationAllRead({});
    success && message.success('操作成功');
    getMessage();
  };

  // 待办事项数据统计
  const getTopCount = async () => {
    const { data } = await homeStatsOrderCount();
    const res = await getQuoteCount();
    const newData = cloneDeep(countData);
    if (data) {
      Object.keys(data as StatsOrderCountData).map((key) => {
        newData?.map((item: any) => {
          if (item.key === key) {
            // @ts-ignore
            item.value = data[key] || 0;
          }
          if (item.key === 'afootQuote') {
            item.value = res.data?.afootQuote;
          }
          if (item.key === 'waitQuote') {
            item.value = res.data?.waitQuote;
          }
        });
      });

      setCountData(newData);
    }
  };

  // 表格数据
  const getTrendData = async () => {
    const { data } = await homeStatsPriceTrend();
    const newData = cloneDeep(salesData);
    if (data) {
      Object.keys(data as StatsPriceTrendData).map((key: any) => {
        newData.map((item: any) => {
          if (item.key === key) {
            // @ts-ignore
            item.value = data[key] || 0;
          }
        });
      });
      setSalesData(newData);

      setXaxis(data?.xaxisData);
      setSeriesLastYearData(data?.seriesLastYearData);
      setSeriesYearData(data?.seriesYearData);
    }
  };

  useEffect(() => {
    getMessage();
    getTopCount();
    getTrendData();
  }, []);

  return (
    <div className={styles.welcome}>
      <Row gutter={20}>
        <Col span={16}>
          <div className={styles.col}>
            <div className={styles.title}>
              <FieldTimeOutlined style={{ marginRight: '10px' }} />
              待办事项
            </div>
            <Row gutter={8} className={styles.boxHeight}>
              {countData?.map((item: any) => {
                return (
                  <Col span={6} key={item.title}>
                    <Card>
                      <Statistic
                        title={item.title}
                        value={item.value}
                        precision={0}
                        valueStyle={item?.valueStyle}
                        prefix={item?.prefix}
                        suffix={item?.suffix}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
            <div className={styles.echartsBox}>
              <div className={styles.title}>
                <AreaChartOutlined style={{ marginRight: '10px' }} />
                销售趋势
              </div>
              <Row>
                <Col span={19} className={styles.chartBox}>
                  <EchartsCom option={option as any} />
                </Col>
                <Col span={5}>
                  <div className={styles.totalBox}>
                    {salesData?.map((res: any) => {
                      return (
                        <div key={res.key} className={styles.salesBox}>
                          <span className={styles.bold}>
                            {res.title}
                            <span style={{ fontSize: '12px' }}>(元)</span>
                          </span>
                          <span style={{ marginLeft: '10px' }}>{res.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.col}>
            <div className={styles.titleRight}>
              <div>
                <NotificationOutlined style={{ marginRight: '10px' }} />
                提醒消息
              </div>
              <div>
                <Button
                  type="text"
                  size="small"
                  style={{ color: '#3d66e4' }}
                  onClick={handleAllRead}
                >
                  全部已读
                </Button>
              </div>
            </div>
            {list ? (
              listItemCom()
            ) : (
              <div style={{ marginTop: '100px ' }}>
                <Empty />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
