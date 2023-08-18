import { Tabs } from 'antd';
import React, { useEffect } from 'react';

interface Types {
  items: any[] | undefined;
  handleChangeTabs: (key: string) => void;
  defaultActiveKey?: number | string;
}
const StatusTabComp: React.FC<Types> = ({ items, handleChangeTabs, defaultActiveKey = 1 }) => {
  const onChange = (key: string) => {
    handleChangeTabs(key);
  };

  const showItems = items?.map((i) => {
    return {
      label: (
        <>
          <span style={{ marginRight: '5px' }}>{i.label}</span>
          <span style={{ marginRight: '10px' }}>{i.count}</span>
        </>
      ),
      key: `${i.key}`,
    };
  });

  return (
    <>
      <Tabs defaultActiveKey={defaultActiveKey as string} items={showItems} onChange={onChange} />
    </>
  );
};

export default StatusTabComp;
