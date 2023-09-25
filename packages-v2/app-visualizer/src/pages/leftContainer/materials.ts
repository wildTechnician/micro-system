import { echartsBlockElement } from '@/components';
import { barOption, toolOption } from '@packages/utils-common/components/Echarts/index';

import { getPieList } from '@/apis/pie';

import { useAsync } from '@packages/utils-common/hook';
export default defineComponent({
  name: 'MaterialsContainer',
  async setup() {
    const { state, execute } = useAsync(getPieList('/charts/pie', {}));

    const allOptions = computed(() => {
      return toolOption({
        yAxis: {
          type: 'category',
          nameTextStyle: {
            color: '#ffffff',
          },
        },
        xAxis: {
          type: 'value',
          nameTextStyle: {
            color: '#fff',
          },
        },
        grid: {
          show: false,
          top: 'top',
          right: '5%',
          bottom: '8%',
        },
        dataset: {
          dimensions: ['name', 'data'],
          source: state.value,
        },
        series: barOption([['name', 'data']]),
      });
    });

    await execute();
    return () => {
      return h(echartsBlockElement, { title: '防火物资', options: allOptions.value, height: 300 });
    };
  },
});
