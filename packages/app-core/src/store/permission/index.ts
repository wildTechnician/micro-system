import { defineStore } from 'pinia';
import { initRouter } from '@packages/utils-common/enter';
import { forbidden } from '@/router/modules/container';
import { useStorage } from '@packages/utils-common/hook';
import { loopSearchMenu, formatterUrl } from '@packages/utils-common/utils';
import { Essential, MenuType } from '@packages/utils-common/enum';
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
          if (homeMenu) {
            setCurrentChildHost(Essential.CURRENT_SYSTEM_HOST, { path: homeMenu.path, name: homeMenu.name });
          } else {
            /**
             * 设置默认主页
             */
            return false;
          }
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    searchHomeMenu(condition: any, routes: MenuRoute.Route[]): MenuRoute.Route | undefined {
      let curSystem: MenuRoute.Route | undefined = undefined;
      loopSearchMenu(routes, 0, (router) => {
        // 当前路由的系统
        if (router.meta.type == MenuType.SYSTEM) curSystem = router;

        if (condition.component == router.component && curSystem) {
          this.childrenRouters = new Array(curSystem!);
          this.defaultRouter = { ...curSystem!, path: curSystem!.path + condition.routePath };
          return true;
        }
        return false;
      });
      return curSystem;
    },
  },

  getters: {
    getDefaultRouter(): MenuRoute.Route {
      return { ...this.defaultRouter, path: formatterUrl(this.defaultRouter.path) };
    },
  },
});
