<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑岗位' : '新增岗位'" :close-on-press-escape="false" :close-on-click-modal="false">
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
      <el-button @click.stop="coverData(data || modalData(), true)">重置</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="occupationAction">
import { fromData } from './occupationFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { addOccupation, updateOccupation } from '@/apis';

import type { OccupationOperateType, OccupationResponseType } from '@/apis';
import { useAsync } from '@packages/utils-common/hook';

type Action = {
  visible: boolean;
  data?: OccupationResponseType;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): OccupationOperateType => ({
  name: '',
  enabled: 1,
  description: '',
  sort: 0,
});
const formData = shallowReactive<OccupationOperateType>(modalData());
const { execute: addOccupationExecute, error: addOccupationError } = useAsync((value: OccupationOperateType) => addOccupation(value));
const { execute: updateOccupationExecute, error: updateOccupationError } = useAsync((value: OccupationOperateType) => updateOccupation(value));
const requestError = computed(() => updateOccupationError.value || addOccupationError.value);

const forms = createForm({
  validateFirst: true,
  readPretty: false,
});

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    addOccupationError.value = updateOccupationError.value = undefined;
    emits('update:visible', visible);
  },
});

const onSubmit = async () => {
  await forms.submit(async (value: OccupationOperateType) => {
    props.data && (value.postId = props.data.id);
    value.enabled = 1;
    props.data ? await updateOccupationExecute(value) : await addOccupationExecute(value);
    if (requestError.value) {
      return Promise.reject(requestError.value);
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
const coverData = (data: Partial<OccupationResponseType>, isReset: boolean = false) => {
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
