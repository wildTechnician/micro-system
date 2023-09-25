declare namespace MenuRoute {
  /**
   * 菜单类型
   * - S:系统；
   * - M:目录；
   * - F:菜单；
   * - B:按钮
   */
  type MenuTypes = 'F' | 'M' | 'B' | 'S';

  interface RouteMeta {
    /**
     * 图标
     */
    icon: string;
    /**
     * 打开方式
     */
    target: boolean;
    /**
     * 标题
     */
    title: string;
    /**
     * 权限
     */
    requiresAuth?: boolean;
    /**
     * 导航类型
     */
    type: MenuTypes;
    /**
     * 缓存
     */
    cache: boolean;
    /**
     * 隐藏
     */
    hidden: boolean;
  }

  type Route = {
    /**
     * 子路由
     */
    children: MenuRoute.Route[];
    /**
     * 组件
     */
    component: string;
    /**
     * 路由表示
     */
    name: string;
    /**
     * 路径
     */
    path: string;

    meta: RouteMeta;
  } & Omit<import('vue-router').RouteRecordRaw, 'name' | 'path' | 'meta' | 'children' | 'component'>;

  type RouteModule = Record<string, { default: Route }>;
}
