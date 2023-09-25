<template>
  <div v-for="(item, itemIndex) in props.items" :key="item.index" class="anchorContainerItem">
    <el-text :type="activeIndex === item.index ? 'primary' : ''" tag="a" :href="item.href" @click="handleClick(item.index)">
      <el-icon v-if="item.icon"></el-icon>
      <b v-else>{{ itemIndex + 1 }}.</b>
      <b>{{ item.title }}</b>
    </el-text>
    <anchor-item v-if="item.children && item.children.length > 0" :items="item.children"></anchor-item>
  </div>
</template>

<script setup lang="ts" name="anchorItem">
import { useInject } from '../helper';

import type { ItemsTypeList } from '../index';

type PropsType = {
  items: ItemsTypeList[];
};

const props = defineProps<PropsType>();
const { activeIndex, handleClick } = useInject();
</script>

<style lang="scss" scoped>
.anchorContainerItem {
  line-height: 2;
  padding-left: 5px;
  b {
    padding-right: 10px;
  }
}
</style>
