import { FormItem, Input, Select, InputNumber, Radio, Title } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { FieldValidator, IFieldFactoryProps } from '@packages/utils-form/core';

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
  { value: 'title', label: '名称', component: Input, decorator: FormItem, decoratorProps: { gridSpan: 'span 1' }, componentProps: { placeholder: '请输入名称' } },
] as FormListType[];

export const fromData = [
  { name: 'base', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'title', title: '标题', component: [Input, { placeholder: '请选择标题,不超过50个字符' }], decorator: [FormItem, { gridSpan: 'span 2' }], required: true },
  {
    name: 'rangeType',
    title: '发布范围',
    component: [
      Select,
      {
        placeholder: '点击选择人员',
        readonly: true,
      },
    ],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '全员', value: 0 },
      { label: '指定人员', value: 1 },
    ],
    required: true,
  },
  {
    name: 'scope',
    title: '通知人员',
    component: [
      Input,
      {
        placeholder: '点击选择人员',
        type: 'hidden',
      },
    ],
  },
  {
    name: 'releaseType',
    title: '发布日期',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    initialValue: 'now',
    required: true,
    dataSource: [
      { label: '立即', value: 'now' },
      { label: '指定', value: 'designate' },
    ],
  },
  {
    name: 'content',
    title: '公告内容',
    component: [Input.TextArea, { placeholder: '请输入版本公告内容,不超过100个字符', teleported: false }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    required: true,
  },
] as IFieldFactoryProps<Component, Component>[];
