<template>
  <tree-table-card :table="tableHandle" :column="column" title="数据字典" @add-handle="addItem">
    <template #tableLeft>
      <el-card shadow="never" style="margin-right: 20px; width: 25%; max-width: 350px">
        <el-row>
          <el-col :span="24">
            <el-input placeholder="搜索字典类型" :suffix-icon="Search"></el-input>
          </el-col>
        </el-row>

        <el-row align="middle" style="margin: 10px 0">
          <el-button @click.stop="changeModal(undefined)">新增字典类型</el-button>
          <el-button :icon="RefreshLeft" title="重新加载" @click.stop="execute()"> </el-button>
        </el-row>
        <el-row v-for="(roleVal, roleIndex) in state.records" :key="`role${roleIndex}`" class="row-item">
          <el-col :span="22" @click.stop="getDictItem">
            <el-text>
              <el-tag size="small" type="danger">
                <template #default>
                  <el-icon>
                    <user-filled></user-filled>
                  </el-icon>
                  禁用
                </template>
              </el-tag>
              {{ roleVal.label }}
            </el-text>
          </el-col>
          <el-col :span="2">
            <el-dropdown style="padding-right: 20px" trigger="click">
              <el-button link>...</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click.stop="changeModal(roleVal)">编辑</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown></el-col
          >
        </el-row>
      </el-card>
    </template>
    <template #edit="{ row }">
      <el-button @click.stop="addItem(row)">编辑</el-button>
      <el-button @click.stop="del">删除</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <dict-action v-model:visible="visible" :data="modalData"></dict-action>
  <dict-item v-model:visible="itemVisible" :data="modalData"></dict-item>
</template>

<script lang="ts" setup name="dictIndex">
import type { DictResponseType, DictRequestType } from '@/apis/dict';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

import { getRoleList } from '@/apis/role';

import { useTable } from '@packages/utils-common/components/TreeTable';
import { useAsync } from '@packages/utils-common/hook';
import dictAction from './dictAction.vue';
import dictItem from './dictItem.vue';
import { ElMessage } from 'element-plus';
import { Search, UserFilled, RefreshLeft } from '@packages/utils-icon/src/elementPlus';

const visible = shallowRef<boolean>(false);
const itemVisible = shallowRef<boolean>(false);

const modalData = shallowRef<DictResponseType | undefined>(undefined);
const column: ColumnType[] = [
  { label: '字典值', field: 'value', fixed: 'left' },
  { label: '是否默认', field: 'isDefault' },
  { label: '状态', field: 'enabled' },
  { label: '更新时间', field: 'updateTime' },
  { label: '更新人', field: 'updateBy' },
  { label: '操作', slot: 'edit', width: '250', fixed: 'right' },
];

const initRequestData = () => ({ query: 10, currentPage: 1, name: '' });
const requestPage = shallowReactive<DictRequestType>(initRequestData());

const tableHandle = useTable<DictRequestType, DictResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, props: { currentKey: 'pageNo' } },
  autoRequest: true,
  api: '/system/dict',
});

const { doRequest } = tableHandle;

const { loading: roleLoading, execute, state, error } = useAsync(() => getRoleList(initRequestData()));

await execute();

const del = () => {
  ElMessage.success('删除成功');
};

const getDictItem = () => {
  doRequest();
};

const addItem = (data: DictResponseType | undefined) => {
  itemVisible.value = true;
  modalData.value = data;
};

const changeModal = (data: DictResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};
</script>

<style lang="scss" scoped>
.row-item {
  line-height: 1.7;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
}
</style>
