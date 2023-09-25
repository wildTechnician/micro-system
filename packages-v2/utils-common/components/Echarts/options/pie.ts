import { parseTypes } from '../../../utils/index';

import { PieChart } from 'echarts/charts';
import { use } from 'echarts/core';

import type { PieSeriesOption, ToolOption, PieCompleteOption } from '../echarts.type';

export default function pieOptions(data: Array<Array<string | number> | object>, config?: PieSeriesOption | ToolOption | PieCompleteOption): PieSeriesOption[] | ToolOption | PieCompleteOption {
  const optionsDataLength: number = data && data.length > 0 ? (parseTypes(data[0], 'array') ? (data[0] as Array<string | number>).length : Object.keys(data[0]).length) : 1;
  const defaultOptions: PieSeriesOption = {
    type: 'pie',
    label: {
      show: true,
      position: 'top',
      color: undefined,
      fontSize: 12,
    },
    itemStyle: {
      color: undefined,
      borderRadius: 2,
    },
  };

  // 按需加载
  use(PieChart);

  if (config && 'series' in config) {
    let allOptions = Array(optionsDataLength - 1).fill(config['series']);
    return { ...config, ...{ series: allOptions } };
  } else {
    return Array(optionsDataLength - 1).fill(config ? config : defaultOptions);
  }
}
