<template>
  <div ref="echartsContainer" style="height: 100%"></div>
</template>

<script setup lang="ts" name="EchartsIndex">
import type { EChartsCoreOption } from 'echarts';
import type { Ref } from 'vue';

import { onMounted, watch, ref } from 'vue';

import { useChart } from './hook';

const props = defineProps<{
  options: EChartsCoreOption;
}>();
const echartsContainer = ref<HTMLElement>();

const { getInstance, loading, setOptions } = useChart(echartsContainer as Ref<HTMLElement>);

onMounted(() => {
  setOptions(props.options);
});

defineExpose({
  instance: getInstance,
  loading,
});

watch(
  () => props.options,
  (val: EChartsCoreOption) => {
    // 普通合并 https://echarts.apache.org/zh/api.html#echartsInstance
    setOptions(props.options);
  },
  { deep: true }
);
</script>
