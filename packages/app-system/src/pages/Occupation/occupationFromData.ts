import { FormItem, Input, Select, InputNumber, DatePicker, Title } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { IFieldFactoryProps } from '@packages/utils-form/core';

export const searchData = [{ name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称' }], decorator: [FormItem, { gridSpan: 'span 1' }] }] as IFieldFactoryProps<
  Component,
  Component
>[];

export const fromData = [
  { name: 'title', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'name', title: '名称', component: [Input, { placeholder: '请选择名称' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  {
    name: 'sort',
    title: '排序',
    component: [InputNumber, { placeholder: '请输入排序', min: 0 }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    required: true,
    initialValue: 0,
  },
  { name: 'description', title: '描述', component: [Input.TextArea, { placeholder: '请选择描述' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
] as IFieldFactoryProps<Component, Component>[];
