<template>
  <el-dialog v-model="modalState" width="650px" :title="data ? '编辑公告' : '新增公告'" :close-on-press-escape="false" :close-on-click-modal="false">
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
    <template #footer>
      <el-button type="primary" @click.stop="onSubmit()">提交</el-button>
      <el-button @click.stop="coverData(data || modalData())">重置</el-button>
    </template>

    <!-- innerDialog -->
    <el-dialog v-model="innerVisible" :modal="false" width="900px" title="选择人员" append-to-body :close-on-click-modal="false">
      <div style="height: 400px">
        <select-organize-index ref="organization" method="get"></select-organize-index>
      </div>
      <template #footer>
        <el-button type="primary" @click.stop="getOrganizeData">确定</el-button>
      </template>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup name="noticeAction">
import type { NoticeOperateType, NoticeResponseType } from '@/apis';
import type { Field as IField } from '@packages/utils-form/core';

import { ElButton, ElMessage } from 'element-plus';
import { fromData } from './noticeFromData';
import { createForm, onFieldValueChange } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';

type Action = {
  visible: boolean;
  data?: NoticeResponseType | undefined;
};

const props = defineProps<Action>();
const emits = defineEmits(['update:visible']);
const innerVisible = shallowRef<boolean>(false);
const organization = ref();

const modalData = (): NoticeOperateType => ({
  title: '',
  content: '',
  releaseTime: '',
  releaseType: 'now',
  status: '1',
  typeId: -1,
  scope: [],
});
const formData = shallowReactive<NoticeOperateType>(modalData());

const changeData = () => {
  onFieldValueChange('rangeType', (state) => {
    if (state.value > 0) {
      innerVisible.value = true;
    }
  });
};

const forms = createForm({
  validateFirst: true,
  readPretty: false,
  effects(form) {
    changeData();
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

const getOrganizeData = () => {
  const allSelectData = organization.value.getSelectData();
  let allName: string = '';
  for (let i in allSelectData) {
    allName += ' ' + allSelectData[i].name;
  }
  forms.setFieldState('distance', (state) => {
    (state as IField).setValue(allName);
  });
  innerVisible.value = false;
};

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
const coverData = (data: Partial<NoticeOperateType>) => {
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
