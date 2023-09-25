<template>
  <el-sub-menu v-if="items.children && items.children.length > 0" :index="items.path" popper-class="removeStyle" :teleported="false">
    <template #title>
      <el-icon> <component :is="iconList[items.name]"></component> </el-icon>
      <span>{{ items.meta.title }}</span></template
    >
    <components-menu-item v-for="(loopItem, loopIndex) in items.children" :key="`loopItem${loopIndex}`" :items="loopItem" :tab-plan-name="props.tabPlanName"></components-menu-item>
  </el-sub-menu>
  <el-menu-item v-else :index="items.path">
    <el-icon>
      <component :is="iconList[items.name]"></component>
    </el-icon>
    <template #title
      ><span>{{ items.meta.title }}</span></template
    ></el-menu-item
  >
</template>

<script lang="ts" setup name="componentsMenuItem">
import { getIcon } from '@packages/utils-icon/src/get';
import { reactive, shallowRef, toRaw, inject } from 'vue';

import type { Component } from 'vue';

const props = defineProps<{ items: MenuRoute.Route; tabPlanName?: string }>();
const iconList = reactive<{ [key: string]: Component }>({});
const injects = inject<{ addSubMenuIndex: Function }>('layoutSidebar', { addSubMenuIndex: () => {} });

// 侧边tab切换栏在页面刷新时默认高亮
injects.addSubMenuIndex(props.items, props.tabPlanName);

function loopSearchIcon(data: MenuRoute.Route[]) {
  data.map((item: MenuRoute.Route) => {
    if (item.children && item.children.length > 0) {
      loopSearchIcon(item.children);
    }
    if (item.meta?.icon) {
      iconList[item.name as string] = shallowRef(getIcon(item.meta.icon));
    }
  });
  return data;
}
loopSearchIcon([toRaw(props.items)]);
</script>
