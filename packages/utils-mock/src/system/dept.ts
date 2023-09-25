import { MockMethod } from 'vite-plugin-mock';
import { NetState, NetStateMsg } from '@packages/utils-common/enum/index';

export default [
  {
    url: '/system/dept',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          // 系统管理
          records: [
            {
              'children|0-10': [
                {
                  children: [],
                  name: '@string(3,10)',
                  enabled: '@boolean()',
                  leader: '@cname()',
                  'sort|+1': 1,
                  id: 'dewfefer23',
                  updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                  updateBy: '@cname()',
                },
              ],
              sort: 1,
              name: '@string(3,10)',
              leader: '@cname()',
              enabled: '@boolean()',
              id: 'dewfefer2fefer3ferfer',
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
  {
    url: '/system/subDept',
    method: 'post',
    response: () => {
      return {
        code: NetState.OK,
        msg: NetStateMsg.OK,
        data: {
          'dept|0-30': [
            {
              'children|0-10': [
                {
                  'children|0-10': [
                    {
                      children: [],
                      name: '@csentence(2,10)',
                      enabled: '@boolean()',
                      leader: '@cname()',
                      'sort|+1': 1,
                      id: '@id()',
                      updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                      updateBy: '@cname()',
                    },
                  ],
                  name: '@csentence(2,10)',
                  enabled: '@boolean()',
                  leader: '@cname()',
                  'sort|+1': 1,
                  id: '@id()',
                  updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
                  updateBy: '@cname()',
                },
              ],
              sort: 1,
              name: '@csentence(2,10)',
              leader: '@cname()',
              enabled: '@boolean()',
              id: '@id()',
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              updateBy: '@cname()',
            },
          ],
          'user|0-10': [
            {
              name: '@cname()',
              username: '@first()',
              sex: '@natural(0,1)',
              dept: '@string()',
              email: '@string()',
              phone: '@string()',
              enabled: '@boolean()',
              updateTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              id: '@id()',
            },
          ],
        },
      };
    },
  },
] as MockMethod[];
