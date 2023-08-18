import { useRef, useEffect } from 'react';
/**
 * 通用hooks
 * 轮询
 *  @param { 回调函数 } fn
 *  @param { 延时时间 毫秒 } delay
 */
const useIntervalAsync = (fn: () => unknown, delay: number) => {
  const savedCallback = useRef<any>(undefined);

  useEffect(() => {
    savedCallback.current = fn;
  }, [fn]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useIntervalAsync;
