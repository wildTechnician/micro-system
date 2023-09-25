<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑字典' : '新增字典'" :close-on-press-escape="false" :close-on-click-modal="false">
    <form-provider :form="forms">
      <form-layout layout="vertical" wrapper-align="left" :colon="false">
        <void-field name="grid" :component="[FormGrid, { maxColumns: 2, minColumns: 1 }]">
          <field
            v-for="(item, index) in dictItem"
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
      </form-layout>
    </form-provider>
    <template #footer>
      <el-button type="primary" @click.stop="onSubmit()">提交</el-button>
      <el-button @click.stop="coverData(data || modalData())">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="dictItem">
import type { DictResponseType } from '@/apis/dict';

import { ElButton, ElMessage } from 'element-plus';

import { dictItem } from './dictFromData';

import { createForm, onFieldChange } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

type Action = {
  visible: boolean;
  data?: DictResponseType;
};

type FromType = Pick<DictResponseType, 'label' | 'enabled'>;

const props = defineProps<Action>();
const emits = defineEmits(['update:visible']);
const modalData = (): FromType => ({
  label: '',
  enabled: true,
});
const formData = shallowReactive<FromType>(modalData());

const changeType = () => {
  onFieldChange('type', (field) => {});
};

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  effects: (from) => {
    return changeType();
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
  await forms.validate();
  try {
    ElMessage.success('提交成功');
    coverData(modalData());
    closeModal();
  } catch (e: any) {
    ElMessage.error(e);
  }
};
const closeModal = () => {
  modalState.value = false;
};
const coverData = (data: Partial<DictResponseType>) => {
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
