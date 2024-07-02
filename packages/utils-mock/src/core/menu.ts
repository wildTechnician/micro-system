import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/admin/menu/routes',
    method: 'get',
    // statusCode: NetState.NOAUTH,
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: [
          // 系统管理
          {
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
              {
                children: [],
                component: 'User/userIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '用户管理',
                  type: 'M',
                },
                name: 'user ',
                path: '/user',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Dept/deptIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '部门管理',
                  type: 'M',
                },
                name: 'dept ',
                path: '/dept',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Occupation/occupationIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '岗位管理',
                  type: 'M',
                },
                name: 'occupation ',
                path: '/occupation',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Role/roleIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '角色管理',
                  type: 'M',
                },
                name: 'role',
                path: '/role',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Dict/dictIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '数据字典',
                  type: 'M',
                },
                name: 'dict',
                path: '/dict',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Version/versionIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '版本管理',
                  type: 'M',
                },
                name: 'version',
                path: '/version',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Notice/noticeIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '通知公告',
                  type: 'M',
                },
                name: 'notice',
                path: '/notice',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'LowCode/lowCodeIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '代码生成',
                  type: 'M',
                },
                name: 'lowCode',
                path: '/lowCode',
                updateTime: '@natural(0,300)',
              },
              {
                children: [],
                component: 'Log/logIndex',
                meta: {
                  icon: 'avatar',
                  target: true,
                  title: '日志查看',
                  type: 'M',
                },
                name: 'log',
                path: '/log',
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
            name: 'system',
            path: 'http://localhost:7790',
            updateTime: '@natural(0,300)',
          },
          {
            children: [],
            component: 'visualizer',
            meta: {
              icon: 'trophy',
              target: true,
              preset: false,
              title: '可视化数据',
              type: 'S',
            },
            name: 'visualizer',
            path: 'http://localhost:7788',
            updateTime: '@natural(0,300)',
          },
          {
            children: [],
            component: 'iconList',
            meta: {
              icon: 'trophy',
              target: true,
              preset: false,
              title: '图标库',
              type: 'M',
            },
            name: 'iconList',
            path: '/iconList',
            updateTime: '@natural(0,300)',
          },
        ],
      };
    },
  },
] as MockMethod[];
