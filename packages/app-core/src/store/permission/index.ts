import { defineStore } from 'pinia';
import { initRouter } from '@packages/utils-common/enter';
import { forbidden } from '@/router/modules/container';
import { useStorage } from '@packages/utils-common/hook';
import { loopSearchMenu, formatterUrl } from '@packages/utils-common/utils';
import { Essential } from '@packages/utils-common/enum';
import useProfileStore from '@/store/profile';

interface RouterState {
  allRouters: MenuRoute.Route[];
  childrenRouters: MenuRoute.Route[];
  defaultRouter: MenuRoute.Route;
  isInitRouters: boolean;
}

export default defineStore('permission', {
  state: (): RouterState => {
    return {
      // 所有路由
      allRouters: [],
      // 默认显示路由
      defaultRouter: forbidden,
      // 是否初始化路由
      isInitRouters: false,
      // 子应用路由
      childrenRouters: [],
    };
  },

  actions: {
    reset() {
      this.allRouters = [];
      this.childrenRouters = [];
      this.isInitRouters = false;
      this.defaultRouter = forbidden;
    },
    async initDynamicRoute(param: string): Promise<boolean> {
      const useProfile = useProfileStore();

      try {
        const [routes] = await Promise.all([initRouter(), useProfile.initAuth()]);
        const { set: setCurrentChildHost, get: getCurrentChildHost } = useStorage(sessionStorage);
        const currentChildHost = getCurrentChildHost(Essential.CURRENT_SYSTEM_HOST);
        this.allRouters = routes;
        this.isInitRouters = true;

        /**
         * 页面刷新后获取当前子系统的所有路由
         */
        if (currentChildHost) {
          this.childrenRouters = loopSearchMenu(routes, 0, (item) => {
            if (item.path == currentChildHost.path) return true;
            return false;
          });
          this.defaultRouter = { ...currentChildHost, path: currentChildHost.path + param };
        } else {
          /**
           * 查找子路由
           * #TODO:如果主页没有返回，目前返回false跳转403页面
           */
          const homeMenu = this.searchHomeMenu(useProfile.Auth.home, routes);
          if (homeMenu.length > 0) {
            setCurrentChildHost(Essential.CURRENT_SYSTEM_HOST, { path: homeMenu[0].path, name: homeMenu[0].name });
          } else {
            /**
             * 设置默认主页
             */
            return false;
          }
        }
        return true;
      } catch (e) {
        return Promise.reject(e);
      }
    },

    searchHomeMenu(condition: any, routes: MenuRoute.Route[]): MenuRoute.Route[] {
      return loopSearchMenu(routes, 0, (router) => {
        if (condition.component == router.component) {
          this.childrenRouters = [router];
          this.defaultRouter = { ...router, path: condition.path + (condition.children && condition.children.length > 0 ? condition.children[0].path : '/') };
          return true;
        }
        return false;
      });
    },
  },

  getters: {
    getDefaultRouter(): MenuRoute.Route {
      return { ...this.defaultRouter, path: formatterUrl(this.defaultRouter.path) };
    },
  },
});
