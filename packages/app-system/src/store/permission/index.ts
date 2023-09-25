import { defineStore } from 'pinia';
import { initRouter } from '@packages/utils-common/enter';
import { getWindows, getPort, isMonorepo, loopSearchMenu, formatRoutes } from '@packages/utils-common/utils';
import { router } from '@/router';
import useProfileStore from '@/store/profile';

export interface SystemState {
  menu: MenuRoute.Route[];
  isInitRouters: boolean;
}

export default defineStore('permission', {
  state: (): SystemState => {
    return {
      menu: [],
      isInitRouters: false,
    };
  },
  actions: {
    reset() {
      this.isInitRouters = false;
      this.menu = [];
    },
    async initDynamicRoute(): Promise<boolean> {
      const win = getWindows();
      const useProfile = useProfileStore();
      const [routes] = await Promise.all([initRouter(), useProfile.initAuth()]);

      const currentPort = isMonorepo ? win.$wujie.location.port : win.location.port;
      const resMenu: MenuRoute.Route[] = loopSearchMenu(routes, 0, (item, index) => getPort(item.path) == currentPort);

      if (resMenu.length > 0) {
        await formatRoutes(resMenu, router);
        this.menu = resMenu;
      } else {
        return false;
      }
      this.isInitRouters = true;
      return true;
    },
  },
});
