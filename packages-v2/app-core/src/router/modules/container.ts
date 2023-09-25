import { MenuType } from '@packages/utils-common/enum';
/**
 * 404
 */
export const not_found: MenuRoute.Route = {
  path: '/404',
  name: '404',
  component: '@packages/utils-common/components/Error/404Page.vue',
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
};

/**
 * 403
 */
export const forbidden: MenuRoute.Route = {
  path: '/403',
  name: '403',
  component: '@packages/utils-common/components/Error/403Page.vue',
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
};

/**
 * wujie微服务
 */
export const Wujie: MenuRoute.Route = {
  path: '/container/:path?',
  name: 'wujieVue',
  component: '@/pages/monorepo/wujieVue.vue',
  meta: {
    title: '主页',
    requiresAuth: true,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
};

const container: MenuRoute.Route = {
  path: '/container',
  name: 'container',
  meta: {
    title: '主页',
    requiresAuth: true,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [not_found, forbidden, Wujie],
  component: '@/pages/homePage.vue',
};

export default container;
