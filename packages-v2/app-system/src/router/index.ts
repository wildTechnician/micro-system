import { createRouter, createWebHistory } from 'vue-router';
import { permission } from '@packages/utils-common/router';
import { currentRouters } from './modules';
import usePermissionStore from '@/store/permission';

import type { Router } from 'vue-router';

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: currentRouters,
});

export async function setupRouter() {
  router.beforeEach(async (to, from, next) => {
    await permission(to, from, next, usePermissionStore);
  });

  await router.isReady();
}

export * from './modules';
