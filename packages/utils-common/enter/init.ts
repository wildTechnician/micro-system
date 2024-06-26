import { menuList, logoutApi } from '../apis/permission';
import { createApp } from 'vue';
import { noAuthApp, needAuthApp } from '../config/index';
import { getWindows, isMonorepo } from '../utils';
import { disposeRem, setupRem } from './rem';
import { useCookies, useStorage } from '../hook';
import { Essential } from '../enum';
import { fixElementPlusTeleportCrash } from './helper';

import type { Component, App } from 'vue';
import type { Router } from 'vue-router';
import type { Pinia } from 'Pinia';

/**
 * 应用入口
 * @param AppPage
 * @param router
 * @param store
 * @returns
 */
export const startApp = () => {
  let instance: any;
  const Win: Window = getWindows();

  return async (AppPage: Component, router: () => Router, store: () => Pinia): Promise<App> => {
    if (isMonorepo) {
      let disposeFixElementPlusTeleportCrash: any;

      Win.__WUJIE_MOUNT = () => {
        instance = createdInstance(AppPage, router(), store());
        disposeFixElementPlusTeleportCrash = fixElementPlusTeleportCrash();
        Win.$wujie?.bus.$on('router-change', (path: string) => {
          router().push({ path });
        });
      };

      Win.__WUJIE_UNMOUNT = () => {
        disposeInstance(instance);
        disposeFixElementPlusTeleportCrash();
      };

      Win.__WUJIE.mount();

      return Promise.resolve(instance);
    } else if (import.meta.env.MODE !== 'production') {
      instance = createdInstance(AppPage, router(), store());

      return Promise.resolve(instance);
    } else {
      return Promise.reject('Unable to load site');
    }
  };
};

/**
 * 初始化路由
 * @returns
 */
export const initRouter = async (): Promise<MenuRoute.Route[] | []> => {
  let asyncRouter: MenuRoute.Route[] = [];
  const Win: Window = getWindows();
  try {
    if (isMonorepo) {
      /**
       * #TODO:父应用传下来的props应该统一管理
       */
      asyncRouter = Win.$wujie.props?.currentRouter || [];
    } else {
      asyncRouter = await menuList();
    }

    return Promise.resolve([...noAuthApp, ...needAuthApp, ...asyncRouter]);
  } catch (e) {
    return Promise.resolve([...noAuthApp, ...needAuthApp]);
  }
};

/**
 * 创建实例
 * @param AppPage
 * @param router
 * @param store
 * @returns
 */
export const createdInstance = (AppPage: Component, router?: Router, store?: Pinia): App => {
  const instance: App = createApp(AppPage);
  router && instance.use(router);
  store && instance.use(store);
  instance.mount('#app');
  setupRem();
  return instance;
};

/**
 * 销毁实例
 * @param instance 实例
 */
export const disposeInstance = (instance: App) => {
  instance?.unmount();
  disposeRem();
};

/**
 * 退出登录
 * @param request 是否请求退出接口
 * @returns
 */
export const logout = async (request: boolean = false) => {
  try {
    request && (await logoutApi());
    const cookies = useCookies();
    const { removeAll: localRemoveAll } = useStorage(localStorage);
    const { removeAll: sessionRemoveAll } = useStorage(sessionStorage);
    cookies.remove(Essential.TOKEN);
    cookies.remove(Essential.REFRESH_TOKEN);
    localRemoveAll();
    sessionRemoveAll();
  } catch (e) {
    return Promise.reject(e);
  }
};
