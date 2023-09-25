import type { AxiosRequestConfig } from 'axios';

import { useCookies } from '../hook';
import { Essential } from '../enum';
import { getToken } from '../apis/permission';

export function refreshToken() {
  const cookies = useCookies();

  const requestQueue: AxiosRequestConfig[] = [];
  let refreshing: boolean = false;

  return async function (config: AxiosRequestConfig): Promise<AxiosRequestConfig<any>[]> {
    requestQueue.push(config);
    if (refreshing) {
      return [];
    }
    const token = cookies.get(Essential.REFRESH_TOKEN);
    if (token) {
      try {
        refreshing = true;
        const { value, refreshToken } = await getToken(token);
        cookies.set(Essential.TOKEN, value);
        cookies.set(Essential.REFRESH_TOKEN, refreshToken);

        requestQueue.map((queue) => {
          if (queue.headers) queue.headers.Authorization = `Bearer ${value}`;
        });

        return requestQueue;
      } catch (e) {
        throw new Error('请求token失败!');
      } finally {
        refreshing = false;
      }
    }
    throw new Error('获取token失败!');
  };
}
