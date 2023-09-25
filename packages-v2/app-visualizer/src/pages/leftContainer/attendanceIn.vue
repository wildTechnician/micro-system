<template>
  <blockElement title="考勤管理">
    <div class="attendanceIn-container">
      <tree-table :show-header="false" :column="column" :data="data" :row-style="{ backgroundColor: 'transparent' }" :cell-style="{ borderBottom: '1px solid var(--el-color-info-light-3)' }">
        <template #edit>
          <el-button link :icon="icon" style="color: #fff"></el-button>
        </template>
      </tree-table>
    </div>
  </blockElement>
</template>

<script setup lang="ts" name="attendanceIn">
import { blockElement } from '@/components';
import { useIcon } from '@packages/utils-common/hook';
import treeTable from '@packages/utils-common/components/TreeTable/tableIndex.vue';
const column = [
  { label: '', field: 'aa' },
  { label: '', slot: 'edit', with: '10px' },
];
const data = [
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
  { aa: '大雪山林场' },
];

const [icon] = useIcon('right');
</script>

<style lang="scss" scoped>
.attendanceIn-container {
  min-height: 150px;
  height: tovh(150);
}
.el-table {
  background-color: transparent;
  color: white;
}
:deep(.el-table tbody tr:hover > td) {
  background-color: rgba(0, 0, 0, 0.75) !important;
}
</style>
