import { defineComponent, h } from 'vue';

import { ElTreeSelect } from 'element-plus';

import { connect, mapProps } from '@formily/vue';

const treeSelect = defineComponent({
  name: 'TreeSelect',
  setup(props, { attrs, slots, emit }) {
    return () => {
      return h(ElTreeSelect, { ...attrs }, slots);
    };
  },
});

export const TreeSelect = connect(
  treeSelect,
  mapProps({
    dataSource: 'data',
    value: 'modelValue',
    readOnly: 'readonly',
  })
);
