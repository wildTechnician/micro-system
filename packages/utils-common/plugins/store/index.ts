import type { PiniaPluginContext } from 'pinia';
import { defaultCache } from '../../config/index';
type Store = PiniaPluginContext['store'];
type State = Partial<Store['$state']>;
type Cache = Partial<Store['$options']['cache']>;

const defaultStorage: Storage = defaultCache;

export default ({ options, store }: PiniaPluginContext): void => {
  if (options?.cache && options.cache?.enable) {
    const { cache } = options;
    const storageHandle: Storage = cache.storage || defaultStorage;
    const storageName: string = cache.key || store.$id;

    const storageRes = storageHandle.get(storageName);

    if (storageRes) {
      store.$patch(JSON.parse(storageRes));
    }

    // 持续监听
    store.$subscribe(() => {
      updateStorage(store, cache);
    });
  }
};

const updateStorage = (store: Store, cache: Cache): void => {
  const storageHandle: Storage = cache.storage || defaultStorage;
  const storageName: string = cache.key || store.$id;
  const listenParam: string[] = Array.from(new Set(cache.keepName)) as string[];

  const partialStorage = listenParam.reduce((item, key) => {
    item[key] = store.$state[key];
    return item;
  }, {} as State);

  // 存入缓存
  storageHandle.set(storageName, JSON.stringify(Object.keys(partialStorage).length === 0 ? store.$state : partialStorage));
};
