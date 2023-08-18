import React, { useState } from 'react';
import { Modal, Checkbox, Row, Col } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { FC } from 'react';
import type { ModalTypes } from './types';

const QualityModal: FC<ModalTypes> = ({
  isModalOpen,
  setModalOpen,
  qualityList,
  getModalQualityCheckVal,
}) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[] | undefined>(undefined);

  const handleOk = () => {
    getModalQualityCheckVal(checkedValues as CheckboxValueType[]);
    setModalOpen(false);
  };

  const onChange = (values: CheckboxValueType[]) => {
    setCheckedValues(values);
  };

  return (
    <Modal title="新增品质" open={isModalOpen} onOk={handleOk} onCancel={() => setModalOpen(false)}>
      <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
        <Row>
          {qualityList?.map((item) => {
            return (
              <Col span={6} key={item.value}>
                <Checkbox value={item.value}>{item.name}</Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </Modal>
  );
};

export default QualityModal;
