import { useCookies } from '../../hook';
import { Essential } from '../../enum';
import { isEmpty, isMonorepo, getSuperWindows } from '../../utils';

import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import type { StoreDefinition } from 'pinia';

export const toLogin = (next: NavigationGuardNext) => {
  const win = getSuperWindows();
  isMonorepo ? (win.location.href = `${win.location?.host}/login`) : next({ path: '/login' });
};

export async function permission(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, usePermissionStore: StoreDefinition<'permission'>) {
  const { get } = useCookies();
  const isTourist = isEmpty(get(Essential.TOKEN));
  const usePermission = usePermissionStore();
  const { requiresAuth } = to.meta;

  //游客情况下
  if (isTourist) {
    if (!requiresAuth) {
      next();
    } else {
      toLogin(next);
    }
    return;
  } else if (to.path == '/login' && !isTourist) {
    if (!isTourist) {
      next({ path: '/' });
    } else {
      next();
    }
    return;
  } else {
    // 用户进入后台
    if (!usePermission.isInitRouters) {
      const initSuccess = await usePermission.initDynamicRoute(to.params?.path);
      if (!requiresAuth) {
        next({ path: to.path });
        return;
      }

      if (!initSuccess) {
        next({ path: '/403' });
        return;
      }
    }
    next();
    return;
  }
}
