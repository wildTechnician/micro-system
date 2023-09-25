import { ElUpload, ElButton } from 'element-plus';
import { Plus, Upload as UploadIcon } from '@packages/utils-icon/src/elementPlus';
import { defineComponent, h } from 'vue';
import { mapProps, connect, useField } from '@formily/vue';

import type { Field } from '@formily/core';
import type { UploadRawFile, UploadFile } from 'element-plus';

type Fn = (...args: any[]) => any;

const useUpload = defineComponent({
  name: 'UseUpload',
  props: {
    checkHook: {
      type: Function,
      default: () => true,
    },
    fileList: {
      type: Array,
    },
    text: {
      type: String,
      default: '上传',
    },
    errorAdaptor: {
      type: Function,
      default(error?: ErrorEvent) {
        return error?.message || undefined;
      },
    },
  },
  emits: ['change'],
  setup(curProps, { attrs, emit, slots }) {
    const uploadFileHandle: any = { ...slots };
    const field = useField<Field>();
    const instance = getCurrentInstance();

    const setFeedBack = (error?: ErrorEvent) => {
      const message = curProps.errorAdaptor(error);

      field.value.setFeedback({
        type: 'error',
        triggerType: 'onBlur',
        code: 'ValidateError',
        messages: message ? [message] : [],
      });
    };

    const uploadUploadFunctionToData = () => {
      field.value.setData(instance!.refs.uploadHandle);
    };

    onMounted(() => {
      uploadUploadFunctionToData();
    });

    const props = {
      ...curProps,
      ref: 'uploadHandle',
      onChange(file: UploadFile, fileList: UploadFile[]) {
        !(attrs.onChange as Fn)?.(file, fileList);
        setFeedBack();
        emit('change', fileList);
      },
      onRemove(file: UploadFile, fileList: UploadFile[]) {
        !(attrs.onRemove as Fn)?.(file, fileList);
        setFeedBack();
        emit('change', fileList);
      },
      onExceed() {
        setTimeout(() => {
          setFeedBack(new Error('文件超出允许上传文件的最大数量') as any);
        }, 0);
      },
      onError(error: ErrorEvent, file: UploadRawFile, fileList: UploadRawFile[]) {
        !(attrs.onError as Function)?.(error, file, fileList);
        setTimeout(() => {
          setFeedBack(error);
        }, 0);
      },
    } as any;

    if (!slots.default) {
      uploadFileHandle.default = () => {
        const listType = attrs.listType;
        if (listType === 'picture-card') {
          return h(
            Plus,
            {
              style: {
                width: '28px',
                height: '28px',
                color: 'gray',
              },
            },
            {}
          );
        }

        return h(
          ElButton,
          {
            icon: UploadIcon,
          },
          {
            default: () => props.text,
          }
        );
      };
    }

    return () =>
      h(
        ElUpload as any,
        {
          ...props,
          ...attrs,
          fileList: curProps.fileList,
        },
        uploadFileHandle
      );
  },
});

export const ImproveUpload = connect(useUpload, mapProps({ readOnly: 'readonly', value: 'fileList' }));
