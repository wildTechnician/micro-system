<template>
  <el-dialog v-model="modalState" width="650px" title="编辑权限" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-alert v-show="requestError" :title="(requestError as string)" type="error" :closable="false" />
    <el-scrollbar max-height="50vh">
      <form-provider :form="forms">
        <form-layout layout="vertical" wrapper-align="left" :colon="false">
          <void-field name="grid" :component="[FormGrid, { maxColumns: 2, minColumns: 1 }]">
            <el-tabs v-model="tabActive" :stretch="true">
              <el-tab-pane label="网站PC端" name="pc">
                <field
                  v-for="(item, index) in accessPC"
                  :key="`from${index}` + index"
                  :name="item.name"
                  :title="item.title"
                  :required="item.required"
                  :visible="item.visible || true"
                  :validator="item.validator"
                  :initial-value="item.initialValue || undefined"
                  :decorator="item.decorator"
                  :data-source="item.dataSource"
                  :description="item.description || undefined"
                  :component="item.component"
                />
              </el-tab-pane>
              <el-tab-pane label="移动APP端" name="app">
                <field
                  v-for="(item, index) in accessAPP"
                  :key="`from${index}` + index"
                  :name="item.name"
                  :title="item.title"
                  :required="item.required"
                  :visible="item.visible || true"
                  :validator="item.validator"
                  :initial-value="item.initialValue || undefined"
                  :decorator="item.decorator"
                  :data-source="item.dataSource"
                  :description="item.description || undefined"
                  :component="item.component"
                />
              </el-tab-pane>
            </el-tabs>
          </void-field>
        </form-layout>
      </form-provider>
    </el-scrollbar>

    <template #footer>
      <el-button type="primary" @click.stop="onSubmit()">提交</el-button>
      <el-button @click.stop="coverData(modalData())">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="accessAction">
import type { RoleAccessType, RoleResponseType } from '@/apis/role';
import type { Field as IField } from '@packages/utils-form/core';
import type { MenuResponseType, MenuRequestType } from '@/apis/menu';
import type { DeptRequestType, DeptResponseType } from '@/apis/dept';

import { MenuType } from '@packages/utils-common/enum/menuType';
import { accessPC, accessAPP } from './roleFromData';
import { getMenuList, getDeptList, setRoleAccess } from '@/apis/';
import { useAsync } from '@packages/utils-common/hook';
import { createForm, onFieldChange, onFieldInit, onFieldValueChange } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

type Action = {
  visible: boolean;
  data?: RoleResponseType;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible']);
const modalData = (): RoleAccessType => ({
  appAuth: '',
  dataRange: '1',
  deptIds: [],
  homeMenuId: '',
  menuIds: [],
  roleId: '',
});
const tabActive = shallowRef<'pc' | 'app'>('pc');
const formData = shallowReactive<RoleAccessType>(modalData());
const { state: menuState, execute: menuExecute, error: menuError } = useAsync<MenuRequestType, MenuResponseType>(() => getMenuList({}));
const { state: deptState, execute: deptExecute, error: deptError } = useAsync<DeptRequestType, DeptResponseType>(() => getDeptList({}));
const { execute: setAccessExecute, error: setAccessError } = useAsync<RoleAccessType, Server.responseOK>((value) => setRoleAccess(value));
const requestError = computed(() => setAccessError.value || deptError.value || menuError.value);

// 菜单过滤
const menuFilter = (menuData: MenuResponseType[], keys: string[]) => {
  const loop = (data: MenuResponseType[]) => {
    const curData = data.filter((item) => {
      if (item.children && item.children.length > 0) {
        item.children = loop(item.children);
      }
      if ((item.type !== MenuType.BUTTON && keys.includes(item.id.toString())) || item.children.length > 0) {
        return item;
      }
    });
    return curData;
  };
  return loop(JSON.parse(JSON.stringify(menuData)));
};

const initData = () => {
  // 初始化菜单
  onFieldInit('menuIds', async (field) => {
    (field as IField).setDataSource(menuState.value.records || []);
  });
  //初始化部门
  onFieldInit('deptIds', async (field) => {
    (field as IField).setDataSource(deptState.value);
  });
};

const changeData = async () => {
  // 自定义权限
  onFieldChange('dataRange', (field) => {
    forms.setFieldState('deptIds', (state) => {
      state.display = (field as IField).value == '4' ? 'visible' : 'none';
    });
  });

  // 菜单权限
  onFieldValueChange('menuIds', (field) => {
    forms.setFieldState('homeMenuId', (state) => {
      (state as IField).setDataSource(menuFilter(menuState.value.records || [], field.value));
      (state as IField).setValue('');
    });
  });
};

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  effects: async () => {
    initData();
    changeData();
    await Promise.all([menuExecute()]);
  },
});

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emits('update:visible', visible);
  },
});

const onSubmit = async () => {
  await forms.submit(async (value) => {
    value.roleId = props.data?.id;
    await setAccessExecute({ ...value, menuIds: forms.getFieldState('menuIds').data });
    if (setAccessError.value) {
      return Promise.reject();
    }
    Promise.resolve();
  });
  closeModal();
};

const closeModal = () => {
  modalState.value = false;
  tabActive.value = 'pc';
};

const coverData = (data: Partial<RoleAccessType>, isReset: boolean = false) => {
  Object.assign(formData, data);
  if (isReset) {
    forms.reset();
  }
  forms.setValues(formData);
};
forms.setValuesIn('homeMenuId', '');
</script>
