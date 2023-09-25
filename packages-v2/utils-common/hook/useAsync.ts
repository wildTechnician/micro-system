import { shallowRef } from 'vue';
import { useLoading } from './useLoading';

/**
 * 异步封装
 * @param callback
 * @returns
 */
export function useAsync<T = any, R = any>(callback: ((...args: T[]) => Promise<R>) | Promise<R>) {
  const { loading, startLoading, endLoading } = useLoading(false);
  const error = shallowRef<Error | string>();
  const state = shallowRef();
  const execute = async (...args: T[]) => {
    const _callback = typeof callback === 'function' ? callback(...args) : callback;
    try {
      startLoading();
      state.value = await _callback;
      error.value = undefined;
    } catch (e) {
      error.value = e as Error;
      state.value = undefined;
    } finally {
      endLoading();
    }
    return state.value;
  };

  return {
    error,
    state,
    loading,
    execute,
  };
}
