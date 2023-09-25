declare namespace Auth {
  interface userInfo {
    /**
     * 用户部门名称
     */
    deptName: string;
    /**
     * Email邮箱
     */
    email: string;
    /**
     * 用户状态
     */
    enabled: number;
    /**
     * 部门负责人
     */
    leader: string;
    /**
     * 部门负责人手机号
     */
    leaderPhone: string;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 手机号
     */
    phone: string;
    /**
     * 用户角色名称
     */
    roleName: string;
    /**
     * 性别，数据字典类型：user_sex;字典值：M：男;G：女
     */
    sex: 'G' | 'M';
    /**
     * 用户账号
     */
    username: string;
  }
}
