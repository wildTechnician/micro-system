<template>
  <el-table :data="data" v-bind="attrs" style="width: 100%" @selection-change="selectionChange">
    <el-table-column
      v-for="tableVal in column"
      :key="tableVal.field"
      :column-key="tableVal.field"
      :label="tableVal.label || ''"
      :type="tableVal.type || 'default'"
      :prop="tableVal.field || ''"
      :sortable="tableVal.sortable || false"
      :width="tableVal.width || ''"
      :align="tableVal.align || 'center'"
      :show-overflow-tooltip="tableVal.tooltip || true"
      :selectable="selection"
      :fixed="tableVal.fixed || false"
    >
      <template v-if="!tableVal.type" #default="scope">
        <slot v-if="tableVal.slot" :name="tableVal.slot" :row="(scope as any).row" :index="(scope as any).$index"></slot>
        <span v-else>{{ (scope as any).row[tableVal.field as string] }}</span>
      </template>
    </el-table-column>
    <template #empty> <el-empty :image-size="50" description="暂无数据" /></template>
  </el-table>
</template>

<script lang="ts" name="tableIndex" setup>
import { useAttrs } from 'vue';

import type { ColumnType } from './index';

interface TreeTable {
  data: any[];
  column: ColumnType[];
  selection?: (row: any, index: number) => boolean;
}

const attrs = useAttrs();
withDefaults(defineProps<TreeTable>(), {
  data: () => [],
  column: () => [],
  selection: () => true,
});
const emits = defineEmits(['SelectionChange']);

const selectionChange = (selection: any) => {
  emits('SelectionChange', selection);
  return true;
};
</script>

<style lang="scss">
.el-table th.el-table__cell {
  background-color: var(--el-fill-color-light) !important;
}
</style>
