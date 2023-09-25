<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑角色' : '新增角色'" :close-on-press-escape="false" :close-on-click-modal="false">
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
      <el-button @click.stop="coverData(data || modalData(), true)">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="roleAction">
import type { RoleOperateType, RoleResponseType } from '@/apis';

import { ElMessage } from 'element-plus';
import { fromData } from './roleFromData';
import { addRole, updateRole } from '@/apis';
import { createForm, onFieldChange } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { useAsync } from '@packages/utils-common/hook';

type Action = {
  visible: boolean;
  data?: RoleResponseType;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): RoleOperateType => ({
  name: '',
  enabled: 1,
  description: '',
});
const formData = shallowReactive<RoleOperateType>(modalData());
const forms = createForm({
  validateFirst: true,
  readPretty: false,
});

const { execute: addRoleExecute, error: addRoleError } = useAsync((value) => addRole(value));
const { execute: updateRoleExecute, error: updateRoleError } = useAsync((value) => updateRole(value));
const requestError = computed(() => addRoleError.value || updateRoleError.value);

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
    props.data && (value.roleId = props.data.id);
    props.data ? await updateRoleExecute(value) : await addRoleExecute(value);
    if (addRoleError.value || updateRoleError.value) {
      return Promise.reject(addRoleError.value);
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
const coverData = (data: Partial<RoleResponseType>, isReset: boolean = false) => {
  Object.assign(formData, data);
  if (isReset) {
    forms.reset();
  }
  forms.setValues(formData);
};

watch(
  () => props.data,
  () => {
    coverData(props.data || modalData(), true);
  }
);
</script>
