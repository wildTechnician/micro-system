<template>
  <block-element :title="props.title" :icon="props.icon">
    <echartsIndex :options="props.options" :style="{ height: `calc(${props.height} / 1080 * 100vh)` }"></echartsIndex>
  </block-element>
</template>

<script setup lang="ts" name="echartsBlockElement">
import blockElement from './blockElement.vue';
import { echartsIndex } from '@packages/utils-common/components/Echarts';

import type { EChartsCoreOption } from 'echarts';

type PropsType = {
  title?: string;
  icon?: string;
  height?: number;
  options: EChartsCoreOption;
};

const props = defineProps<PropsType>();
</script>
