import { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { MenuType } from '../enum/index';

export type RouterType = RouteRecordRaw & {
  meta: {
    icon: string;
    target: boolean;
    title: string;
    preset?: boolean;
    requiresAuth?: boolean;
    type: MenuType;
  };
  component?: string | Component;
  children?: RouterType[];
};

export type RouteModule<T = RouterType> = Record<string, () => Promise<T>>;
