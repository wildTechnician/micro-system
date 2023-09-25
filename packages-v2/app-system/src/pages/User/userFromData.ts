import { FormItem, Input, Select, Radio, TreeSelect, Title } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { FieldValidator, IFieldProps } from '@packages/utils-form/core';

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
  { name: 'name', title: '姓名', component: [Input, { placeholder: '请输入姓名' }], decorator: [FormItem, { gridSpan: 'span 1' }] },
  { name: 'username', title: '登录账号', component: [Input, { placeholder: '请输入登录账号' }], decorator: [FormItem, { gridSpan: 'span 1' }] },
  {
    name: 'enabled',
    title: '状态',
    dataSource: [
      { label: '启用', value: true },
      { label: '禁用', value: false },
    ],
    component: [Select, { placeholder: '请选择状态' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    initialValue: true,
  },
] as IFieldProps<Component, Component>[];

export const fromData = [
  { name: 'title', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'nickname', title: '姓名', component: [Input, { placeholder: '请输入真实姓名' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  {
    name: 'username',
    title: '登陆账号',
    validator: { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '仅支持4-16位数字、字母、下划线' },
    component: [Input, { placeholder: '请输入登陆账号' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    required: true,
  },
  { name: 'phone', title: '手机号', validator: 'phone', component: [Input, { placeholder: '请输入手机号' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  { name: 'email', title: '邮箱', validator: 'email', component: [Input, { placeholder: '请输入邮箱' }], decorator: [FormItem, { gridSpan: 'span 1' }] },

  {
    name: 'sex',
    title: '性别',
    component: [Radio.Group, { placeholder: '请输入性别' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '男', value: 'M' },
      { label: '女', value: 'G' },
    ],
    initialValue: 'M',
  },
  {
    name: 'enabled',
    title: '状态',
    component: [Radio.Group],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    initialValue: 1,
  },
  {
    name: 'postIds',
    title: '岗位',
    component: [Select, { placeholder: '请选择岗位', teleported: false, multiple: true }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    required: true,
    initialValue: [],
  },
  {
    name: 'roleId',
    title: '角色',
    component: [Select, { placeholder: '请选择角色', teleported: false, valueKey: 'id' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    required: true,
  },
  {
    name: 'deptId',
    title: '部门',
    component: [TreeSelect, { placeholder: '请选择部门', teleported: false, nodeKey: 'id', props: { label: 'name' } }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    required: true,
  },
] as IFieldProps<Component, Component>[];
