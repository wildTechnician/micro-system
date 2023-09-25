import { post, put, del, get } from '@packages/utils-common/service';

export type RoleRequestType = {
  /**
   * 状态
   */
  enabled?: boolean;
  /**
   * 查询范围[结束时间]
   */
  endTime?: string;
  /**
   * 角色名称
   */
  name?: string;
  /**
   * 页码
   */
  pageNo?: number;
  /**
   * 条数
   */
  pageSize?: number;
  /**
   * 查询范围[开始时间]
   */
  startTime?: string;
};

export type RoleResponseType = {
  /**
   * 角色名称
   */
  name: string;
  /**
   * 角色状态 1：启用；0：停用
   */
  enabled: number;
  /**
   * 备注
   */
  description: string;
} & Server.responseCommon;

export type RoleOperateType = Omit<RoleResponseType, 'id' | 'createTime' | 'lastModifiedTime' | 'creatorName' | 'creatorNickName' | 'editorName' | 'editorNickName'> & { roleId?: string };

export type RoleAccessType = {
  /**
   * APP权限身份，数据字典类型：role_app_auth
   */
  appAuth?: string;
  /**
   * 权限范围
   */
  dataRange: string;
  /**
   * 自定义部门列表（权限范围为自定义时传入才有效）
   */
  deptIds?: string[];
  /**
   * 首页菜单
   */
  homeMenuId?: string;
  /**
   * 菜单权限
   */
  menuIds: string[];
  /**
   * 角色ID
   */
  roleId: string;
};

export const getRoleList = (data: RoleRequestType) => post<RoleRequestType, RoleResponseType>('/admin/role/page', data);
export const addRole = (data: RoleOperateType) => post<RoleOperateType, Server.responseOK>('/admin/role', data);
export const updateRole = (data: RoleOperateType) => put<RoleOperateType, Server.responseOK>('/admin/role', data);
export const delRole = (data: string[]) => del<string[], Server.responseOK>('/admin/role', data);

export const getRoleAccess = (data: string) => post<{}, RoleAccessType>(`admin/role/getRolePer?roleId=${data}`, {}, { requestType: 'form' });
export const setRoleAccess = (data: RoleAccessType) => post<RoleAccessType, Server.responseOK>('admin/role/changePer', data);
export const getDefaultPass = () => get<{}, Server.responseOK>('/admin/user/defaultPwd', {});
