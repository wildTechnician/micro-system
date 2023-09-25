import { MenuType } from '../../enum';

import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/login',
  name: 'login',
  component: () => import('../../pages/Login/LoginIndex.vue'),
  meta: {
    title: '登陆页',
    requiresAuth: false,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
} as RouteRecordRaw;
