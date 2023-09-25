import { router, setupRouter } from '@/router';
import Store from '@/store';
import App from './App.vue';
import { createdInstance } from '@packages/utils-common/enter';

import '@/styles/common.scss';

async function setupApp() {
  createdInstance(App, router, Store);
  await setupRouter();
}

setupApp();
