<template>
  <tree-table-card :table="tableHandle" :column="column" title="岗位管理" @add-handle="changeModal" @update-handle="changeModal">
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
              :initial-value="item.initialValue"
              :decorator="item.decorator"
              :data-source="item.dataSource"
              :component="item.component"
            />
          </void-field>
          <el-button type="primary" :loading="loading" @click.stop="changeSearch(forms.values, false)">提交</el-button>
          <el-button :loading="loading" @click.stop="changeSearch(initRequestData(), true)">重置</el-button>
        </form-layout>
      </form-provider>
    </template>
    <template #edit="{ row }">
      <el-button @click.stop="changeModal(row)">编辑</el-button>
      <el-button @click.stop="del(row)">删除</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <userAction v-model:visible="visible" :data="modalData" @request="changeSearch(initRequestData(), true)"></userAction>
</template>

<script lang="ts" setup name="occupationIndex">
import { useTable } from '@packages/utils-common/components/TreeTable';
import userAction from './occupationAction.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { searchData } from './occupationFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { delOccupation } from '@/apis';

import type { OccupationResponseType, OccupationRequestType } from '@/apis';
import type { ColumnType } from '@packages/utils-common/components/TreeTable/index';

const visible = shallowRef<boolean>(false);
const modalData = shallowRef<OccupationResponseType | undefined>(undefined);
const column: ColumnType[] = [
  { label: '名称', field: 'name', width: '150', fixed: 'left' },
  { label: '描述', field: 'description' },
  { label: '更新时间', field: 'updateTime', width: '200%' },
  { label: '更新人', field: 'updateBy' },
  { label: '操作', slot: 'edit', width: '250', fixed: 'right' },
];

const initRequestData = (): OccupationRequestType => ({
  enabled: true,
  endTime: '',
  startTime: '',
  name: '',
});
const requestPage = shallowReactive<OccupationRequestType>(initRequestData());

const tableHandle = useTable<OccupationRequestType, OccupationResponseType>({
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

const del = async (data: OccupationResponseType) => {
  try {
    await ElMessageBox.confirm(`是否删除 ${data.name} 岗位?`, '提示');
    await delOccupation([data.id as string]);
    changeSearch(initRequestData(), true);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const changeModal = (data: OccupationResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const changeSearch = (data: OccupationRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};
</script>
