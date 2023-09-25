import { defineAsyncComponent, defineComponent } from 'vue';
import type { Component } from 'vue';

export const getIcon = (name: string): Component => {
  if (!name) return defineComponent({ render: () => null });
  return defineAsyncComponent({
    loader: () => import(`../components/${name}.vue`),
  });
};
