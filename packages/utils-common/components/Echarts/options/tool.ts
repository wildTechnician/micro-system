import type { ToolOption } from '../echarts.type';
import { use } from 'echarts/core';

import { GridComponent, TitleComponent, TooltipComponent, DatasetComponent, LegendComponent } from 'echarts/components';

export default function toolOptions(opt?: ToolOption): ToolOption {
  use([GridComponent, TitleComponent, TooltipComponent, DatasetComponent, LegendComponent]);

  const baseOptions: ToolOption = {
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        show: true,
        type: 'shadow',
      },
    },
    legend: {
      show: false,
    },
    xAxis: {
      show: true,
      type: 'category',
    },
    yAxis: {
      show: true,
      type: 'value',
    },
    grid: {
      show: true,
      top: 'top',
    },
  };

  return { ...baseOptions, ...opt };
}
