import { MenuType } from '@packages/utils-common/enum';

const profile: MenuRoute.Route = {
  path: '/profile/:path?',
  name: 'profile',
  sensitive: true,
  component: '@/pages/Profile/userIndex.vue',
  meta: {
    title: '个人中心',
    requiresAuth: true,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
};

export default profile;
