import { App } from 'vue';

import TreeTable from '@packages/utils-common/components/TreeTable/tableIndex.vue';
import spaceIndex from '@packages/utils-common/components/Space/spaceIndex.vue';

export default (instance: App) => {
  instance.component('TreeTable', TreeTable);
  instance.component('SpaceIndex', spaceIndex);
};
