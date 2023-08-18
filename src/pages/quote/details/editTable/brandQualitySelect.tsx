import type { FC } from 'react';
import type { BrandQualitySelectTypes } from './types';
import type { SelectProps } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Select } from 'antd';
import { getBrandByQuality } from '@/api/quote';

const BrandQualitySelect: FC<BrandQualitySelectTypes> = (
  { enquiryQuality, disabled, brandName, handleChangeBrandName },
  ref,
) => {
  const [mData, setData] = useState<SelectProps['options']>([]);
  const [val, setValue] = useState<string | null>(null);

  let timeout: ReturnType<typeof setTimeout> | null;
  let currentValue: string;

  // 请求数据
  const fetch = (value: string, callback: Function) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    currentValue = value;

    const fake = async () => {
      if (currentValue === value) {
        const { data } = await getBrandByQuality({
          brandName: value,
          enquiryQuality: enquiryQuality as number,
        });

        // @ts-ignore
        const data1 = data?.map((item: any) => ({
          value: item.id,
          text: item.name,
        }));

        callback(data1);
      }
    };

    timeout = setTimeout(fake, 300);
  };

  const handleSearch = (newValue: string) => {
    if (newValue) {
      fetch(newValue, setData);
    } else {
      setData([]);
    }
  };
  useImperativeHandle(ref, () => ({
    clearVal: () => {
      setValue(null);
    },
    setVal: (targetVal: string | null | undefined) => {
      setValue(targetVal as string);
    },
  }));

  useEffect(() => {
    setValue(brandName as string);
  }, [brandName]);

  return (
    <Select
      disabled={disabled}
      showSearch
      allowClear
      value={val}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChangeBrandName}
      notFoundContent={null}
      options={(mData || []).map((d) => ({
        value: d.text,
        label: d.text,
      }))}
    />
  );
};

// @ts-ignore
export default forwardRef(BrandQualitySelect);
