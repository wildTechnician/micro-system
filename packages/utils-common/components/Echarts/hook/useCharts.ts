import { ShallowRef, onBeforeUnmount, unref } from 'vue';

import { useLoading } from '../../../hook';

import * as echarts from 'echarts/core';

import type { EChartsCoreOption } from 'echarts';

import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';

export function useChart(elRef: ShallowRef<HTMLElement>) {
  const { loading, startLoading, endLoading } = useLoading();
  let instance: echarts.ECharts;

  const registerComponent = () => {
    echarts.use(CanvasRenderer);
  };

  registerComponent();

  const initStance = () => {
    const el = unref(elRef);
    if (!el) return;
    instance = echarts.init(el);
  };

  function getInstance(): echarts.ECharts {
    startLoading();
    if (!instance) {
      initStance();
    }

    return instance;
  }

  function setOptions(options: EChartsCoreOption) {
    getInstance().setOption(options);
    endLoading();
  }

  onBeforeUnmount(() => {
    instance?.dispose();
  });

  return {
    getInstance,
    setOptions,
    loading,
  };
}
