import { echartsBlockElement } from '@/components';
import { pieOption, toolOption } from '@packages/utils-common/components/Echarts/index';

import { getPieList } from '@/apis/pie';

import { useAsync } from '@packages/utils-common/hook';
export default defineComponent({
  name: 'ResourceContainer',
  setup() {
    const { state, execute } = useAsync(getPieList({}));

    const allOptions = computed(() => {
      const commonOptions = toolOption({
        grid: { show: false },
        xAxis: { show: false },
        yAxis: { show: false },
        dataset: {
          dimensions: ['name', 'data'],
          source: state.value,
        },
        series: {
          type: 'pie',
          radius: [10, 100],
          roseType: 'area',
          label: {
            show: true,
            color: '#fff',
            borderWidth: 0,
          },
        },
      });
      return pieOption(state.value, commonOptions);
    });

    execute();
    return () => {
      return h(echartsBlockElement, { title: '资源数据', options: allOptions.value, height: 200 });
    };
  },
});
