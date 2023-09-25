import { echartsBlockElement } from '@/components';
import { pieOption, toolOption } from '@packages/utils-common/components/Echarts/index';

import { getPieList } from '@/apis/pie';

import { useAsync } from '@packages/utils-common/hook';
export default defineComponent({
  name: 'ThreatContainer',
  setup() {
    const { state, execute } = useAsync(getPieList('/charts/pie', {}));

    const allOptions = computed(() => {
      const commonOptions = toolOption({
        grid: { show: false },
        xAxis: { show: false },
        yAxis: { show: false },
        dataset: {
          dimensions: ['name', 'data'],
          source: state.value,
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          show: true,
          type: 'scroll',
          orient: 'vertical',
          right: 5,
          textStyle: {
            color: '#ffffff',
          },
        },
        series: {
          type: 'pie',
          label: {
            show: false,
          },
        },
      });
      return pieOption(state.value, commonOptions);
    });

    execute();
    return () => {
      return h(echartsBlockElement, { title: '隐患排查', options: allOptions.value, height: 200 });
    };
  },
});
