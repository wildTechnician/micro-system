import { parseTypes } from '../../../utils/index';

import { LineChart } from 'echarts/charts';
import { use } from 'echarts/core';
import toolOptions from './tool';

import type { EChartsCoreOption } from 'echarts';
import type { LineSeriesOption, ToolOption, LineCompleteOption } from '../echarts.type';

export default function lineOptions(data: Array<Array<string | number> | object>, config?: LineSeriesOption | ToolOption | LineCompleteOption): EChartsCoreOption {
  const optionsDataLength: number = data.length > 0 ? (parseTypes(data[0], 'array') ? (data[0] as Array<string | number>).length : Object.keys(data[0]).length) : 1;
  const defaultToolOptions = toolOptions();
  const defaultOptions: LineSeriesOption = {
    type: 'line',
    label: {
      show: true,
      position: 'top',
      color: undefined,
      fontSize: 12,
    },
    itemStyle: {
      color: undefined,
    },
  };

  // 按需加载
  use(LineChart);

  defaultToolOptions['series'] = Array(optionsDataLength - 1).fill(defaultOptions);
  defaultToolOptions['dataset'] = config && 'dataset' in config ? config.dataset : { source: data };

  return defaultToolOptions;
}
