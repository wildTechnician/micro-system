import { post, put, del } from '@packages/utils-common/service';

export type MenuRequestType = {
  enabled?: boolean;
  endTime?: string;
  startTime?: string;
  name?: string;
};

export type MenuResponseType = {
  /** 主键ID */
  id: string;
  createTime: string;
  // 创建时间
  lastModifiedTime: string;
  // 最后一次修改时间
  creatorName: string;
  // 创建者账号
  creatorNickName: string;
  // 创建者昵称
  editorName: string;
  // 修改者账号
  editorNickName: string;
  // 修改者昵称
  name: string;
  // 菜单名称
  routePath: string;
  // 菜单地址
  component: string;
  // 组件路径
  type: string;
  // 菜单类型
  btnPermission: string;
  // 按钮权限标识
  urlPermission: number;
  // 接口权限标识
  parentId: string;
  // 上级菜单ID
  sort: number;
  // 菜单排序
  target: boolean;
  // 是否打开新窗口
  enabled: number;
  // 菜单状态 0：停用；1：启用
  icon: string;
  // 菜单图标
  cache: boolean;
  // 是否缓存
  hidden: boolean;
  // 是否隐藏
  children: MenuResponseType[];
};

export type MenuOperateType = Omit<MenuResponseType, 'id' | 'createTime' | 'lastModifiedTime' | 'creatorName' | 'creatorNickName' | 'editorName' | 'editorNickName' | 'children'> & { id?: string };

export const getMenuList = (data: MenuRequestType) => post<MenuRequestType, MenuResponseType>('/admin/menu/list', data);
export const addMenu = (data: MenuOperateType) => post<MenuOperateType, Server.responseOK>('/admin/menu', data);
export const updateMenu = (data: MenuOperateType) => put<MenuOperateType, Server.responseOK>('/admin/menu', data);
export const delMenu = (data: string) => del<{}, Server.responseOK>(`/admin/menu?menuId=${data}`, {});
