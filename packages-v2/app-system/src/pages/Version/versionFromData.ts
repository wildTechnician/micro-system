import { FormItem, Input, Select, InputNumber, Radio } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { FieldValidator } from '@packages/utils-form/core';

export type FormListType = {
  component: Component;
  value: string;
  label: string;
  decorator?: Component;
  enum?: any[];
  required?: boolean;
  visible?: boolean;
  validator?: FieldValidator;
  componentProps?: any;
  decoratorProps?: any;
  initialValue?: any;
};

export const searchData = [
  { value: 'name', label: '名称', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 1' }, componentProps: { placeholder: '请输入名称' } },
] as FormListType[];

export const fromData = [
  { value: 'version', label: '版本号', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 1' }, required: true, componentProps: { placeholder: '请选择版本号' } },
  { value: 'downLoadUrl', label: '下载地址', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 1' }, required: true, componentProps: { placeholder: '请选择下载地址' } },
  { value: 'versionCode', label: 'versionCode', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 1' }, required: true, componentProps: { placeholder: '请选择versionCode' } },
  {
    value: 'deptIds',
    label: '版本描述',
    component: Input.TextArea,
    decorator: FormItem,
    required: true,
    decoratorProps: { gridSpan: 'span 2' },
    componentProps: { placeholder: '请输入版本描述', teleported: false },
  },
  {
    value: 'deptIdfffs',
    label: '更新日志',
    component: Input.TextArea,
    decorator: FormItem,
    required: true,
    decoratorProps: { gridSpan: 'span 2' },
    componentProps: { placeholder: '请输入更新日志', teleported: false },
  },
] as FormListType[];
