<template>
  <tree-table-card
    :table="tableHandle"
    :data="tableData"
    :column="column"
    title="部门管理"
    row-key="id"
    @add-handle="
      addChild = false;
      changeModal(undefined);
    "
    @update-handle="changeModal"
  >
    <template #tableSearch>
      <form-provider :form="forms">
        <form-layout wrapper-align="left" layout="inline">
          <void-field name="grid" :component="[FormGrid, { maxColumns: 4, minColumns: 1 }]">
            <field
              v-for="(item, index) in searchData"
              :key="`from${index}` + index"
              :name="item.name"
              :title="item.title"
              :required="item.required"
              :visible="item.visible || true"
              :validator="item.validator"
              :initial-value="item.initialValue || undefined"
              :decorator="item.decorator"
              :data-source="item.dataSource"
              :component="item.component"
              :content="item.content || undefined"
            />
          </void-field>
          <el-button type="primary" :loading="loading" @click.stop="changeSearch(forms.values, false)">提交</el-button>
          <el-button :loading="loading" @click.stop="changeSearch(initRequestData(), true)">重置</el-button>
        </form-layout>
      </form-provider>
    </template>
    <template #enabled="{ row }">
      <el-tag :type="row.enabled ? 'success' : 'danger'">{{ row.enabled ? '启用' : '禁用' }}</el-tag>
    </template>
    <template #edit="{ row }">
      <el-button
        @click.stop="
          addChild = false;
          changeModal(row);
        "
        >编辑</el-button
      >
      <el-button @click.stop="del(row)">删除</el-button>
      <el-button
        v-if="row.level < 2"
        @click.stop="
          addChild = true;
          changeModal(row);
        "
        >添加下级</el-button
      >
      <el-button @click.stop="boundaryModal(row)">边界</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <dept-action v-model:visible="visible" :data="modalData" :add-child="addChild" @request="changeSearch({}, true)"></dept-action>
  <dept-boundary v-model:visible="boundaryVisible" :data="modalData" @request="changeSearch({}, true)"></dept-boundary>
</template>

<script lang="ts" setup name="deptIndex">
import { useTable } from '@packages/utils-common/components/TreeTable';
import deptAction from './deptAction.vue';
import deptBoundary from './deptBoundary.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { searchData } from './deptFromData';
import { delDept } from '@/apis';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

import type { DeptResponseType, DeptRequestType } from '@/apis';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

const visible = shallowRef<boolean>(false);
const boundaryVisible = shallowRef<boolean>(false);
const addChild = shallowRef<boolean>(false);
const modalData = shallowRef<DeptResponseType | undefined>(undefined);
const column: ColumnType[] = [
  { label: '名称', field: 'name', align: 'left', fixed: 'left' },
  { label: '负责人', field: 'leader', fixed: 'left' },
  { label: '状态', slot: 'enabled' },
  { label: '更新人', field: 'updateBy' },
  { label: '更新时间', field: 'updateTime', width: '180' },
  { label: '操作', slot: 'edit', width: '350', fixed: 'right' },
];

const initRequestData = (): DeptRequestType => ({ enabled: true, name: '' });
const requestPage = shallowReactive<DeptRequestType>(initRequestData());

const tableHandle = useTable<DeptRequestType, DeptResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, show: false },
  autoRequest: true,
  api: '/system/dept',
});

const { loading, doRequest } = tableHandle;

const tableData = computed(() => {
  const list = unref(tableHandle.data);
  const loop = (data: DeptResponseType[], level: number = 1) => {
    data.map((item) => {
      item['level'] = level;
      if (item.children && item.children.length > 0) {
        return loop(item.children, ++level);
      }
    });
    return list;
  };
  return list && loop(list, 1);
});

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  initialValues: requestPage,
});

const del = async (data: DeptResponseType) => {
  try {
    await ElMessageBox.confirm(`是否删除 ${data.name} 部门?`, '提示');
    await delDept(data.id as string);
    changeSearch(initRequestData(), true);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const changeModal = (data: DeptResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const boundaryModal = (data: DeptResponseType | undefined) => {
  boundaryVisible.value = true;
  modalData.value = data;
};

const changeSearch = (data: DeptRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};
</script>
