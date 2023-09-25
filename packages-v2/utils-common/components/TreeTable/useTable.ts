import type { ShallowRef } from 'vue';

import { useAsync } from '../../hook';
import { parseTypes } from '../../utils';
import { get, del, post, put } from '../../service/index';
import { shallowReactive, shallowRef, ref, unref } from 'vue';
import { ElMessage } from 'element-plus';

type ParamType<T, R> = {
  api: string;
  pagination: PaginationType;
  requestData?: T;
  method?: 'post' | 'get' | 'put' | 'delete';
  autoRequest?: boolean;
  onSuccess?: (...arg: R[]) => void;
  onError?: (...arg: any[]) => void;
  httpRequest?: ((...args: T[]) => Promise<R>) | Promise<R>;
};

export type PaginationType = {
  current: number;
  pageSize: number;
  show?: boolean;
  total?: number;
  props?: {
    currentKey?: string;
    pageSizeKey?: string;
    totalKey?: string;
  };
};

export type TableParam = {
  loading: ShallowRef<boolean>;
  error: ShallowRef<string | undefined>;
  data: any;
  pagination: PaginationType;
  doRequest: (...args: any[]) => Promise<any>;
};

export function useTable<T extends Object, R = any>(params: ParamType<T, R>): TableParam {
  const { requestData, method, api, autoRequest, onSuccess, httpRequest, pagination, onError } = params;
  const loading = shallowRef<boolean>(false);
  const error = shallowRef<string>();
  const data = ref<any>();
  const paginationData = shallowReactive<PaginationType>({
    current: pagination.current,
    pageSize: pagination.pageSize,
    show: parseTypes(pagination.show, 'boolean') ? pagination.show : true,
    total: 0,
  });
  const currentKey: string = pagination.props?.currentKey || 'current';
  const pageSizeKey: string = pagination.props?.pageSizeKey || 'pageSize';
  const totalKey: string = pagination.props?.totalKey || 'total';

  const _coverData = (target: T | {}, source: T | {}) => {
    return Object.assign(target, source);
  };

  const doRequest = async (requestPreQuery?: T) => {
    let _request;
    const query = _coverData(unref(requestData || {}), requestPreQuery || {});

    paginationData.show &&
      _coverData(query, {
        [currentKey]: paginationData.current,
        [pageSizeKey]: paginationData.pageSize,
      });

    if (httpRequest) {
      _request = useAsync<T, R>(httpRequest);
    } else {
      let requestHandle;
      switch (method?.toLowerCase()) {
        case 'post':
          requestHandle = (value: T) => post<T, R>(api, value);
          break;
        case 'get':
          requestHandle = (value: T) => get<T, R>(api, value);
          break;
        case 'put':
          requestHandle = (value: T) => put<T, R>(api, value);
          break;
        case 'delete':
          requestHandle = (value: T) => del<T, R>(api, value);
          break;
        default:
          requestHandle = (value: T) => post<T, R>(api, value);
      }
      _request = useAsync<T, R>(requestHandle);
    }

    const { execute: requestExecute, state: requestState, error: requestError, loading: requestLoading } = _request;
    loading.value = true;

    await requestExecute(query as T);
    loading.value = false;

    if (requestError.value) {
      error.value = (requestError.value as Error).message || (requestError.value as string);
      data.value = [];
      if (onError) {
        onError(error.value);
      } else {
        ElMessage.error(error.value);
      }
      return;
    }

    if (parseTypes(requestState.value, 'object')) {
      paginationData.total = requestState.value[totalKey];
      data.value = requestState.value?.records;
    } else {
      data.value = requestState.value;
    }
    error.value = undefined;
  };

  if (autoRequest) {
    doRequest();
  }

  return {
    loading,
    error,
    doRequest,
    data,
    pagination: paginationData,
  };
}
