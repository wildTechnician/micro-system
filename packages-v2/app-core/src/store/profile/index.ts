import { defineStore } from 'pinia';
import { markRaw } from 'vue';
import { UserFilled, Setting, Lock, EditPen } from '@packages/utils-icon/src/elementPlus';
import { useIcon } from '@packages/utils-common/hook';
import { resetUserInfo } from '@packages/utils-common/config';
import { getUserApi, getPermissionApi } from '@packages/utils-common/apis/permission';
import { forbidden } from '@/router/modules/container';

import type { Component } from 'vue';

export type IRouterType = Record<'name' | 'component', string> & { icon: Component | undefined };

const [announcement, remind] = useIcon(['remind', 'announcement']);

interface profileState {
  // 个人中心路由信息
  route: IRouterType[];
  // 公告通知路由信息
  messageRoute: IRouterType[];
  // 用户信息
  userInfo: Auth.userInfo;
  // 用户权限
  Auth: {
    home: MenuRoute.Route;
  };
}

export default defineStore('profile', {
  state: (): profileState => {
    return {
      route: [
        { name: '个人中心', icon: markRaw(UserFilled), component: 'userCenter' },
        { name: '基本设置', icon: markRaw(Setting), component: 'userSetting' },
        { name: '安全设置', icon: markRaw(Lock), component: 'userSecurity' },
        // { name: '系统管理', icon: Setting, component: '' },
        { name: '操作日志', icon: markRaw(EditPen), component: 'userLog' },
      ],
      messageRoute: [
        { name: '公告', icon: markRaw(remind), component: 'noticeMessage' },
        { name: '通知', icon: markRaw(announcement), component: 'noticeSystem' },
      ],
      userInfo: resetUserInfo(),
      Auth: { home: forbidden },
    };
  },
  actions: {
    async initUser() {
      this.userInfo = await getUserApi();
    },

    async initAuth() {
      this.Auth = await getPermissionApi();
    },
  },
});
