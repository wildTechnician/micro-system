<template>
  <tree-table-card :table="tableHandle" :column="column" title="用户管理" @add-handle="changeModal" @update-handle="changeModal">
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
    <template #sex="{ row }">
      {{ row.sex == 'G' ? '男' : '女' }}
    </template>
    <template #enabled="{ row }">
      <el-tag :type="row.enabled ? 'success' : 'danger'">{{ row.enabled ? '启用' : '禁用' }}</el-tag>
    </template>
    <template #nickname="{ row }">
      <el-avatar shape="square" size="small"> {{ row.nickname && row.nickname.charAt(row.nickname.length - 1) }} </el-avatar>
      <el-text>{{ row.nickname }}</el-text>
    </template>
    <template #edit="{ row }">
      <el-button @click.stop="changeModal(row)">编辑</el-button>
      <el-button @click.stop="del(row)">删除</el-button>
      <el-button @click.stop="reset(row)">重置密码</el-button>
    </template>
  </tree-table-card>
  <!-- modal -->
  <userAction v-model:visible="visible" :data="modalData" @request="changeSearch(initRequestData(), true)"></userAction>
</template>

<script lang="ts" setup name="userIndex">
import { useTable } from '@packages/utils-common/components/TreeTable';
import userAction from './userAction.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { searchData } from './userFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { delUser, resetPass } from '@/apis';

import type { UserResponseType, UserRequestType } from '@/apis';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

const visible = shallowRef<boolean>(false);
const modalData = shallowRef<UserResponseType | undefined>(undefined);
const column: ColumnType[] = [
  { label: '姓名', slot: 'nickname', fixed: 'left', align: 'left' },
  { label: '登陆账号', field: 'username' },
  { label: '性别', slot: 'sex' },
  { label: '部门', field: 'dept' },
  { label: '角色', field: 'roleName' },
  { label: '邮箱', field: 'email' },
  { label: '手机号', field: 'phone' },
  { label: '更新时间', field: 'updateTime', width: '200%' },
  { label: '更新人', field: 'updateBy' },
  { label: '状态', slot: 'enabled', width: '80' },
  { label: '操作', slot: 'edit', width: '280', fixed: 'right' },
];

const initRequestData = (): UserRequestType => ({ pageNo: 1, pageSize: 10, username: '', deptId: '', roleId: '', enabled: true, startTime: '', endTime: '' });
const requestPage = shallowReactive<UserRequestType>(initRequestData());

const tableHandle = useTable<UserRequestType, UserResponseType>({
  requestData: requestPage,
  pagination: { pageSize: 10, current: 1, props: { currentKey: 'pageNo' } },
  autoRequest: true,
  api: '/system/user',
});

const { loading, doRequest } = tableHandle;

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  initialValues: requestPage,
});

const del = async (data: UserResponseType) => {
  await ElMessageBox.confirm(`是否删除 ${data.nickname} 用户?`, '提示');
  try {
    await delUser([data.id as string]);
    changeSearch(initRequestData(), true);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const reset = async (data: UserResponseType) => {
  await ElMessageBox.confirm(`是否重置 ${data.nickname} 用户密码?`, '提示');
  try {
    await resetPass(data.username as string);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const changeModal = (data: UserResponseType | undefined) => {
  visible.value = true;
  modalData.value = data;
};

const changeSearch = (data: UserRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  isReset && forms.setValues(requestPage);
  doRequest();
};
</script>
