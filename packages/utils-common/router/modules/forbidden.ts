import { MenuType } from '../../enum';

import type { RouteRecordRaw } from 'vue-router';

export default {
  path: '/403',
  name: '403',
  component: () => import('../../components/Error/forbiddenPage.vue'),
  meta: {
    title: '403',
    requiresAuth: false,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
} as RouteRecordRaw;
