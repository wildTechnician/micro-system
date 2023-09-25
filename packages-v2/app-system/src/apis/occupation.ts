import { post, put, del } from '@packages/utils-common/service';

export type OccupationRequestType = {
  /**
   * 岗位状态
   */
  enabled?: boolean;
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 岗位名称
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
   * 开始时间
   */
  startTime?: string;
};

export type OccupationResponseType = {
  /**
   * 岗位状态，1：启用；0：停用
   */
  enabled: number;
  /**
   * 主键ID
   */
  id: string;
  /**
   * 最后一次修改时间
   */
  lastModifiedTime: string;
  /**
   * 岗位名称
   */
  name: string;
  /**
   * 排序
   */
  sort: number;
  /**
   * 描述
   */
  description: string;
} & Server.responseCommon;

export type OccupationOperateType = Omit<OccupationResponseType, Server.responseCommonField> & { postId?: string };

export const getOccupationList = (data: OccupationRequestType) => post<OccupationRequestType, OccupationResponseType>('/admin/post/page', data);
export const addOccupation = (data: OccupationOperateType) => post<OccupationOperateType, Server.responseOK>('/admin/post', data);
export const updateOccupation = (data: OccupationOperateType) => put<OccupationOperateType, Server.responseOK>('/admin/post', data);
export const delOccupation = (data: string[]) => del<{}, Server.responseOK>(`/admin/post`, data);
