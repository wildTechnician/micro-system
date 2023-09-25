import { MockMethod } from 'vite-plugin-mock';
import { NetState } from '@packages/utils-common/enum/index';
import Mock from 'mockjs';
export default [
  {
    url: '/oauth/auth/login',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {
          value: Mock.Random.guid(),
          refreshToken: Mock.Random.guid(),
          tokenType: 'bearer',
        },
      };
    },
  },
  {
    url: '/oauth/auth/logout',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {},
      };
    },
  },
  {
    url: '/oauth/auth/refresh_token',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {
          value: Mock.Random.guid(),
          refreshToken: Mock.Random.guid(),
          tokenType: 'bearer',
        },
      };
    },
  },
  {
    url: '/admin/user/info',
    method: 'get',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {
          nickname: '@cname()',
          username: '@first()',
          sex: '@natural(0,1)',
          dept: '@string()',
          email: '@string()',
          phone: '@string()',
          enabled: '@boolean()',
          updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
        },
      };
    },
  },
  {
    url: '/admin/user/permission',
    method: 'get',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {
          home: {
            children: [
              {
                children: [],
                component: 'Menu/menuIndex',
                meta: {
                  icon: 'install',
                  target: true,
                  title: '菜单管理',
                  type: 'M',
                },
                name: 'menu ',
                path: '/menu',
                updateTime: '@natural(0,300)',
              },
            ],
            component: 'system',
            meta: {
              icon: 'install',
              target: true,
              preset: false,
              title: '系统管理',
              type: 'S',
            },
            name: 'system ',
            path: 'http://localhost:7790',
            updateTime: '@natural(0,300)',
          },
        },
      };
    },
  },
] as MockMethod[];
