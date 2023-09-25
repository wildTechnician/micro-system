import { createPinia } from 'pinia';
// 持久化存储
import { storeCache } from '@packages/utils-common/plugins';

const store = createPinia();
store.use(storeCache);

export default store;
