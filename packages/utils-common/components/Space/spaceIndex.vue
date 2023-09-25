/** * 填补默认el-space不足 */
<template>
  <slotItems></slotItems>
</template>

<script lang="ts" setup>
import { VNode } from 'vue';
import { parseTypes, isValidElementNode } from '../../utils';
import { ref, useSlots, computed, defineComponent, h, watchEffect } from 'vue';

type SpaceType = {
  direction?: 'horizontal' | 'vertical';
  size?: Array<any> | number | string;
  fillRation?: number;
};

const SIZE_MAP = {
  small: 8,
  default: 12,
  large: 16,
} as const;

const horizontalSize = ref(0);
const verticalSize = ref(0);

const props = withDefaults(defineProps<SpaceType>(), {
  direction: 'horizontal',
  size: 'default',
  fillRation: 100,
});
const slots = useSlots();

const itemStyle = computed(() => {
  const baseStyle = {
    paddingBottom: `${verticalSize.value}px`,
    marginRight: `${horizontalSize.value}px`,
  };

  const fillStyle = {
    flexGrow: 1,
    minWidth: `${props.fillRation}%`,
  };

  return [baseStyle, fillStyle];
});

const renderSlot = () => {
  const items = (slots.default && slots.default()) ?? [];
  const extractedElement: VNode[] = [];
  items.map((item) => {
    if (isValidElementNode(item)) {
      extractedElement.push(h('div', { style: itemStyle.value }, item));
    }
  });
  return extractedElement;
};

const slotItems = defineComponent({
  render() {
    return h('div', { style: { display: 'flex', flexDirection: props.direction === 'vertical' ? 'column' : 'row' } }, renderSlot());
  },
});

watchEffect(() => {
  const { size, direction } = props;

  if (parseTypes(size, 'array')) {
    const [h = 0, v = 0] = size as Array<number>;
    horizontalSize.value = h;
    verticalSize.value = v;
  } else {
    let val: number;
    if (parseTypes(size, 'number')) {
      val = size as number;
    } else {
      val = SIZE_MAP[(size as 'small' | 'default' | 'large') || 'small'] || SIZE_MAP.small;
    }

    if (direction === 'horizontal') {
      horizontalSize.value = verticalSize.value = val;
    } else {
      verticalSize.value = val;
      horizontalSize.value = 0;
    }
  }
});
</script>
