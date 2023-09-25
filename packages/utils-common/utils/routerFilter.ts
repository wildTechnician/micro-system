import { MenuType } from '../enum/index';
import { Router } from 'vue-router';
import { isEmpty } from './function';

import type { RouteRecordRaw } from 'vue-router';

export async function formatRoutes(router: MenuRoute.Route[], routerInstance?: Router) {
  const modules = await import.meta.glob('/src/pages/**/*.vue');

  loopSearchMenu(router, 0, (item, depth) => {
    if (item?.meta?.type == MenuType.MENU) {
      routerInstance &&
        addRouter(
          {
            component: modules[`/src/pages/${item.component}.vue`],
            path: item.path,
            meta: {
              ...item.meta,
              requiresAuth: item.meta.requiresAuth || true,
            },
            name: item.name,
          },
          routerInstance
        );
    }
    return true;
  });
}

/**
 * 新增路由
 * @param route
 * @param routerInstance
 */
function addRouter(route: RouteRecordRaw, routerInstance: Router): void {
  if (!routerInstance.hasRoute(route.name as string)) {
    routerInstance.addRoute(route);
  }
}

/**
 * Searches through the routers array and returns an array of
 * RouteRecordRaw menus that match the given callback function.
 *
 * @param {RouteRecordRaw[]} routers - The array of RouteRecordRaw menus to search through.
 * @param {number} [depth=0] - The current depth of the search tree, defaults to 0.
 * @param {...any[]} callback - The callback function that determines if a menu matches the search criteria.
 * @return {RouteRecordRaw[]} An array of RouteRecordRaw menus that match the given callback function.
 */
export function loopSearchMenu(routers: MenuRoute.Route[], depth: number = 0, callback: (item: MenuRoute.Route, depth?: number) => boolean): MenuRoute.Route[] {
  if (isEmpty(routers)) return routers;
  let targetMenu: MenuRoute.Route[] = [];
  // 过滤目录与按钮
  for (const item of routers) {
    if (item.meta.type === MenuType.SYSTEM && callback(item, depth)) {
      targetMenu.push(item);
    } else if (item.meta.type === MenuType.MENU && callback(item, depth)) {
      targetMenu.push(item);
    }

    targetMenu = targetMenu.concat(loopSearchMenu(item.children.length >= 1 ? item.children : [], depth + 1, callback));
  }
  return targetMenu;
}
