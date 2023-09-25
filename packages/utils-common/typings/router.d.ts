import 'vue-router';
import { MenuType } from '../enum/menuType';

declare module 'vue-router' {
  export type RouteMeta = MenuRoute.RouteMeta;
}
