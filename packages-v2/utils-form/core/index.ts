import { registerValidate } from './helper';

export * from '@formily/core';

const init = () => {
  registerValidate();
};

init();
