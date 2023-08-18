/**
 * 通用hooks
 * 强制更新组件
 */

import { useState } from 'react';

const useUpdate = () => {
  const [, setFlag] = useState<any>();
  const update = () => {
    setFlag(Date.now());
  };

  return update;
};

export default useUpdate;
