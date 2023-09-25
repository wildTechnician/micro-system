import { formatterModule } from '../../utils';
import type { RouteRecordRaw } from 'vue-router';

const modules = import.meta.glob<{ default: RouteRecordRaw }>('./**/*.ts', { eager: true });

export const routes = [...formatterModule<RouteRecordRaw>(modules)];
