import { registerValidateFormats, registerValidateLocale } from '@formily/core';

export const registerValidate = () => {
  registerValidateFormats({
    /**
     * 经度
     */
    //eslint-disable-next-line
    longitude: /^[\-\+]?(0(\.\d{1,10})?|([1-9](\d)?)(\.\d{1,10})?|1[0-7]\d{1}(\.\d{1,10})?|180\.0{1,10})$/,
    /**
     * 纬度
     */
    //eslint-disable-next-line
    latitude: /^[\-\+]?((0|([1-8]\d?))(\.\d{1,10})?|90(\.0{1,10})?)$/,
  });

  registerValidateLocale({
    'zh-CN': {
      longitude: '该字段不是合法的经度格式',
      latitude: '该字段不是合法的纬度格式',
    },
  });
};
