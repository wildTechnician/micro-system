import { NetState, RequestType } from '../enum/index';
import { useCookies } from '../hook';
import { Essential } from '../enum';
import { refreshToken } from './helper';
import { logout } from '../enter/init';

import type { AxiosInstance } from 'axios';
import type { requestConfig } from '../service';

export const requestHook = (serve: AxiosInstance) => {
  const tokenHelper = refreshToken();

  serve.interceptors.request.use((config: requestConfig) => {
    const { disableIcp } = config;
    if (disableIcp) {
      return config;
    }
    const { get } = useCookies();
    const token = get(Essential.TOKEN);
    if (token) {
      // @ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  serve.interceptors.response.use(
    (response) => {
      const { headers, data, config } = response;
      const { code, msg, data: jsonData } = data;
      const isJson = headers['content-type'].includes(RequestType.JSON);

      if (parseInt(code) === NetState.OK) {
        return Promise.resolve(isJson ? jsonData : data);
      } else if (parseInt(code) === NetState.NO_AUTH) {
        tokenHelper(config)
          .then((queue) => {
            queue.map((item) => {
              serve.request(item);
            });
          })
          .catch((e) => {
            logout();
          });
      } else {
        return Promise.reject(msg);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
