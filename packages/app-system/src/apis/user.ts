import { post, put, del } from '@packages/utils-common/service';

export type UserRequestType = {
  /**
   * 部门ID
   */
  deptId?: string;
  /**
   * 邮箱地址
   */
  email?: string;
  /**
   * 状态，true：启用；false：停用
   */
  enabled?: boolean;
  /**
   * 查询范围[结束时间]
   */
  endTime?: string;
  /**
   * 用户昵称
   */
  nickname?: string;
  /**
   * 页码
   */
  pageNo?: number;
  /**
   * 条数
   */
  pageSize?: number;
  /**
   * 手机号
   */
  phone?: string;
  /**
   * 角色ID
   */
  roleId?: string;
  /**
   * 查询范围[开始时间]
   */
  startTime?: string;
  /**
   * 用户账号
   */
  username?: string;
};

export type UserResponseType = {
  /**
   * 用户部门ID
   */
  deptId: string;
  /**
   * 用户部门名称
   */
  deptName: string;
  /**
   * 修改者账号
   */
  editorName: string;
  /**
   * 修改者昵称
   */
  editorNickName: string;
  /**
   * Email邮箱
   */
  email: string;
  /**
   * 用户状态
   */
  enabled: number;
  /**
   * 主键ID
   */
  id: string;
  /**
   * 用户昵称
   */
  nickname: string;
  /**
   * 手机号
   */
  phone: string;
  /**
   * 用户角色ID
   */
  roleId: string;
  /**
   * 岗位ID
   */
  posts: any[];
  postIds?: string[];
  /**
   * 用户角色名称
   */
  roleName: string;
  /**
   * 性别，数据字典类型：user_sex;字典值：M：男;G：女
   */
  sex: 'M' | 'G';
  /**
   * 用户账号
   */
  username: string;
};

export type UserOperateType = Omit<UserResponseType, Server.responseCommonField | 'deptName' | 'roleName'> & { userId?: string };

export const getUserList = (data: UserRequestType) => post<UserRequestType, UserResponseType>('/admin/user/page', data);
export const addUser = (data: UserOperateType) => post<UserOperateType, Server.responseOK>('/admin/user', data);
export const updateUser = (data: UserOperateType) => put<UserOperateType, Server.responseOK>('/admin/user', data);
export const delUser = (data: string[]) => del<string[], Server.responseOK>('/admin/user', data);
export const resetPass = (data: string) => post<{}, Server.responseOK>(`/admin/user/resetPwd?username=${data}`, {});
