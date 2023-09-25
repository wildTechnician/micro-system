import { FormItem, Input, InputNumber, Radio, ImproveUpload, Title } from '@packages/utils-form/elementPlus';
import { h } from 'vue';
import { ElButton } from 'element-plus';
import { Download } from '@packages/utils-icon/src/elementPlus';
import { fileUpload } from '@packages/utils-common/apis';
import { downLoadStream } from '@packages/utils-common/utils';

import type { Component } from 'vue';
import type { IFieldFactoryProps } from '@packages/utils-form/core';
import type { UploadRawFile, UploadRequestOptions, UploadFile } from 'element-plus';

const UploadTem = defineComponent({
  setup() {
    return () => h('div', {}, [h(ElButton, { icon: Download }, { default: () => '下载模版' })]);
  },
});

export const searchData = [{ name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称' }], decorator: [FormItem, { gridSpan: 'span 1' }] }] as IFieldFactoryProps<
  Component,
  Component
>[];

export const deptBoundary = [
  { name: '1222', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2', tooltip: '111' }] },
  { name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称', disabled: true }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: '2222', component: [Title, { text: '中心点', tooltip: '部门级以下所有人员加载地图后默认显示的位置' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'longitude', title: '经度', validator: 'longitude', component: [Input, { placeholder: '请输入经度' }], required: true, decorator: [FormItem, { gridSpan: 'span 1' }] },
  { name: 'latitude', title: '纬度', validator: 'latitude', component: [Input, { placeholder: '请输入纬度' }], required: true, decorator: [FormItem, { gridSpan: 'span 1' }] },
  { name: '2444222', component: [Title, { text: '边界数据' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  {
    name: 'downLoad',
    component: [UploadTem],
    decorator: [FormItem, { gridSpan: 'span 2', style: { padding: '0 10px 10px 10px', backgroundColor: 'var(--el-fill-color-light)' } }],
    title: '1. 下载导入模版',
    description: '根据模版内提示信息完善模版内容',
  },
  {
    name: 'file',
    component: [
      ImproveUpload,
      {
        accept: '.json,.geoJson',
        text: '上传',
        limit: 1,
        autoUpload: true,
        action: '',
        onPreview: (uploadFile: UploadFile) => {
          const { response } = uploadFile;
          // console.log((response as any).fileUrl);
        },
        clearFileList: () => {},
        httpRequest: async (options: UploadRequestOptions) => {
          try {
            const { file } = options;
            const res = await fileUpload({
              file,
              isAttachment: 1,
              isDb: 1,
              resourceService: 'system',
              resourceUrl: 'deptUpload',
            });
            return Promise.resolve(res);
          } catch (e) {
            return Promise.reject(e);
          }
        },
        beforeUpload: (rawFile: UploadRawFile) => {
          const { size, name } = rawFile;
          const allowType = ['json', 'geoJson', 'geojson'];
          const fileType = name.split('.').pop();
          const miniSize = 0;
          const maxSize = 10 * 1024 * 1024; // 10MB

          if (allowType.includes(fileType!) && size > miniSize && size < maxSize) {
            return true;
          }

          return false;
        },
      },
    ],
    decorator: [FormItem, { gridSpan: 'span 2', style: { padding: '0 10px 10px 10px', backgroundColor: 'var(--el-fill-color-light)' } }],
    required: true,
    title: '2. 上传完善后的模版',
    description: '下载模板并完善信息后，点击上传。支持格式：.json、.geoJson且小于10MB',
    initialValue: [],
  },
] as IFieldFactoryProps<Component, Component>[];

export const fromData = [
  { name: 'title', title: '', component: [Title, { text: '基本信息' }], decorator: [FormItem, { gridSpan: 'span 2' }] },
  { name: 'parentId', title: '上级部门', component: [Input, { placeholder: '请输入名称', disabled: true }], decorator: [FormItem, { gridSpan: 'span 2' }], initialValue: '0' },
  { name: 'name', title: '名称', component: [Input, { placeholder: '请输入名称' }], decorator: [FormItem, { gridSpan: 'span 1' }], required: true },
  { name: 'leader', title: '负责人', component: [Input, { placeholder: '请输入负责人' }], decorator: [FormItem, { gridSpan: 'span 1' }] },
  {
    name: 'sort',
    title: '排序',
    component: [InputNumber, { placeholder: '请输入排序', min: 0 }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    initialValue: 1,
    required: true,
  },
  {
    name: 'enabled',
    title: '状态',
    component: [Radio.Group, { placeholder: '请输入名称' }],
    decorator: [FormItem, { gridSpan: 'span 1' }],
    initialValue: 1,
    dataSource: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 2 },
    ],
  },
] as IFieldFactoryProps<Component, Component>[];
