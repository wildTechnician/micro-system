import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/system/role',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          // 系统管理
          'records|0-10': [
            {
              label: '@string(1,8)',
              id: '@guid()',
              'children|0-10': [
                {
                  label: '@string(1,8)',
                  id: '@guid()',
                  enabled: '@boolean()',
                  updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                  updateBy: '@cname()',
                  children: [],
                },
              ],
              enabled: '@boolean()',
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              updateBy: '@cname()',
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
