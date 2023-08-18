/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Image, message } from 'antd';
import styles from './index.less';
import QRCode from 'qrcode.react';
import titleImg from '@/assets/title.png';
import { previewDetailPrint, detailPrintCallback } from '@/api/sales';
import { refundDtail, backPrint } from '@/api/refund';
import { MTaskByMpage } from '@/utils/printer';
import moment from 'moment';
interface Types {
  currentId?: string | undefined;
  setCurrentId: (bool: string | undefined) => void;
  source: string;
}
const PreviewPrintModal: React.FC<Types> = ({ currentId, setCurrentId, source }) => {
  const [list, setList] = useState<any>(undefined);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const handleOk = async () => {
    if (!localStorage.getItem('print')) {
      return message.info('请在右上角选择您的默认打印机');
    }
    setConfirmLoading(true);
    MTaskByMpage(list, 'PRINT', source);
    setTimeout(async () => {
      const api = source === 'sales' ? detailPrintCallback : backPrint;
      const params =
        source === 'sales'
          ? { batchIds: [currentId as string] }
          : { refundNos: [currentId as string] };
      const data = await api(params as any);
      data.success && message.success(`${source === 'sales' ? '销售单' : '退供单'}打印成功`);
      setCurrentId(undefined);
      setConfirmLoading(false);
    }, 3000);
  };

  const getData = async () => {
    try {
      const api = source === 'sales' ? previewDetailPrint : refundDtail;
      const params =
        source === 'sales'
          ? { batchIds: [currentId as string] }
          : { refundNos: [currentId as string] };
      const res = await api(params as any);
      const newData =
        source === 'sales' ? Array(res?.data[0].supplyShouldNum).fill(res?.data[0]) : [res.data];
      res.success && setList(newData);
    } catch {
      throw new Error('error');
    }
  };

  useEffect(() => {
    currentId && getData();
  }, [currentId]);

  return (
    <>
      <Modal
        title="打印预览"
        open={!!currentId}
        okText={'立即打印'}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setCurrentId(undefined)}
        width={'80%'}
      >
        <Row gutter={16}>
          {source === 'sales' &&
            list?.length &&
            list.map((item: any, index: number) => {
              return (
                <Col className="gutter-row" span={6} key={`${item.skuId}1`}>
                  <div className={styles.printBox}>
                    <div className={styles.flexStart}>
                      <div>VIN码:{item?.vinCode}</div>
                      <div>
                        <Image preview={false} width={100} height={12} src={titleImg} />
                      </div>
                    </div>
                    <div className={styles.flexStart}>
                      <div className={styles.flex1}>
                        <p>车型：{item?.useCarType} </p>
                        <p>{item?.skuName}</p>
                        <p>
                          <span style={{ paddingRight: '5px' }}>{item?.factName}</span>
                          <span>{item?.brandName}</span>
                        </p>
                        <p>{item?.supplierId}</p>
                      </div>
                      <div style={{ padding: '5px 0' }}>
                        <QRCode
                          value={item?.scanContent} //value参数为字符串类型
                          size={100}
                          fgColor="#000000"
                        />
                      </div>
                    </div>
                    <div className={styles.flexStart}>
                      <div>{item?.skuCode.substring(0, 28)}</div>
                      <div>{item?.cutoffOrderTime}</div>
                    </div>
                    <div className={styles.flexStart}>
                      <div>
                        {item?.saleOrderNo}
                        {item?.saleOrderNo ? '.' : ''}
                        {item?.supplyShouldNum}-{index + 1}
                      </div>
                      <div>{item?.supplyPrintTime}</div>
                    </div>
                  </div>
                </Col>
              );
            })}
          {source === 'refund' &&
            list?.length &&
            list.map((item: any, index: number) => {
              return (
                <Col className="gutter-row" span={6} key={`${item.refundNo}`}>
                  <div className={styles.printBox}>
                    <div className={styles.flexStart}>
                      <div>VIN码:{item?.vinCode}</div>
                      <div>
                        <Image preview={false} width={100} height={12} src={titleImg} />
                      </div>
                    </div>
                    <div className={styles.flexStart}>
                      <div className={styles.flex1}>
                        <p>车型：{item?.useCarType} </p>
                        <p>{item?.skuName}</p>
                        <p>
                          <span style={{ paddingRight: '5px' }}>{item?.factName}</span>
                          <span>{item?.brandName}</span>
                        </p>
                        <p>{item?.supplierId}</p>
                      </div>
                      <div style={{ padding: '5px 0' }}>
                        <QRCode
                          value={item?.scanContent} //value参数为字符串类型
                          size={100}
                          fgColor="#000000"
                        />
                      </div>
                    </div>
                    <div className={styles.flexStart}>
                      <div>{item?.skuCode.substring(0, 28)}</div>
                      <div>{item?.cutoffOrderTime}</div>
                    </div>
                    <div className={styles.flexStart}>
                      <div>{item?.refundNo}</div>
                      <div>{moment().format('YYYY-MM-DD')}</div>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Modal>
    </>
  );
};

export default PreviewPrintModal;
