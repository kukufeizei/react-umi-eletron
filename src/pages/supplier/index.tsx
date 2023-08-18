import React, { useEffect, useState } from 'react';
import { Image, Tag, Descriptions, Table } from 'antd';
import styles from './index.less';
import images from '@/assets/Frame.png';
import { getCompanyInfo, postTenantRelationUserList } from '@/api/account';
import { accountsColumns, userColumns } from './columns';
import { getBankCardNum } from '@/utils/utils';

const Supplier = () => {
  const [companyInfo, setCompanyInfo] = useState<any>(undefined);
  const [dataSource, setDataSource] = useState<any>(undefined);

  // 获取供应商信息
  const getData = async () => {
    const { relationType, relationId } = JSON.parse(localStorage.getItem('user') as any);
    const res = await getCompanyInfo({ queryId: relationId });
    const { data } = await postTenantRelationUserList({
      relationType,
      relationId,
      page: 1,
      pageSize: 100,
    });
    setDataSource(data?.list);
    setCompanyInfo(res.data);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.supplier}>
      <div className={styles.flexStart}>
        <div className={styles.imageBox}>
          <Image width={45} height={45} src={images} preview={false} />
        </div>
        <div className={styles.flexColumn}>
          <div>
            {companyInfo?.name || '-'}{' '}
            <span style={{ fontSize: '14px' }}>{companyInfo?.supplierId || '-'}</span>
          </div>
          <div>
            <Tag>在线支付</Tag>
            <Tag>供应分类</Tag>
            <Tag>调货</Tag>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>基本信息</div>
        <Descriptions column={4}>
          <Descriptions.Item label="所属分类">
            {companyInfo?.categoryIdDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="供货类型">
            {companyInfo?.supplyTypeDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="负责人">{companyInfo?.managerName || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{companyInfo?.phone || '-'}</Descriptions.Item>
          <Descriptions.Item label="固定电话">{companyInfo?.telephone || '-'}</Descriptions.Item>
          <Descriptions.Item label="联系地址">
            <span className={styles._info}>
              {companyInfo?.contactAddress.areaName}
              {companyInfo?.contactAddress.address || '-'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="支付方式">{companyInfo?.payTypeDesc || '-'}</Descriptions.Item>
          <Descriptions.Item label="收款期限">
            {companyInfo?.settleDay || '-'}
            {companyInfo?.settleDay && '天'}
          </Descriptions.Item>
          <Descriptions.Item label="税号">{companyInfo?.taxRateNum || '-'}</Descriptions.Item>
          <Descriptions.Item label="税率">{companyInfo?.taxRateIdDesc || '-'}</Descriptions.Item>
          <Descriptions.Item label="是否含税">
            {companyInfo?.offerTaxTypeDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="是否开票">{companyInfo?.billTypeDesc || '-'}</Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.info}>
        <div className={styles.title}>供货信息</div>
        <Descriptions column={4}>
          <Descriptions.Item label="揽货仓库">
            {companyInfo?.warehouseIdDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="揽货门店">
            {companyInfo?.supplyShopIdDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="退货门店">
            {companyInfo?.returnShopIdDesc || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="退货联系人">
            {companyInfo?.returnAddress.addressee || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="退货联系电话">
            {companyInfo?.returnAddress.phone || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="退货地址">
            {companyInfo?.returnAddress.areaName} {companyInfo?.returnAddress.address || '-'}
          </Descriptions.Item>
        </Descriptions>
      </div>
      {companyInfo?.certs.length > 0 && (
        <div className={styles.info}>
          <div className={styles.title}>合同资质</div>
          <div className={styles.flexStart}>
            {companyInfo?.cetrs?.length &&
              companyInfo?.cetrs?.map((item: any) => {
                return (
                  <div className={styles.imgBox} key={item.certName}>
                    <Image
                      width={150}
                      height={80}
                      src={item.certUrl}
                      style={{ marginRight: '10px' }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {companyInfo?.accounts.length > 0 && (
        <div className={styles.info}>
          <div className={styles.title}>账户信息</div>
          <Table
            dataSource={companyInfo?.accounts}
            scroll={{ y: 100 }}
            pagination={false}
            columns={[
              {
                title: '收款/银行卡号',
                dataIndex: 'accountNum',
                width: 300,
                render: (text, record) => {
                  return <span>{getBankCardNum(text)}</span>;
                },
              },
              ...accountsColumns,
            ]}
          />
        </div>
      )}
      {dataSource && (
        <div className={styles.info}>
          <div className={styles.title}>员工账号</div>
          <div className={styles.tableBox}>
            <Table
              dataSource={dataSource}
              scroll={{ y: 100 }}
              pagination={false}
              columns={[
                ...userColumns,
                {
                  title: '角色',
                  dataIndex: 'roles',
                  width: 300,
                  render: (_, record) => {
                    if (record?.roles) {
                      record?.roles.map((item: any) => {
                        return <span key={item}>{item}</span>;
                      });
                    }
                  },
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Supplier;
