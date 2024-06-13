<template>
  <tree-table-card :table="tableHandle" :column="column" title="角色管理">
    <template #tableLeft>
      <el-card shadow="never" style="margin-right: 20px; width: 25%; max-width: 350px">
        <el-row>
          <el-col :span="24">
            <el-input placeholder="搜索角色" :suffix-icon="Search"></el-input>
          </el-col>
        </el-row>

        <el-row align="middle" style="margin: 10px 0">
          <el-button @click.stop="changeModal(undefined)">新增角色</el-button>
          <el-button :icon="RefreshLeft" title="重新加载" @click.stop="changeSearch(initRoleData())"> </el-button>
        </el-row>
        <div v-loading="roleLoading">
          <el-row v-for="(roleVal, roleIndex) in state?.records" :key="`role${roleIndex}`" class="row-item">
            <el-col :span="22" @click.stop="getUser(roleVal)">
              <el-text>
                <el-tag size="small" :type="roleVal.enabled > 0 ? 'success' : 'danger'">
                  <template #default>
                    <el-icon>
                      <user-filled></user-filled>
                    </el-icon>
                    {{ roleVal.enabled > 0 ? '启用' : '禁用' }}
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
                    <el-dropdown-item @click.stop="del(roleVal)">删除</el-dropdown-item>
                    <el-dropdown-item @click.stop="changeAccessModal(roleVal)">权限</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown></el-col
            >
          </el-row>
          <el-row justify="center">
            <el-pagination v-model:current-page="requestPage.pageNo" v-model:page-size="requestPage.pageSize" background layout="prev, pager, next" :total="state?.total"></el-pagination>
          </el-row>
        </div>
      </el-card>
    </template>
  </tree-table-card>
  <!-- modal -->
  <role-action v-model:visible="visible" :data="modalData" @request="changeSearch(initRoleData())"></role-action>
  <access-action v-model:visible="accessVisible" :data="accessData"></access-action>
</template>

<script lang="ts" setup name="roleIndex">
import { getRoleList, delRole } from '@/apis/role';
import { useTable } from '@packages/utils-common/components/TreeTable';
import { useAsync } from '@packages/utils-common/hook';
import roleAction from './roleAction.vue';
import accessAction from './accessAction.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search, UserFilled, RefreshLeft } from '@packages/utils-icon/src/elementPlus';

import type { RoleResponseType, RoleRequestType, UserRequestType } from '@/apis';
import type { ColumnType } from '@packages/utils-common/components/TreeTable';

const visible = shallowRef<boolean>(false);
const accessVisible = shallowRef<boolean>(false);
const modalData = shallowRef<undefined | RoleResponseType>(undefined);
const accessData = shallowRef<undefined | RoleResponseType>(undefined);
const column: ColumnType[] = [
  { label: '姓名', field: 'nickname', width: '150', fixed: 'left' },
  { label: '部门', field: 'dept' },
];

const initUserData = (): UserRequestType => ({ roleId: '', pageNo: 1, pageSize: 10 });
const initRoleData = (): RoleRequestType => ({});
const requestPage = reactive<RoleRequestType>(initRoleData());
const requestUserPage = reactive<UserRequestType>(initUserData());

const tableHandle = useTable<RoleRequestType, RoleResponseType>({
  requestData: requestUserPage,
  pagination: { pageSize: 10, current: 1, props: { currentKey: 'pageNo' } },
  autoRequest: false,
  api: '/system/user',
});

const { loading: roleLoading, execute, state, error } = useAsync<RoleRequestType, any>((requestData) => getRoleList(requestData));

onMounted(async () => {
  await changeSearch(initRoleData());
});

const del = async (data: RoleResponseType) => {
  try {
    await ElMessageBox.confirm(`是否删除 ${data.name} 角色?`, '提示');
    await delRole([data.id as string]);
    changeSearch(initRoleData(), true);
    ElMessage.success('操作成功');
  } catch (e: any) {
    ElMessage.error(e);
    return;
  }
};

const getUser = (data: RoleResponseType) => {
  requestUserPage.roleId = data.id;
  tableHandle.doRequest(requestUserPage);
};

const changeModal = (data: RoleResponseType | undefined) => {
  modalData.value = data;
  visible.value = true;
};

const changeAccessModal = (data: RoleResponseType | undefined) => {
  accessVisible.value = true;
  accessData.value = data;
};

const changeSearch = async (data: RoleRequestType, isReset: boolean = false) => {
  Object.assign(requestPage, data);
  await execute(requestPage);
  if (error.value) {
    ElMessage.error((error.value as Error)?.message || error.value);
  }
};

watch(
  () => requestPage.pageNo,
  () => {
    changeSearch({});
  }
);
</script>

<style lang="scss" scoped>
.row-item {
  line-height: 1.7;
  cursor: pointer;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
}
</style>
