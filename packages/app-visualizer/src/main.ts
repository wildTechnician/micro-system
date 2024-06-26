import Router from '@/router/RouterIndex';
import Store from '@/store/storeIndex';
import App from './App.vue';

import { startApp } from '@packages/utils-common/enter';

import '@/styles/common.scss';

import '@packages/utils-common/enter/rem';

async function setup() {
  try {
    const initApp = startApp();
    await initApp(
      App,
      () => Router,
      () => Store
    );
  } catch (e) {
    (document.getElementById('app') as Element).innerHTML = `<p style="display:flex;justify-content: center;
    align-items: center;height:100%;background:#000;color:#fff;font-size:30px;">${e}</p>`;
  }
}

setup();
