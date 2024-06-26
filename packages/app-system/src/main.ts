import { router, setupRouter } from '@/router';
import Store from '@/store';
import App from './App.vue';
import { startApp } from '@packages/utils-common/enter';
import '@/styles/common.scss';

async function setup() {
  try {
    const initApp = startApp();
    await initApp(
      App,
      () => router,
      () => Store
    );
    await setupRouter();
  } catch (e) {
    (document.getElementById('app') as Element).innerHTML = `<p style="display:flex;justify-content: center;
    align-items: center;height:100%;background:#000;color:#fff;font-size:30px;">${e}</p>`;
  }
}

setup();
