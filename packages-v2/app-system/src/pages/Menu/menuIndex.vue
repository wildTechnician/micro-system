<template>
  <tree-table-card :table="tableHandle" :column="column" title="菜单管理" row-key="id" @add-handle="changeModal" @update-handle="changeModal">
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
            />
          </void-field>
          <el-button type="primary" :loading="loading" @click.stop="changeSearch(forms.values, false)">提交</el-button>
          <el-button :loading="loading" @click.stop="changeSearch(initRequestData(), true)">重置</el-button>
        </form-layout>
      </form-provider>
    </template>
    <template #type="{ row }">
      <el-tag effect="plain">{{ switchMenu[row.type as MenuType] }}</el-tag>
    </template>
    <template #edit="{ row }">
      <el-button @click.stop="changeModal(row)">编辑</el-button>
      <el-button @click.stop="del(row)">删除</el-button>
    </template>
    <template #target="{ row }">
      {{ row.target ? '当前页面' : '新页面' }}
    </template>
    <template #cache="{ row }">
      {{ row.cache ? '是' : '否' }}
    </template>
    <template #hidden="{ row }"> {{ row.hidden ? '是' : '否' }}</template>
    <template #enabled="{ row }">
      <el-tag :type="row.enabled ? 'success' : 'danger'">{{ row.enabled ? '启用' : '禁用' }}</el-tag>
    </template>
  </tree-table-card>
  <!-- modal -->
  <menuAction v-model:visible="visible" :data="modalData" @request="changeSearch(initRequestData(), true)"></menuAction>
</template>

<script lang="ts" setup name="menuIndex">
import { useTable } from '@packages/utils-common/components/TreeTable';
import menuAction from './menuAction.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { delMenu } from '@/apis/menu';
import { searchData } from './menuFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { switchMenu, MenuType } from '@packages/utils-common/enum';

import type { MenuResponseType, MenuRequestType, MenuOperateType } from '@/apis/menu';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

const visible = shallowRef<boolean>(false);
const modalData = shallowRef<MenuResponseType | undefined>(undefined);
const column: ColumnType[] = [
  { field: 'name', label: '名称', fixed: true, width: 150, align: 'left' },
  { slot: 'type', label: '类型', fixed: true, width: 80 },
  { field: 'icon', label: '图标' },
  { field: 'btnPermission', label: '权限标识' },
  { field: 'component', label: '组件路径' },
  { field: 'routePath', label: '访问地址', width: 250 },
  { slot: 'target', label: '打开方式' },
  { slot: 'cache', label: '缓存页面' },
  { slot: 'hidden', label: '是否隐藏' },
  { slot: 'enabled', label: '状态' },
  { field: 'lastModifiedTime', label: '更新时间', width: 250 },
  { field: 'editorNickName', label: '更新人' },
  { label: '操作', slot: 'edit', fixed: 'right', width: 160 },
];

const initRequestData = (): MenuRequestType => ({ enabled: true, name: '', startTime: '', endTime: '' });
const requestPage = shallowReactive<MenuRequestType>(initRequestData());

const tableHandle = useTable<MenuRequestType, MenuResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, show: false },
  autoRequest: true,
  api: '/admin/menu/list',
});

const { loading, doRequest } = tableHandle;

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  initialValues: requestPage,
});

const del = async (data: MenuOperateType) => {
  try {
    await ElMessageBox.confirm(`是否删除 ${data.name} 菜单?`, '提示');
    await delMenu(data.id as string);
    changeSearch(initRequestData(), true);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const changeModal = (data: MenuResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const changeSearch = (data: MenuRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};
</script>
