import { getWindows } from '../utils';

export function useStorage(handle: Storage | undefined) {
  // defaultStorage
  if (!handle) {
    handle = getWindows().localStorage;
  }

  function set<T extends Boolean | String | null | Object | Number>(key: string, val: T) {
    return handle?.setItem(key, JSON.stringify(val));
  }

  function get(key: string) {
    const res = handle?.getItem(key);
    return res ? JSON.parse(res) : null;
  }
  function getAll() {
    if ((handle as Storage)?.length > 0) {
      const res = [];
      for (let i = 0; i < (handle as Storage).length; i++) {
        let storageKey = handle?.key(i);
        res.push(get(storageKey as string));
      }
      return res;
    }
    return null;
  }

  function remove(key: string) {
    handle?.removeItem(key);
  }

  function removeAll() {
    handle?.clear();
  }
  return {
    get,
    set,
    getAll,
    remove,
    removeAll,
  };
}
