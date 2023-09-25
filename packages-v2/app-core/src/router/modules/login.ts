import { MenuType } from '@packages/utils-common/enum';

const login: MenuRoute.Route = {
  path: '/login',
  name: 'login',
  component: '@/pages/Login/LoginIndex.vue',
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
};

export default login;
