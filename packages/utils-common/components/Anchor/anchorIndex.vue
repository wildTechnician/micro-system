<template>
  <div class="anchor-container">
    <anchor-item :items="props.items"></anchor-item>
  </div>
</template>

<script setup name="anchorIndex" lang="ts">
import { scrollTo, getSuperWindows, isValidElementNode, parseTypes, getScroll } from '../../utils';
import { useScrollbar } from '../../hook';
import { useProvide } from './helper';
import anchorItem from './components/anchorItem.vue';
import { shallowRef, computed, unref, onMounted, nextTick } from 'vue';

import type { ScrollContainer } from '../../utils';
import type { ItemsTypeList } from './index';

type Section = {
  index: string;
  distance: number;
};

type PropsType = {
  items: ItemsTypeList[];
  container?: () => ScrollContainer;
};

const activeIndex = shallowRef<string>('');
const props = withDefaults(defineProps<PropsType>(), {
  container: () => getSuperWindows(),
});
const scrollBarContainer = computed(() => {
  const { container } = props;
  if (!container) return getSuperWindows();
  if (isValidElementNode(container())) {
    return unref(container());
  }
  return container();
});

const { y } = useScrollbar(scrollBarContainer, handleScroll);

const getAnchorDistance = computed(() => {
  const allItems: ItemsTypeList[] = [];
  const loop = (data: ItemsTypeList[]) => {
    data.map((item) => {
      if (item.children && item.children.length > 0) {
        loop(item.children);
      }
      allItems.push(item);
    });
  };
  loop(props.items);
  return allItems.map((item) => {
    let el = document.getElementById(item.index);
    item['distance'] = el ? getOffsetTop(el, scrollBarContainer.value) : 0;
    return item;
  });
});

/**
 * 滑动监听
 * @param bound 容差
 */
function handleScroll(bound: number = 0): void {
  const targets: Array<Section> = [];

  for (let item of getAnchorDistance.value) {
    item.distance = item.distance ? item.distance : 0;

    if (unref(y) <= Math.abs(item.distance) + bound) {
      targets.push({
        index: item.index,
        distance: item.distance,
      });
    }
  }

  if (targets && targets.length) {
    const activeItem = targets.reduce((prev, curr) => {
      return curr.distance <= prev.distance ? curr : prev;
    });
    activeIndex.value = activeItem.index;
  } else {
    activeIndex.value = '';
  }
}

/**
 * ant design 元素在容器中滚动的高度
 * @param element
 * @param container
 */
function getOffsetTop(element: HTMLElement, container: ScrollContainer = getSuperWindows()): number {
  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (parseTypes(container, 'window')) {
      container = element.ownerDocument!.documentElement!;
      return rect.bottom - container.clientTop;
    }
    return rect.bottom - (container as HTMLElement).getBoundingClientRect().top;
  }
  return rect.top;
}

/**
 *
 * @param link
 */
function handleScrollTo(link: string) {
  const targetElement = document.getElementById(link);
  if (!targetElement) return;

  const offsetTop = getOffsetTop(targetElement, scrollBarContainer.value);
  const scrollTop = getScroll(scrollBarContainer.value, true);
  const y = scrollTop + offsetTop;

  scrollTo(y, scrollBarContainer.value);
}

/**
 *
 * @param link
 */
function handleClick(link: string) {
  handleScrollTo(link);
}

onMounted(() => {
  nextTick(() => {
    handleScroll(0);
  });
});

useProvide({
  handleClick,
  activeIndex,
});
</script>
