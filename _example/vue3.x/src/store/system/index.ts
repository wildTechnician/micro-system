import { defineStore } from 'pinia';

import type { RouteRecordRaw } from 'vue-router';

export default defineStore('system', {
  state: () => {
    return {
      menu: {} as RouteRecordRaw[] | RouteRecordRaw,
    };
  },
});
