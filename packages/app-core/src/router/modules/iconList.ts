import { MenuType } from '@packages/utils-common/enum';

const iconList: MenuRoute.Route = {
  path: '/iconList',
  name: 'iconList',
  component: '@packages/utils-icon/src/IconIndex.vue',
  meta: {
    title: '图标库',
    requiresAuth: false,
    icon: '',
    target: true,
    cache: false,
    hidden: false,
    type: MenuType.MENU,
  },
  children: [],
};

export default iconList;
