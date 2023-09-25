<template>
  <ElDialog v-model="modalState" width="650px" title="边界" :close-on-press-escape="false" :close-on-click-modal="false">
    <el-alert :title="requestError ? requestError as string : '如点击“上传”或“下载”文件无响应，则尝试重新启动浏览器'" :type="requestError ? 'error' : 'warning'" show-icon />
    <el-scrollbar max-height="50vh">
      <FormProvider :form="forms">
        <FormLayout layout="vertical" wrapper-align="left" :colon="false">
          <VoidField name="grid" :component="[FormGrid, { maxColumns: 2, minColumns: 1 }]">
            <Field
              v-for="(item, index) in deptBoundary"
              :key="`from${index}` + index"
              :name="item.name"
              :title="item.title"
              :required="item.required"
              :visible="item.visible || true"
              :validator="item.validator"
              :initial-value="item.initialValue || undefined"
              :decorator="item.decorator"
              :data-source="item.dataSource || []"
              :component="item.component"
              :content="item.content || undefined"
              :description="item.description || undefined"
            >
            </Field>
          </VoidField>
        </FormLayout>
      </FormProvider>
    </el-scrollbar>
    <template #footer>
      <ElButton type="primary" @click.stop="onSubmit()">提交</ElButton>
      <ElButton @click.stop="coverData(data || modalData(), true)">重置</ElButton>
    </template>
  </ElDialog>
</template>

<script lang="ts" setup name="deptBoundary">
import { deptBoundary } from './deptFromData';
import { createForm } from '@packages/utils-form/core';
import { FormProvider, Field, VoidField } from '@packages/utils-form/vue';
import { FormLayout, FormGrid } from '@packages/utils-form/elementPlus';
import { deptRange } from '@/apis';
import { useAsync } from '@packages/utils-common/hook';
import { searchFile } from '@packages/utils-common/apis';

import type { DeptResponseType, DeptRangeType } from '@/apis';
import type { UploadFile } from 'element-plus';
import type { SearchFileRequestType } from '@packages/utils-common/apis';

type Action = {
  visible: boolean;
  data?: DeptResponseType;
};

type FormType = DeptRangeType & Partial<DeptResponseType & { file: UploadFile[] }>;

const props = defineProps<Action>();
const emits = defineEmits(['update:visible', 'request']);
const modalData = (): FormType => ({
  boundaryFileId: '',
  deptId: '',
  latitude: -1,
  longitude: -1,
});
const formData = shallowReactive<FormType>(modalData());
const { execute: deptRangeExecute, error: deptRangeError } = useAsync<DeptRangeType, Server.responseOK>((value: DeptRangeType) => deptRange(value));
const { execute: searchFileExecute, error: searchFileError, state: searchFileState } = useAsync<string, SearchFileRequestType[]>((value: string) => searchFile(value));
const requestError = computed(() => deptRangeError.value || searchFileError.value);

const forms = createForm({
  validateFirst: true,
  readPretty: false,
});

const modalState = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    deptRangeError.value = undefined;
    emits('update:visible', visible);
  },
});

const onSubmit = async () => {
  await forms.submit(async (value: FormType) => {
    const { file, latitude, longitude, id } = value;
    const fileId = (file![0].response as any).id;
    await deptRangeExecute({ deptId: id!, latitude, longitude, boundaryFileId: fileId });
    if (deptRangeError.value) {
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

const coverData = (data: Partial<FormType>, isReset: boolean = false) => {
  const file: UploadFile[] = [];
  // 清除文件
  forms.getFieldState('file').data.clearFiles();
  // 填充文件
  if (props.data && searchFileState.value) {
    searchFileState.value.map((item: SearchFileRequestType) => {
      file.push({
        name: item.name,
        uid: parseInt(item.id),
        url: item.fileUrl,
        status: 'success',
        response: item,
        size: parseInt(item.size),
      });
    });
    data.file = file;
  }

  // 重置表单
  Object.assign(formData, data);
  if (isReset) {
    forms.reset();
  }
  forms.setValues(formData);
};

watch(
  () => props.data,
  async (val) => {
    props.data && (await searchFileExecute(props.data?.id as string));
    coverData({ ...val }, true);
  }
);
</script>
