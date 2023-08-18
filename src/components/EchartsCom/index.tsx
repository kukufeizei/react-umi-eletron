/* eslint-disable @typescript-eslint/consistent-type-imports */
import React from 'react';
import * as charts from 'echarts';
import ReactEcharts from 'echarts-for-react';
type EChartsOption = charts.EChartsOption;

// echarts
const EchartsCom: React.FC<{ option: EChartsOption }> = ({ option }) => {
  const getOptions = () => {
    return option;
  };

  return <ReactEcharts option={getOptions()} style={{ width: '100%', height: '350px' }} />;
};

export default EchartsCom;
