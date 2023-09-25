import Router from '@/router/RouterIndex';
import Store from '@/store/storeIndex';
import App from './App.vue';
import lifecycle from '@packages/utils-common/enter/lifecycle';
import { registerComponents } from '@/plugins';

import '@/styles/common.scss';

import '@packages/utils-common/enter/rem';

import useSystemStore from './store/system/index';

lifecycle(App, Router, Store)
  ?.then((res) => {
    if (!res) return;
    const { routers, instance } = res;
    const systemStore = useSystemStore();
    systemStore.menu = routers;
    registerComponents(instance);
  })
  .catch((e) => {
    (document.getElementById('app') as Element).innerHTML = `<p style="display:flex;justify-content: center;
    align-items: center;height:100%;background:#000;color:#fff;font-size:30px;">${e}</p>`;
  });
