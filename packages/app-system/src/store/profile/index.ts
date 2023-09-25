import { defineStore } from 'pinia';
import { resetUserInfo } from '@packages/utils-common/config';
import { getUserApi, getPermissionApi } from '@packages/utils-common/apis/permission';
import { isMonorepo, getWindows } from '@packages/utils-common/utils';

interface ProfileState {
  // 用户信息
  userInfo: Auth.userInfo;
  // 用户权限
  Auth: any;
}

export default defineStore('profile', {
  state: (): ProfileState => {
    return {
      userInfo: resetUserInfo(),
      Auth: { home: {} },
    };
  },

  actions: {
    async initUser() {
      /**
       * TODO:父应用传下来的props应该统一管理
       */
      const win = getWindows();
      this.userInfo = isMonorepo ? (win.$wujie.props?.user as Auth.userInfo) : await getUserApi();
    },

    async initAuth() {
      /**
       * TODO:父应用传下来的props应该统一管理
       */
      const win = getWindows();
      this.Auth = isMonorepo ? win.$wujie.props?.Auth : await getPermissionApi();
    },
  },
});
