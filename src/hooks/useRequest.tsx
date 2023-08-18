/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

/**
 * 通用hooks
 * api请求
 *  @param { 接口 } api
 *  @param { 入参 } params
 */

import { useState, useEffect } from 'react';

const useRequest = (api: any, params: any) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(params);
        response.success && setData(data);
        setLoading(false);
      } catch {
        setLoading(false);
        throw new Error('请求错误');
      }
    };

    fetchData();

    return () => {
      // Optionally, you can cancel any ongoing requests or perform other cleanup tasks here.
    };
  }, [api]);

  return { data, loading };
};

export default useRequest;
