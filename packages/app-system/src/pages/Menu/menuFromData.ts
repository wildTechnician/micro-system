import { FormItem, Input, Select, TreeSelect, InputNumber, Radio, Title } from '@packages/utils-form/elementPlus';

import { MenuType } from '@packages/utils-common/enum';
import type { Component } from 'vue';
import type { IFieldFactoryProps } from '@packages/utils-form/core';

export const searchData = [
  {
    name: 'enabled',
    title: '状态',
    component: [Select, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '启用', value: true },
      { label: '停用', value: false },
    ],
  },
  {
    name: 'name',
    title: '名称',
    component: [Input, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
  },
] as IFieldFactoryProps<Component, Component>[];

export const fromData = [
  { name: 'title', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  {
    name: 'type',
    title: '类型',
    component: [Select, { placeholder: '请选择类型', teleported: false }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    initialValue: MenuType.SYSTEM,
    dataSource: [
      { label: '系统', value: MenuType.SYSTEM },
      { label: '目录', value: MenuType.FOLDER },
      { label: '菜单', value: MenuType.MENU },
      { label: '按钮', value: MenuType.BUTTON },
    ],
  },
  {
    name: 'parentId',
    title: '父级',
    component: [TreeSelect, { placeholder: '请选择父级', nodeKey: 'id', teleported: false, checkStrictly: true, props: { label: 'name' } }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    initialValue: '0',
  },
  { name: 'icon', title: '图标', component: [Input, { placeholder: '请选择图标' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  { name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  {
    name: 'routePath',
    title: '访问路径',
    component: [Input, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1', tooltip: '页面访问路径。为系统时http开头;其他/开头' }],
    required: true,
  },
  {
    name: 'component',
    title: '组件路径',
    component: [Input, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1', tooltip: '组件查询路径' }],
    required: true,
  },

  {
    name: 'sort',
    title: '排序',
    component: [InputNumber, { placeholder: '请输入排序', min: 0 }],
    decorator: [FormItem, { tooltip: '菜单从小到大排序方式' }],
    required: true,
    initialValue: 0,
  },
  {
    name: 'btnPermission',
    title: '数据权限',
    component: [Input, { placeholder: '请输入数据权限' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    required: true,
  },

  {
    name: 'enabled',
    title: '状态',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    initialValue: 1,
  },

  {
    name: 'target ',
    title: '打开方式',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    dataSource: [
      { label: '新窗口', value: false },
      { label: '当前窗口', value: true },
    ],
    initialValue: true,
  },
  {
    name: 'cache',
    title: '是否缓存',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1', tooltip: '缓存后再次进入页面将不会重新请求' }],
    dataSource: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    initialValue: false,
  },
  {
    name: 'hidden',
    title: '是否隐藏',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1', tooltip: '可以访问但不会出现在菜单栏中' }],
    dataSource: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    initialValue: false,
  },
] as IFieldFactoryProps<Component, Component>[];
