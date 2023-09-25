import { parseTypes } from '../../../utils/index';

import { BarChart } from 'echarts/charts';
import { use } from 'echarts/core';

import type { BarSeriesOption, ToolOption, BarCompleteOption } from '../echarts.type';

export default function barOptions(data: Array<Array<string | number> | object>, config?: BarSeriesOption | ToolOption | BarCompleteOption): BarSeriesOption[] | ToolOption | BarCompleteOption {
  let optionsDataLength: number = data && data.length > 0 ? (parseTypes(data[0], 'array') ? (data[0] as Array<string | number>).length : Object.keys(data[0]).length) : 1;
  const defaultOptions: BarSeriesOption = {
    type: 'bar',
    label: {
      show: true,
      color: '#fff',
      fontSize: 12,
    },
    itemStyle: {
      color: undefined,
    },
  };

  // 按需加载
  use(BarChart);

  if (config && 'series' in config) {
    let allOptions = Array(optionsDataLength - 1).fill(config['series']);
    return { ...config, ...{ series: allOptions } };
  } else {
    return Array(optionsDataLength - 1).fill(config ? config : defaultOptions);
  }
}
