import { post, put, del } from '@packages/utils-common/service';

export type DeptRequestType = {
  /**
   * 状态，true：启用；false：停用
   */
  enabled?: boolean;
  /**
   * 查询范围[结束时间]
   */
  endTime?: string;
  /**
   * 部门ID，可查询当前部门的下级树形结构数据
   */
  id?: string;
  /**
   * 部门名称
   */
  name?: string;
  /**
   * 查询范围[开始时间]
   */
  startTime?: string;
};

export type DeptResponseType = {
  id: string;
  /**
   * 部门状态，1：启用；0：停用
   */
  enabled: number;
  /**
   * 部门负责人
   */
  leader: string;
  /**
   * 负责人手机号
   */
  leaderPhone: string;
  /**
   * 部门名称
   */
  name: string;
  /**
   * 上级部门ID
   */
  parentId: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 部门中心点经度
   */
  longitude: number;
  /**
   * 部门中心点纬度
   */
  latitude: number;
  /**
   * 子部门
   */
  children: DeptResponseType[];
  /**
   * 层级
   */
  level?: number;
} & Server.responseCommon;

export type DeptOperateType = Omit<DeptResponseType, 'children' | 'longitude' | Server.responseCommonField | 'latitude'> & { deptId?: string };

export type DeptRangeType = {
  boundaryFileId: string;
  /**
   * 部门ID
   */
  deptId: string;
  /**
   * 部门中心点纬度
   */
  latitude: number;
  /**
   * 部门中心点经度
   */
  longitude: number;
};

export const getDeptList = (data: DeptRequestType) => post<DeptRequestType, DeptResponseType>('admin/dept/list', data);
export const addDept = (data: DeptOperateType) => post<DeptOperateType, Server.responseOK>('admin/dept', data);
export const updateDept = (data: DeptOperateType) => put<DeptOperateType, Server.responseOK>('admin/dept', data);
export const delDept = (data: string) => del<{}, Server.responseOK>(`admin/dept?deptId=${data}`, {});

export const deptRange = (data: DeptRangeType) => post<DeptRangeType, Server.responseOK>('/admin/dept/boundary', data);
