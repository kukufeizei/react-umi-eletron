/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from 'react';
import { useCallback } from 'react';
import { message } from 'antd';
import copy from 'copy-to-clipboard';
import { CopyOutlined } from '@ant-design/icons';

// copy component
const CopyIconCom: React.FC<{ text: string }> = ({ text }) => {
  const handleCopy = useCallback(() => {
    copy(text);
    message.success('复制成功');
  }, [text]);

  return <CopyOutlined onClick={() => handleCopy()} />;
};

export default CopyIconCom;
