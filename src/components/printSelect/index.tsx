import { Select, message, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { getLodop, getScripts } from '@/utils/Lodop/LodopFuncs';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface ListTypes {
  label: any;
  value: number | string;
}
const PrintSelect = () => {
  const [printer, setPrinter] = useState<any>(undefined);
  const [printerList, setPrinterList] = useState<ListTypes[] | undefined>(undefined);

  const handleChange = (value: string) => {
    console.log('output->data', value);
    const target = printerList?.filter((item) => item.value === value);
    console.log(target);
    localStorage.setItem('print', JSON.stringify(target));
    setPrinter(target);
  };

  const getPrintList = () => {
    // windows平台
    const LODOP = getLodop();
    if (!LODOP) return;
    const iPrinterCount = LODOP.GET_PRINTER_COUNT();
    const list = [];
    for (let i = 0; i < iPrinterCount; i++) {
      list.push({
        label: LODOP.GET_PRINTER_NAME(i),
        value: i,
      });
    }
    setPrinterList(list);
  };

  const tooltipText = () => {
    return '使用完整的打印功能，请安装打印插件。如果您已经安装，请刷新页面重试';
  };

  useEffect(() => {
    if (localStorage.getItem('print')) {
      setPrinter(JSON.parse(localStorage.getItem('print') as string));
    }

    // windows平台下初始化打印机列表
    if (!/macintosh|mac os x/i.test(navigator.userAgent)) {
      getScripts();
      setTimeout(() => {
        getPrintList();
      }, 1000);
    }
  }, []);

  return (
    <>
      <div style={{ marginRight: '15px' }}>
        <Tooltip title={tooltipText}>
          <QuestionCircleOutlined />
        </Tooltip>
        <Select
          style={{ marginLeft: '15px', width: 220 }}
          value={printer}
          onChange={handleChange}
          options={printerList}
          placeholder="请设置您的默认打印机"
        />
      </div>
    </>
  );
};

export default PrintSelect;
