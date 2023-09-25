import { MockMethod } from 'vite-plugin-mock';
import { NetState } from '@packages/utils-common/enum/index';
export default [
  {
    url: '/charts/pie',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: 'ok',
        'data|4-15': [
          {
            'id|+1': 1,
            name: '@cname()',
            data: '@natural(0,300)',
          },
        ],
      };
    },
  },
] as MockMethod[];
