import { resetUserInfo } from '../config';

export type PropsType = {
  // 父应用跳转具柄
  jumpTo: (path: string) => void;
  // 当前子系统路由
  currentRouter: MenuRoute.Route[];
  // 当前用户权限
  Auth: any;
  // 当前用户信息
  user: Auth.userInfo;
};

export const props: PropsType = {
  jumpTo: () => {},
  currentRouter: [],
  Auth: {},
  user: resetUserInfo(),
};
