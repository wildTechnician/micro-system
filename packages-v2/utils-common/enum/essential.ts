/**
 * 储存别名
 */
export enum Essential {
  // 请求token
  TOKEN = '_F',
  // 刷新token
  REFRESH_TOKEN = '_R',
  /**
   * 当前子系统域名
   * 当页面重新刷新时，自动恢复当前系统
   */
  CURRENT_SYSTEM_HOST = '_CH',
}
