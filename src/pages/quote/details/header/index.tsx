import React from 'react';
import styles from './index.less';
import { Tag, Descriptions, Image } from 'antd';
import { AccountBookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const GlobalHeader = () => {
  const { quoteData } = useModel<any>('global');

  return (
    <div className={styles.header}>
      <div>
        <div className={styles.flexStart}>
          <div>
            <AccountBookOutlined style={{ fontSize: '50px', color: '#3d66e4' }} />
          </div>
          <div className={styles.flexColumn}>
            <div>
              {quoteData!.supplierQuoteNo}
              {quoteData?.willTimeout === 1 &&
                quoteData.timeout !== 1 &&
                [1, 2].includes(quoteData.status as number) && (
                  <span style={{ color: '#faad14' }}>
                    <ClockCircleOutlined /> 即将超时
                  </span>
                )}
              {quoteData!.timeout === 1 && (
                <span style={{ color: 'red' }}>
                  <ClockCircleOutlined /> 已超时
                </span>
              )}
            </div>
            <div>
              <Tag color="geekblue">{quoteData?.carInfo?.carBrand}</Tag>
              {quoteData?.carInfo?.carModel}
            </div>
          </div>
        </div>
        <Descriptions column={4}>
          <Descriptions.Item label="VIN码">
            <span style={{ fontWeight: 'bold' }}>{quoteData?.vinCode}</span>
          </Descriptions.Item>
          <Descriptions.Item label="询价单号">{quoteData?.upstreamEnquiryNo}</Descriptions.Item>
          <Descriptions.Item label="询价员">{quoteData?.enquiryBy}</Descriptions.Item>
          <Descriptions.Item label="询价时间">{quoteData?.pushTime}</Descriptions.Item>
          {quoteData?.fileUrls.length && (
            <Descriptions.Item label="附件">
              {quoteData?.fileUrls?.map((res: string) => {
                return <Image key={res} width={100} src={res} />;
              })}
            </Descriptions.Item>
          )}
        </Descriptions>
      </div>
    </div>
  );
};

export default GlobalHeader;
