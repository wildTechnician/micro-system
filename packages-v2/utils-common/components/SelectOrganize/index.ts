import { DefineComponent } from 'vue';

export { default as SelectOrganizeIndex } from './SelectOrganizeIndex.vue';

export type SelectOrganizeIndexProps = {
  url?: string;
  query?: { parentId: string } & Record<string, any>;
  method?: 'post' | 'get' | 'delete' | 'put';
  props?: {
    key: string;
    label: string;
  };
};

export type SelectOrganizeIndex = DefineComponent<SelectOrganizeIndexProps>;
