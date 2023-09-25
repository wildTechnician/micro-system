import { post } from '../service';

export type FileUploadRequestType = {
  /**
   * 上传的文件
   */
  file: File;
  /**
   * 1：业务附件
   * 0：系统头像，图标等等;1:存储业务目录；0:存储在系统目录
   */
  isAttachment: number;

  /**
   * 是否数据库持久化
   * 1：DB+文件存储服务器，0：文件存储服务器
   */
  isDb: number;
  /**
   * 资源服务
   * （只有当isAttachment为true时为必填项，代表该附件来自那个微服务，由前端人员定义值，方便查询附件时根据此字段进行过滤）
   */
  resourceService?: string;

  /**
   * 资源路径
   * （只有当isAttachment为true时为必填项，代表该附件来自微服务下的具体路径，由前端人员定义,方便查询附件时根据此字段进行过滤）
   */
  resourceUrl?: string;
};

export type FileUploadResponseType = {
  id: string;
  /**
   * 封面地址，只有上传视频文件才会生成
   */
  coverPath: string;
  /**
   * 附件Group
   */
  fileGroup: string;
  /**
   * 文件地址，相对地址
   */
  fileUrl: string;
  /**
   * 文件名称，随机生成的文件名称，也是存储在文件服务器上的名称
   */
  name: string;
  /**
   * 资源ID，业务ID主键
   */
  resourceId: string;
  /**
   * 资源服务，只有当附件为业务附件时才会回传该值
   */
  resourceService: string;
  /**
   * 资源路径，只有当附件为业务附件时才会回传该值
   */
  resourceUrl: string;
  /**
   * 文件大小（byte）
   */
  size: string;
};

export type SearchFileRequestType = {
  /**
   * 附件Group
   */
  fileGroup: string;
  /**
   * 文件地址，相对地址
   */
  fileUrl: string;
  /**
   * 主键ID
   */
  id: string;
  /**
   * 文件名称，随机生成的文件名称，也是存储在文件服务器上的名称
   */
  name: string;
  /**
   * 资源ID，业务ID主键
   */
  resourceId: string;
  /**
   * 资源服务，只有当附件为业务附件时才会回传该值
   */
  resourceService: string;
  /**
   * 资源路径，只有当附件为业务附件时才会回传该值
   */
  resourceUrl: string;
  /**
   * 文件大小（byte）
   */
  size: string;
} & Server.responseCommon;

export const fileUpload = (data: FileUploadRequestType) => post<FileUploadRequestType, FileUploadResponseType>('/file/upload', data, { requestType: 'file' });

export const searchFile = (data: string) => post<{}, SearchFileRequestType[]>(`/file/findFileByResourceId?resourceId=${data}`, {});
