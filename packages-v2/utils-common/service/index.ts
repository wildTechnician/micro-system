import qs from 'qs';
import axios from 'axios';
import { requestHook } from './requestHook';
import { formatterUrl, getSuperWindows } from '../utils';

import type { AxiosInstance, AxiosRequestConfig } from 'axios';

export type allRequestType = 'form' | 'file' | 'json';
export type requestConfig = { requestType?: allRequestType; disableIcp?: boolean } & AxiosRequestConfig;

const typeList = {
  form: 'application/x-www-form-urlencoded',
  file: 'multipart/form-data',
  json: 'application/json',
};

const useProxy = import.meta.env.VITE_HTTP_PROXY === 'Y';

/**
 * field:requestType;
 * @param {*} type
 * @returns
 */
function getType(type: any = 'json') {
  type = type in typeList ? type : 'json';
  return { typeName: type, typeVal: typeList[type as keyof typeof typeList] };
}

function parse(params: any, config: requestConfig = {}) {
  let { requestType, headers } = config;
  let contextType = headers && headers['content-type'] ? headers['content-type'] : '';
  let { typeName, typeVal }: { typeName: string; typeVal: string } = getType(requestType || contextType);
  let options: requestConfig;

  delete config['requestType'];
  options = config;
  options['headers'] = {
    'content-type': typeVal,
  };

  if (typeName == 'form') {
    return { data: qs.stringify(params), options };
  } else if (typeName == 'file') {
    const data: FormData = new FormData();
    for (let i in params) {
      data.append(i, params[i]);
    }
    return { data, options };
  }

  return { data: params, options };
}

export const serve: AxiosInstance = axios.create({
  baseURL: useProxy ? `/${import.meta.env.MODE}` : formatterUrl(import.meta.env.VITE_BASE_URL, getSuperWindows()),
  timeout: 30 * 1000,
});

requestHook(serve);

export function get<T extends Object, R>(url: string, paramList: T, configList?: requestConfig): Promise<R> {
  let { data, options } = parse(paramList, configList);
  return serve.get<T, R>(url, { params: data, ...options });
}

export function del<T extends Object, R>(url: string, paramList: T, configList?: requestConfig): Promise<R> {
  let { data, options } = parse(paramList, configList);
  return serve.delete<T, R, requestConfig>(url, { data: data, ...options });
}

export function post<T extends Object, R>(url: string, paramList: T, configList?: requestConfig): Promise<R> {
  let { data, options } = parse(paramList, configList);
  return serve.post<T, R, requestConfig>(url, data, { ...options });
}

export function put<T extends Object, R>(url: string, paramList: T, configList?: requestConfig): Promise<R> {
  let { data, options } = parse(paramList, configList);
  return serve.put<T, R, requestConfig>(url, data, { ...options });
}
