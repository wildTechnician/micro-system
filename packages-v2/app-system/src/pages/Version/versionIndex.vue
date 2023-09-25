<template>
  <tree-table-card :table="tableHandle" :column="column" title="版本管理" @add-handle="changeModal" @update-handle="changeModal">
    <template #tableTitle>
      <el-tabs v-model="activeTab" style="padding: 5px 20px 0 20px" @tab-change="tableChange">
        <el-tab-pane name="app">
          <template #label>
            <el-text size="large" tag="b">移动端</el-text>
          </template>
        </el-tab-pane>
        <el-tab-pane name="pc">
          <template #label>
            <el-text size="large" tag="b">网页端</el-text>
          </template>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template #tableSearch>
      <form-provider :form="forms">
        <form-layout wrapper-align="left" layout="inline">
          <void-field name="grid" :component="[FormGrid, { maxColumns: 4, minColumns: 1 }]">
            <field
              v-for="(item, index) in searchData"
              :key="`from${index}` + index"
              :name="item.value"
              :title="item.label"
              :required="item.required"
              :visible="item.visible || true"
              :validator="item.validator"
              :initial-value="item.initialValue || undefined"
              :decorator="[item.decorator, item?.decoratorProps || {}]"
              :data-source="item.enum"
              :component="[item.component, item?.componentProps || {}]"
            />
          </void-field>
          <el-button type="primary" :loading="loading" @click.stop="changeSearch(forms.values, false)">提交</el-button>
          <el-button :loading="loading" @click.stop="changeSearch(initRequestData(), true)">重置</el-button>
        </form-layout>
      </form-provider>
    </template>
    <template #edit="{ row }">
      <el-button @click.stop="changeModal(row)">查看</el-button>
      <el-button @click.stop="changeModal(row)">编辑</el-button>
      <el-button @click.stop="del">删除</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <userAction v-model:visible="visible" :data="modalData"></userAction>
</template>

<script lang="ts" setup name="versionIndex">
import type { VersionResponseType, VersionRequestType } from '@/apis/version';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

import { useTable } from '@packages/utils-common/components/TreeTable';
import userAction from './versionAction.vue';
import { ElMessage, ElLoading } from 'element-plus';

import { searchData } from './versionFromData';

import { createForm, onFieldChange } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

// const loadingInstance = ElLoading.service({ fullscreen: true, text: '正在加载' });

const visible = shallowRef<boolean>(false);
const modalData = shallowRef<VersionResponseType | undefined>(undefined);

const activeTab = shallowRef<string>('app');
const appColumn: ColumnType[] = [
  { label: '版本号', field: 'name', width: '150', fixed: 'left' },
  { label: '下载地址', field: 'sort' },
  { label: '描述', field: 'description' },
  { label: 'VersionCode', field: 'versionCode' },
  { label: '更新时间', field: 'updateTime', width: '200' },
  { label: '更新人', field: 'updateBy' },
  { label: '操作', slot: 'edit', width: '250', fixed: 'right' },
];

const pcColumn = [
  { label: '版本号', field: 'name', width: '150', fixed: 'left' },
  { label: '描述', field: 'description' },
  { label: 'VersionCode', field: 'versionCode' },
  { label: '更新时间', field: 'updateTime', width: '200' },
  { label: '更新人', field: 'updateBy' },
  { label: '操作', slot: 'edit', width: '250', fixed: 'right' },
];

const initRequestData = () => ({ query: 10, currentPage: 1, name: '' });
const requestPage = shallowReactive<VersionRequestType>(initRequestData());

const tableUrl = shallowRef<string>('/system/occupation');

const tableHandle = useTable<VersionRequestType, VersionResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, props: { currentKey: 'pageNo' } },
  autoRequest: true,
  api: '/system/occupation',
});

const { loading, doRequest } = tableHandle;

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  initialValues: requestPage,
});

const del = () => {
  ElMessage.success('删除成功');
};

const changeModal = (data: VersionResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const changeSearch = (data: VersionRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};

const tableChange = (name: string | number) => {
  switch (name) {
    case 'pc':
      tableUrl.value = '/system/role';
      break;
    case 'app':
      tableUrl.value = '/system/occupation';
      break;
  }
  doRequest();
};
const column = computed(() => {
  return activeTab.value == 'pc' ? pcColumn : appColumn;
});
</script>
