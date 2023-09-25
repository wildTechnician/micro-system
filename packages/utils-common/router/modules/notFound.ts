import { MenuType } from '../../enum';

import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/404',
  name: '404',
  component: () => import('../../components/Error/errorPage.vue'),
  meta: {
    title: '404',
    requiresAuth: false,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
} as RouteRecordRaw;
