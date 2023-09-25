<template>
  <tree-table-card :table="tableHandle" :column="column" title="公告管理" @add-handle="changeModal" @update-handle="changeModal">
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
      <el-button @click.stop="changeModal(row)">删除</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <userAction v-model:visible="visible" :data="modalData"></userAction>
</template>

<script lang="ts" setup name="noticeIndex">
import type { NoticeResponseType, NoticeRequestType } from '@/apis';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

import { useTable } from '@packages/utils-common/components/TreeTable';
import userAction from './noticeAction.vue';
import { ElMessage } from 'element-plus';
import { searchData } from './noticeFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

const visible = shallowRef<boolean>(false);
const modalData = shallowRef<NoticeResponseType | undefined>(undefined);

const column: ColumnType[] = [
  { label: '标题', field: 'title', width: '150', fixed: 'left' },
  { label: '发布日期', field: 'releaseTime' },
  { label: '发布内容', field: 'content' },
  { label: '发布范围', field: 'scope' },
  { label: '更新时间', field: 'lastModifiedTime', width: '200%' },
  { label: '更新人', field: 'editorNickName' },
  { label: '操作', slot: 'edit', width: '300', fixed: 'right' },
];

const initRequestData = (): NoticeRequestType => ({ title: '' });
const requestPage = shallowReactive<NoticeRequestType>(initRequestData());

const tableHandle = useTable<NoticeRequestType, NoticeResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, props: { currentKey: 'pageNo' } },
  autoRequest: true,
  api: '/admin/notice/page',
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

const changeModal = (data: NoticeResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const changeSearch = (data: NoticeRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};
</script>
