<template>
  <el-row class="item-container" align="middle" :style="{ cursor: type == 'user' ? 'pointer' : 'auto' }" @click.stop.prevent="nodeClick">
    <el-col :span="20">
      <el-checkbox v-if="type == 'user'" v-model="selected" @click.stop.prevent="nodeClick"></el-checkbox>
      <el-avatar :size="30" :style="{ backgroundColor: type == 'user' ? 'var(--el-text-color-disabled)' : 'var(--el-color-primary-light-5)', margin: '0px 5px' }">
        <el-icon v-if="type == 'group'">
          <component :is="treeListIcon"></component>
        </el-icon>
        <span v-else>{{ item.name.charAt(item.name.length - 1) }}</span>
      </el-avatar>
      <span>{{ item.name }} </span>
    </el-col>
    <el-col v-if="type == 'group'" :span="4">
      <el-button link :icon="treeListIcon" :disabled="selected" @click.stop.prevent="nextLevel(item.children, item)">下级</el-button>
    </el-col>
  </el-row>
</template>

<script setup lang="ts" name="OrganiseItem">
import { useIcon } from '../../../hook';
import { defineEmits, defineProps, shallowRef, watch } from 'vue';

type IProps = {
  item: Record<string, any>;
  type: 'group' | 'user';
  isSelect: boolean;
};

const props = defineProps<IProps>();
const emits = defineEmits(['nextLevel', 'nodeClick']);
const selected = shallowRef<boolean>(false);
const [treeListIcon] = useIcon(['tree-list']);

const nodeClick = () => {
  if (props.type == 'group') return;
  selected.value = !props.isSelect;
  emits('nodeClick', props.item, selected.value, props.type);
};
const nextLevel = (data: Array<any>, parent: any) => {
  emits('nextLevel', data, parent);
};

watch(
  () => props.isSelect,
  () => {
    selected.value = props.isSelect;
  }
);
</script>

<style lang="scss" scoped>
.item-container {
  padding: 8px 5px;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
  &_next {
    padding: 5px;
    &:hover {
      background-color: var(--el-color-primary-light-9);
    }
  }
}
</style>
