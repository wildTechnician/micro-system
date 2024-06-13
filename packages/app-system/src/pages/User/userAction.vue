<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑用户' : '新增用户'" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-alert v-show="requestError" :title="(requestError as string)" type="error" :closable="false" />
    <el-scrollbar max-height="50vh">
      <form-provider :form="forms">
        <el-alert v-show="!props.data" :title="`所有新增后的用户默认密码为 admin`" type="warning" show-icon />
        <form-layout layout="vertical" wrapper-align="left" :colon="false">
          <void-field name="grid" :component="[FormGrid, { maxColumns: 2, minColumns: 1 }]">
            <field
              v-for="(item, index) in fromData"
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
        </form-layout>
      </form-provider>
    </el-scrollbar>
    <template #footer>
      <el-button type="primary" @click.stop="onSubmit()">提交</el-button>
      <el-button @click.stop="coverData(data || modalData(), true)">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="userAction">
import { fromData } from './userFromData';
import { createForm, onFieldReact } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { addUser, updateUser, getDeptList, getOccupationList, getRoleList } from '@/apis';
import { useAsync } from '@packages/utils-common/hook';

import type { UserResponseType, UserOperateType, DeptRequestType, OccupationRequestType, RoleRequestType } from '@/apis';
import type { Field as IField } from '@packages/utils-form/core';

type Action = {
  visible: boolean;
  data?: UserResponseType;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): UserOperateType => ({
  username: '',
  deptId: '',
  email: '',
  enabled: 1,
  nickname: '',
  phone: '',
  roleId: '',
  sex: 'G',
  postIds: [],
  posts: [],
});
const formData = shallowReactive<UserOperateType>(modalData());
const { execute: addUserExecute, error: addUserError } = useAsync((value) => addUser(value));
const { execute: updateUserExecute, error: updateUserError } = useAsync((value) => updateUser(value));
const { execute: getRoleListExecute, error: getRoleListError, state: getRoleListState } = useAsync((value: RoleRequestType) => getRoleList(value));
const { execute: getOccupationListExecute, error: getOccupationListError, state: getOccupationState } = useAsync((value: OccupationRequestType) => getOccupationList(value));
const { execute: getDeptListExecute, error: getDeptListError, state: getDeptListState } = useAsync((value: DeptRequestType) => getDeptList(value));
const requestError = computed(() => {
  return addUserError.value || updateUserError.value;
});

const initData = () => {
  //初始化部门
  onFieldReact('deptId', async (field) => {
    (field as IField).setDataSource(getDeptListState.value);
  });
  //初始化角色
  onFieldReact('roleId', async (field) => {
    (field as IField).setDataSource(formatterDataSource(getRoleListState.value?.records || [], { label: 'name', value: 'id' }));
  });
  //初始化岗位
  onFieldReact('postIds', async (field) => {
    (field as IField).setDataSource(formatterDataSource(getOccupationState.value?.records || [], { label: 'name', value: 'id' }));
  });
};

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  effects: () => {
    initData();
  },
});

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    addUserError.value = updateUserError.value = undefined;
    emits('update:visible', visible);
  },
});

const onSubmit = async () => {
  const { values } = forms;
  await forms.submit();
  props.data && (values.userId = props.data.id);
  values.enabled = 1;
  props.data ? await updateUserExecute(values) : await addUserExecute(values);
  if (updateUserError.value || addUserError.value) {
    return;
  }
  closeModal();
};
const closeModal = () => {
  emits('request', '');
  coverData(modalData(), true);
  modalState.value = false;
};
const coverData = (data: UserOperateType, isReset: boolean = false) => {
  Object.assign(formData, data);
  if (isReset) {
    forms.reset();
  }
  forms.setValues(formData);
};

const formatterDataSource = (data: any[], props: { label: string; value: string } = { label: 'label', value: 'value' }) => {
  const newData: any[] = [];
  for (let item of data) {
    newData.push({
      label: item[props.label],
      value: item[props.value],
    });
  }
  return newData;
};

const formatterOccupation = (data: UserOperateType | undefined) => {
  if (!data) return data;
  data.postIds = data.posts.map((item) => item.id);
  return data;
};

watch(
  () => props.data,
  () => {
    formatterOccupation(props.data);
    coverData(formatterOccupation(props.data) || modalData());
  }
);

await Promise.allSettled([getRoleListExecute({ pageNo: 1, pageSize: 100 }), getOccupationListExecute({ pageNo: 1, pageSize: 100 }), getDeptListExecute({ enabled: true })]);
</script>
