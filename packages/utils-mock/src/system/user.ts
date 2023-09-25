import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/system/user',
    method: 'post',
    timeout: 3000,
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          // 系统管理
          'records|0-10': [
            {
              nickname: '@cname()',
              username: '@first()',
              sex: '@natural(0,1)',
              dept: '@string()',
              email: '@string()',
              phone: '@string()',
              enabled: '@boolean()',
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
            },
          ],
          total: 3,
          size: 10,
          current: 1,
        },
      };
    },
  },
] as MockMethod[];
