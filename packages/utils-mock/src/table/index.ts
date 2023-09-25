import { MockMethod } from 'vite-plugin-mock';
import { NetState } from '@packages/utils-common/enum/index';
export default [
  {
    url: '/table/list',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        data: {
          'records|10': [
            {
              'id|+1': 1,
              name: '@cname()',
              createdTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              address: '@county(true)',
              desc: '@cparagraph(5, 20)',
              image: '@image()',
            },
          ],
          total: 100,
          size: 10,
          current: 1,
        },
      };
    },
  },
] as MockMethod[];
