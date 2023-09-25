declare namespace Server {
  interface responseOK<T = null> {
    /**
     * HTTP 状态码
     */
    code: number;
    /**
     * HTTP 返回信息
     */
    msg: string;
    /**
     * HTTP 返回数据
     */
    data: T;
  }

  type responseCommonField = 'id' | 'createTime' | 'lastModifiedTime' | 'creatorName' | 'creatorNickName' | 'editorName' | 'editorNickName';
  type responseCommon = Record<responseCommonField, string>;
}
