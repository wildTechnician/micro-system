import { FormItem, Input, Select, Radio, Tree, TreeSelect, Title } from '@packages/utils-form/elementPlus';

import type { Component } from 'vue';
import type { IFieldFactoryProps } from '@packages/utils-form/core';

import { h } from 'vue';

const extra = h('div', { style: { fontSize: '12px' } }, [h('p', '1. 未选中时，则会进入默认首页。默认首页请联系管理员'), h('p', '2. 设置首页列表将根据菜单权限配置中选中的值生成')]);

export const accessPC = [
  {
    name: 'menuIds',
    title: '菜单权限',
    component: [Tree, { showCheckbox: true, nodeKey: 'id', props: { label: 'name' } }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    initialValue: [],
  },
  {
    name: 'dataRange',
    title: '数据权限',
    component: [Radio.Group, {}],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    initialValue: '2',
    dataSource: [
      { label: '全部', value: '1' },
      { label: '本部门', value: '2' },
      { label: '本部门及以下', value: '3' },
      { label: '自定义', value: '4' },
    ],
  },
  {
    name: 'deptIds',
    title: '自定义权限',
    component: [Tree, { showCheckbox: true, nodeKey: 'id', props: { label: 'name' } }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    initialValue: [],
  },
  {
    name: 'homeMenuId',
    title: '设置首页',
    component: [TreeSelect, { placeholder: '请输入名称', nodeKey: 'id', props: { label: 'name' } }],
    decorator: [FormItem, { gridSpan: 'span 2', tooltip: '登陆成功后默认进入的页面', extra: extra }],
    initialValue: '',
  },
] as IFieldFactoryProps<Component, Component>[];

export const accessAPP = [
  {
    name: 'appAuth',
    title: '身份',
    component: [Select, { placeholder: '请选择身份', teleported: true, clearable: true }],
    decorator: [FormItem, { gridSpan: 'span 2', tooltip: '以何种身份登陆到移动端' }],
    dataSource: [
      { label: '巡护', value: 'patrol' },
      { label: '管理', value: 'admin' },
    ],
    description: '未设置时，将无法进入移动端',
  },
] as IFieldFactoryProps<Component, Component>[];

export const fromData = [
  { name: 'title', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称' }], decorator: [FormItem, { gridSpan: 'span 2' }], required: true },
  {
    name: 'enabled',
    title: '状态',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 2' }],
    dataSource: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    initialValue: 1,
  },
] as IFieldFactoryProps<Component, Component>[];
