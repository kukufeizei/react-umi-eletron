/* eslint-disable react-hooks/exhaustive-deps */

/**
 * 通用hooks
 * 防抖
 * @param { 回调 } fn
 * @param { 间隔时间 } ms
 * @param { 依赖项 } deps
 */

import { useEffect, useRef } from 'react';
const useDebounce = (fn: any, ms = 30, deps = []) => {
  let timeout = useRef();
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    // @ts-ignore
    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  }, deps);

  const cancel = () => {
    clearTimeout(timeout.current);
    // @ts-ignore
    timeout = null;
  };

  return [cancel];
};

export default useDebounce;
