<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑菜单' : '新增菜单'" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-scrollbar max-height="50vh">
      <form-provider :form="forms">
        <form-layout layout="vertical" wrapper-align="left" :colon="false">
          <void-field name="grid" :component="[FormGrid, { maxColumns: 2, minColumns: 1 }]">
            <field
              v-for="(item, index) in fromData"
              :key="`menuFrom${index}` + index"
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
        </form-layout>
      </form-provider>
    </el-scrollbar>
    <template #footer>
      <el-button type="primary" @click.stop="onSubmit()">提交</el-button>
      <el-button @click.stop="coverData(data || modalData())">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="menuAction">
import { ElMessage } from 'element-plus';
import { fromData } from './menuFromData';
import { createForm, onFieldChange, onFieldInit } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { getMenuList, addMenu, updateMenu } from '@/apis';

import type { MenuResponseType, MenuOperateType } from '@/apis/menu';
import type { Field as IField } from '@packages/utils-form/core';
import { MenuType } from '@packages/utils-common/enum';

type Action = {
  visible: boolean;
  data?: MenuResponseType;
};

type FromType = Pick<MenuResponseType, 'name'>;

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): MenuOperateType => ({
  type: MenuType.SYSTEM,
  parentId: '',
  icon: '',
  name: '',
  routePath: '',
  component: '',
  sort: 0,
  btnPermission: '',
  enabled: 1,
  target: true,
  cache: false,
  hidden: false,
  urlPermission: 0,
});
const formData = shallowReactive<FromType>(modalData());

const changeType = () => {
  const equal = (name: string, target: string) => name == target;
  onFieldChange('type', (field) => {
    const { value } = field as IField;

    forms.setFieldState('routePath', (state) => {
      state.display = equal(value, MenuType.FOLDER) || equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
    forms.setFieldState('component', (state) => {
      state.display = equal(value, MenuType.FOLDER) || equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
    forms.setFieldState('btnPermission', (state) => {
      state.display = equal(value, MenuType.FOLDER) || equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
    forms.setFieldState('hidden', (state) => {
      state.display = equal(value, MenuType.FOLDER) || equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
    forms.setFieldState('cache', (state) => {
      state.display = equal(value, MenuType.FOLDER) || equal(value, MenuType.BUTTON) || equal(value, MenuType.SYSTEM) ? 'none' : 'visible';
    });
    forms.setFieldState('btnPermission', (state) => {
      state.display = equal(value, MenuType.BUTTON) ? 'visible' : 'none';
    });
    forms.setFieldState('icon', (state) => {
      state.display = equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
    forms.setFieldState('target', (state) => {
      state.display = equal(value, MenuType.BUTTON) ? 'none' : 'visible';
    });
  });
};
const initData = () => {
  onFieldInit('parentId', async (field) => {
    const res = await getMenuList({});
    const source: any = [{ title: '顶级目录', id: '0', children: res.records || [] }];
    (field as IField).setDataSource(source);
  });
};

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  effects: () => {
    changeType();
    initData();
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
  try {
    await forms.validate();
    const res: MenuOperateType = await forms.submit();
    props.data && (res.id = props.data.id);
    props.data ? await updateMenu(res) : await addMenu(res);
    ElMessage.success('提交成功');
    closeModal();
  } catch (e: any) {
    ElMessage.error(e);
  }
};
const closeModal = () => {
  coverData(modalData());
  modalState.value = false;
  emits('request', '');
};
const coverData = (data: Partial<MenuResponseType>) => {
  Object.assign(formData, data);
  forms.setValues(formData);
};

watch(
  () => props.data,
  () => {
    coverData(props.data || modalData());
  }
);
</script>
