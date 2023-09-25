<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑部门' : '新增部门'" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-alert v-show="requestError" :title="(requestError as string)" type="error" :closable="false" />
    <el-scrollbar max-height="50vh">
      <form-provider :form="forms">
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
      <el-button @click.stop="coverData(props.addChild ? { ...modalData(), parentId: props.data?.id } : props.data || modalData(), true)">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="deptAction">
import { ElButton } from 'element-plus';
import { fromData } from './deptFromData';
import { addDept, updateDept } from '@/apis';
import { useAsync } from '@packages/utils-common/hook';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

import type { DeptResponseType, DeptOperateType } from '@/apis';

type Action = {
  visible: boolean;
  data?: DeptResponseType;
  addChild: boolean;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): DeptOperateType => ({
  name: '',
  leader: '',
  leaderPhone: '',
  enabled: 1,
  parentId: '0',
  sort: 0,
});

const formData = shallowReactive<DeptOperateType>(modalData());
const { execute: addDeptExecute, error: addDeptError } = useAsync<DeptOperateType>((value) => addDept(value));
const { execute: updateDeptExecute, error: updateDeptError } = useAsync<DeptOperateType>((value) => updateDept(value));
const requestError = computed(() => updateDeptError.value || addDeptError.value);

const forms = createForm({
  validateFirst: true,
  readPretty: false,
});

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    updateDeptError.value = addDeptError.value = undefined;
    emits('update:visible', visible);
  },
});

const onSubmit = async () => {
  await forms.submit(async (value: DeptOperateType) => {
    props.data && (value.deptId = props.data?.id);
    value.leaderPhone = '15877381909';
    props.data && !props.addChild ? await updateDeptExecute(value) : await addDeptExecute(value);
    if (addDeptError.value || updateDeptError.value) {
      return Promise.reject();
    }
    return Promise.resolve();
  });
  closeModal();
};
const closeModal = () => {
  emits('request', '');
  coverData(modalData(), true);

  modalState.value = false;
};
const coverData = (data: Partial<DeptResponseType>, isReset: boolean = false) => {
  Object.assign(formData, data);
  if (isReset) {
    forms.reset();
  }
  forms.setValues(formData);
};

watch(
  () => [props.data, props.addChild],
  () => {
    coverData(props.addChild ? { ...modalData(), parentId: props.data?.id } : props.data || modalData(), true);
  }
);
</script>
