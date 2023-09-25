import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/system/occupation',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          'records|0-10': [
            {
              name: '@string()',
              'sort|+1': 1,
              description: '@cparagraph(5,15)',
              dept: '@string()',
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
