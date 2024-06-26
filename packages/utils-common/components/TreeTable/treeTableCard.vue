<template>
  <space-index direction="vertical">
    <!-- search -->
    <div class="card-container">
      <slot name="tableTitle">
        <div class="card-container-header">
          <el-text size="large" tag="b">{{ title }}</el-text>
        </div>
      </slot>

      <div class="card-container-body">
        <slot name="tableSearch"> </slot>
      </div>
    </div>

    <div style="display: flex">
      <slot name="tableLeft"></slot>
      <el-card shadow="never" style="flex: 1">
        <template #header>
          <div class="el-row is-justify-space-between is-align-middle">
            <el-text size="large" tag="b">数据展示</el-text>
            <div>
              <el-button type="danger" title="新增" @click.stop="emits('addHandle')">
                <el-icon>
                  <plus />
                </el-icon>
                <span>新增</span></el-button
              >
              <el-button :icon="RefreshLeft" :loading="table.loading.value || false" title="重新加载" @click.stop="table.doRequest()"> </el-button>
              <el-button :icon="uploadThree" title="导出"> </el-button>
              <el-popover trigger="click" :teleported="true">
                <template #reference>
                  <el-button :icon="filterIcon" title="过滤"> </el-button>
                </template>
                <el-scrollbar max-height="300px">
                  <el-text size="small" type="info">列展示:</el-text>
                  <el-checkbox-group v-model="columnCheckList">
                    <el-checkbox
                      v-for="(columnItem, columnIndex) in column"
                      :key="`column${columnIndex}`"
                      :label="columnItem.label"
                      :checked="true"
                      :disabled="Boolean(columnItem.fixed)"
                      style="display: block"
                    ></el-checkbox>
                  </el-checkbox-group>
                </el-scrollbar>
              </el-popover>
            </div>
          </div>
        </template>

        <!-- table -->
        <el-table v-loading="table.loading.value" :data="data || table.data.value" v-bind="attrs" style="width: 100%" @selection-change="selectionChange">
          <el-table-column
            v-for="tableVal in columnList"
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
          <template #empty>
            <el-empty :image-size="50" description="暂无数据"> </el-empty>
          </template>
        </el-table>

        <el-row v-if="table.pagination.show" style="padding: 16px 0; justify-content: end">
          <el-pagination
            v-model:current-page="table.pagination.current"
            v-model:page-size="table.pagination.pageSize"
            background
            layout="prev, pager, next"
            :total="table.pagination.total"
          ></el-pagination>
        </el-row>
      </el-card>
    </div>
  </space-index>
</template>

<script lang="ts" setup name="treeTableCard">
import { defineEmits, defineProps, toRefs, withDefaults, ref, computed, watch, useAttrs } from 'vue';
import { Plus, RefreshLeft } from '@packages/utils-icon/src/elementPlus';
import spaceIndex from '../Space/spaceIndex.vue';
import { useIcon } from '../../hook';

import type { TableParam, ColumnType } from './index';

type TreeTableCard = {
  table: TableParam;
  column: ColumnType[];
  title: string;
  data?: any[];
  selection?: (row: any, index: number) => boolean;
};

const attrs = useAttrs();
const emits = defineEmits(['addHandle', 'exportHandle', 'SelectionChange']);
const props = withDefaults(defineProps<TreeTableCard>(), {
  title: '',
});

const columnCheckList = ref<string[]>([]);
const [uploadThree, filterIcon] = useIcon(['upload-three', 'filters']);
const { table } = toRefs(props);

const columnList = computed(() =>
  props.column.filter((item: any) => {
    return columnCheckList.value.includes(item.label);
  })
);

const selectionChange = (selection: any) => {
  emits('SelectionChange', selection);
  return true;
};

watch(
  () => table.value.pagination.current,
  () => {
    table.value.doRequest();
  }
);
</script>

<style lang="scss" scoped>
.card-container {
  --el-card-border-radius: 4px;
  --el-card-padding: 20px;

  width: 100%;
  margin-bottom: 12px;
  border-radius: var(--el-card-border-radius);
  border: 1px solid var(--el-border-color-light);
  background-color: var(--el-fill-color-blank);
  overflow: hidden;
  color: var(--el-text-color-primary);
  -webkit-transition: var(--el-transition-duration);
  transition: var(--el-transition-duration);

  &-header {
    padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
    border-bottom: 1px solid var(--el-border-color-light);
  }
  &-body {
    padding: var(--el-card-padding);
  }
}
</style>
