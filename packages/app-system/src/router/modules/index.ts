import { MenuType } from '@packages/utils-common/enum';
import { routes } from '@packages/utils-common/router/';

import type { RouteRecordRaw } from 'vue-router';

export const root: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/DashBoard.vue'),
    meta: {
      icon: '',
      hidden: false,
      title: '首页',
      requiresAuth: true,
      target: false,
      cache: false,
      type: MenuType.MENU,
    },
    name: 'Dashboard',
    children: [],
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   redirect: { name: '404' },
  // },
];

export const currentRouters = [...root, ...routes];
