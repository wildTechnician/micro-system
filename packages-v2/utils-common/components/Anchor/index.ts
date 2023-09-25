import type { ShallowRef } from 'vue';

export interface AnchorContext {
  handleClick: (...any: any[]) => void;
  activeIndex: ShallowRef<string>;
}

export interface ItemsTypeList {
  index: string;
  title: string;
  href: string;
  icon?: string;
  children?: ItemsTypeList[];
  distance?: number;
}

export { default as anchorIndex } from './anchorIndex.vue';
