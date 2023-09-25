import { createRouter, createWebHistory } from 'vue-router';
import { MenuType } from '@packages/utils-common/enum/index';
import { permission } from '@packages/utils-common/router';
import usePermissionStore from '@/store/permission';
import progress from 'nprogress';

import type { Router, RouteRecordRaw } from 'vue-router';

const presetRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'container',
  },
  {
    path: '/container',
    name: 'container',
    component: () => import('@/pages/homePage.vue'),
    meta: {
      title: '主页',
      requiresAuth: true,
      icon: 'dashboard',
      target: true,
      type: MenuType.MENU,
    },
    children: [
      {
        path: '/container/:path?',
        name: 'wujieVue',
        component: () => import('@/pages/monorepo/wujieVue.vue'),
        meta: {
          title: '主页',
          requiresAuth: true,
          icon: '',
          target: true,
          type: MenuType.MENU,
        },
      },
      {
        path: '/:catchAll(.*)*',
        redirect: { name: '404' },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@packages/utils-common/components/Error/errorPage.vue'),
        meta: {
          title: '404',
          requiresAuth: false,
          icon: '',
          target: true,
          type: MenuType.MENU,
        },
      },
      {
        path: '/403',
        name: '403',
        component: () => import('@packages/utils-common/components/Error/forbiddenPage.vue'),
        meta: {
          title: '403',
          requiresAuth: false,
          icon: '',
          target: true,
          type: MenuType.MENU,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@packages/utils-common/pages/Login/LoginIndex.vue'),
    meta: {
      title: '登陆页',
      requiresAuth: false,
      icon: '',
      target: true,
      type: MenuType.MENU,
    },
  },
  {
    path: '/profile/:path?',
    name: 'profile',
    sensitive: true,
    component: () => import('@/pages/Profile/userIndex.vue'),
    meta: {
      title: '个人中心',
      requiresAuth: true,
      icon: '',
      target: true,
      type: MenuType.MENU,
    },
  },
  {
    path: '/iconList',
    name: 'iconList',
    component: () => import('@packages/utils-icon/src/IconIndex.vue'),
    meta: {
      title: '图标库',
      requiresAuth: false,
      icon: '',
      target: true,
      type: MenuType.MENU,
    },
  },
];

export const router: Router = createRouter({
  history: createWebHistory(),
  routes: presetRoutes,
});

export async function setupRouter() {
  router.beforeEach(async (to, from, next) => {
    progress.start();
    await permission(to, from, next, usePermissionStore);
  });

  router.afterEach(() => {
    progress.done();
  });

  router.onError(() => {
    progress.remove();
  });

  await router.isReady();
}
