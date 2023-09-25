import { MenuType } from '../enum/index';

/** 所有页面为动态加载 */
export const noAuthApp: MenuRoute.Route[] = [];

export const needAuthApp: MenuRoute.Route[] = [
  // {
  //   children: [],
  //   component: 'visualizer',
  //   meta: {
  //     icon: 'bluetooth',
  //     target: true,
  //     title: '可视数据',
  //     type: MenuType.SYSTEM,
  //     requiresAuth: true,
  //     cache: false,
  //     hidden: false,
  //   },
  //   name: 'visualizer',
  //   path: 'http://localhost:7788',
  // },
];

// 默认主页
export const indexPage = needAuthApp[0];
