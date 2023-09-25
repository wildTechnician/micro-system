import { parseTypes } from '../utils';
import { getIcon } from '@packages/utils-icon/src/get';
import { Component } from 'vue';

export function useIcon(name: string | string[] = ''): Component[] {
  const nameList: string[] = parseTypes(name, 'string') ? (new Array(name) as string[]) : (name as string[]);
  const iconList: Component[] = [];
  nameList.map((item: string) => {
    iconList.push(getIcon(item));
  });

  return iconList;
}
