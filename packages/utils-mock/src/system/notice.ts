import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/system/notice',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          // 系统管理
          'records|0-10': [
            {
              title: '@string(1,8)',
              id: '@guid()',
              scope: '全员',
              content: 'cparagraph(5,15)',
              releaseTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              updateBy: '@cname()',
              isDefault: '@boolean()',
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
