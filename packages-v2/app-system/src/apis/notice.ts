import { post, put, del } from '@packages/utils-common/service';

export type NoticeRequestType = {
  /**
   * 查询范围[结束时间]
   */
  endTime?: string;
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
  /**
   * 公告标题
   */
  title?: string;
  /**
   * 公告类型ID
   */
  typeId?: string;
};

export type NoticeResponseType = {
  /**
   * 公告内容
   */
  content: string;
  /**
   * 发布时间，只有发布时间类型为指定时才传值
   */
  releaseTime: string;
  /**
   * 发布时间类型，数据字典类型：notice_release_type；
   * 字典项值：now:立即；designate:指定
   */
  releaseType: 'now' | 'designate';
  /**
   * 是否已发布，true:已发布，false:未发布
   */
  status: string;
  /**
   * 公告标题
   */
  title: string;
  /**
   * 公告类型ID
   */
  typeId: number;
  /**
   * 发布范围
   */
  scope: {
    /**
     * 部门ID
     */
    deptId: string;
    /**
     * 部门名称
     */
    deptName: string;
    /**
     * 用户ID
     */
    id: string;
    /**
     * 用户昵称
     */
    name: string;
  }[];
} & Server.responseCommon;

export type NoticeOperateType = Omit<NoticeResponseType, Server.responseCommonField>;

export const getNoticeList = (data: NoticeRequestType) => post<NoticeRequestType, NoticeResponseType>('/admin/notice/page', data);
export const addNotice = (data: NoticeOperateType) => post<NoticeOperateType, Server.responseOK>('/admin/notice', data);
export const updateNotice = (data: NoticeOperateType) => put<NoticeOperateType, Server.responseOK>('/admin/notice', data);
export const delNotice = (data: string[]) => del<string[], Server.responseOK>('/admin/notice', data);
