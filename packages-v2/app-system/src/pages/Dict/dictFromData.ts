import { FormItem, Input, Select, InputNumber, Radio } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { FieldValidator } from '@packages/utils-form/core';

import { h } from 'vue';

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
  description?: string;
};

const extra = h('div', { style: { fontSize: '12px' } }, [h('p', '1. 未选中时，则会进入默认首页。默认首页请联系管理员'), h('p', '2. 设置首页列表将根据菜单权限配置中选中的值生成')]);

export const dictItem = [
  { value: 'name', label: '所属类型', component: Input, decorator: FormItem, required: true, decoratorProps: { gridSpan: 'span 2' }, componentProps: { placeholder: '请输入名称', disabled: true } },
  { value: 'namess', label: '字典值', component: Input, decorator: FormItem, required: true, decoratorProps: { gridSpan: 'span 1' }, componentProps: { placeholder: '请输入名称' } },
  {
    value: 'enabled',
    label: '默认选中',
    component: Radio.Group,
    decorator: FormItem,
    decoratorProps: { gridSpan: 'span 1' },
    enum: [
      { label: '是', value: 1 },
      { label: '否', value: 2 },
    ],
    componentProps: { placeholder: '请输入名称' },
  },
  {
    value: 'enabledss',
    label: '启用禁用',
    component: Radio.Group,
    decorator: FormItem,
    decoratorProps: { gridSpan: 'span 1' },
    enum: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 },
    ],
    componentProps: { placeholder: '请输入名称' },
  },
] as FormListType[];

export const fromData = [
  { value: 'label', label: '名称', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 2' }, required: true, componentProps: { placeholder: '请选择名称' } },
  { value: 'labelsss', label: '编码', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 2' }, required: true, componentProps: { placeholder: '请选择名称' } },
  {
    value: 'enabled',
    label: '状态',
    component: Radio.Group,
    decorator: FormItem,
    decoratorProps: { gridSpan: 'span 2' },
    enum: [
      { label: '启用', value: true },
      { label: '禁用', value: false },
    ],
    componentProps: { placeholder: '请输入名称' },
  },
] as FormListType[];
