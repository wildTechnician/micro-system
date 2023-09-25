import { defineComponent, h, getCurrentInstance, onMounted, watch } from 'vue';
import { connect, mapProps, useField } from '@formily/vue';
import { ElTree } from 'element-plus';

const tree = defineComponent({
  name: 'TreeComponent',
  props: {
    defaultCheckedKeys: {
      type: Array,
    },
  },
  emits: ['change'],
  setup(props, { attrs, slots, emit }) {
    const instance = getCurrentInstance();
    const field = useField();

    const setAllCheckedKeysToData = (keys: string[]) => {
      field.value.setData(keys);
    };
    const data = {
      ref: 'treeHandle',
      onCheck() {
        const arr = (instance!.refs.treeHandle as any).getCheckedKeys();
        const nodes = (instance!.refs.treeHandle as any).getCheckedNodes();
        emit('change', arr, nodes);
        setAllCheckedKeysToData([...(instance!.refs.treeHandle as any).getCheckedKeys(), ...(instance!.refs.treeHandle as any).getHalfCheckedKeys()]);
      },
    };

    onMounted(() => {
      emit('change', (instance?.refs.treeHandle as any).getCheckedKeys());
      setAllCheckedKeysToData([...(instance!.refs.treeHandle as any).getCheckedKeys(), ...(instance!.refs.treeHandle as any).getHalfCheckedKeys()]);
    });

    watch(
      () => props.defaultCheckedKeys,
      () => {
        (instance?.refs.treeHandle as any).setCheckedKeys(props.defaultCheckedKeys);
        setAllCheckedKeysToData([...(instance!.refs.treeHandle as any).getCheckedKeys(), ...(instance!.refs.treeHandle as any).getHalfCheckedKeys()]);
      }
    );

    return () => h(ElTree as any, { ...attrs, ...props, ...data }, slots);
  },
});

export const Tree = connect(
  tree,
  mapProps({
    dataSource: 'data',
    value: 'defaultCheckedKeys',
  })
);
