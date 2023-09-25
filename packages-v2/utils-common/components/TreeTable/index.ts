import type { ShallowRef } from 'vue';

export interface ColumnType {
  field?: string;
  label: string;
  type?: string;
  columnKey?: string;
  sortable?: boolean | string;
  tooltip?: boolean;
  fixed?: boolean | string;
  align?: string;
  width?: string | number;
  slot?: string;
}

export interface TreeTable {
  data: any[];
  column: ColumnType[];
  selection?: (row: any, index: number) => boolean;
}

export interface TreeTableCard {
  table: TableParam;
  column: ColumnType[];
  title: string;
  data?: any[];
  selection?: (row: any, index: number) => boolean;
}

export interface TableParam {
  loading: ShallowRef<boolean>;
  error: ShallowRef<string | undefined>;
  data: any;
  pagination: PaginationType;
  doRequest: (...args: any[]) => Promise<any>;
}

export interface PaginationType {
  current: number;
  pageSize: number;
  show?: boolean;
  total?: number;
  props?: {
    currentKey?: string;
    pageSizeKey?: string;
    totalKey?: string;
  };
}

export type ParamType<T, R> = {
  api: string;
  pagination: PaginationType;
  requestData?: T;
  method?: 'post' | 'get' | 'put' | 'delete';
  autoRequest?: boolean;
  onSuccess?: (...arg: R[]) => void;
  onError?: (...arg: any[]) => void;
  httpRequest?: ((...args: T[]) => Promise<R>) | Promise<R>;
};

export * from './useTable';
export { default as TreeTableCard } from './treeTableCard.vue';
export { default as TreeTable } from './TreeTable.vue';
