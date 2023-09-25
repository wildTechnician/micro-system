/**
 * 菜单类型
 * S:系统 B:按钮 F:目录 M:菜单
 * */
export enum MenuType {
  SYSTEM = 'S',
  FOLDER = 'F',
  MENU = 'M',
  BUTTON = 'B',
}

export const switchMenu = {
  [MenuType.SYSTEM]: '系统',
  [MenuType.FOLDER]: '目录',
  [MenuType.MENU]: '菜单',
  [MenuType.BUTTON]: '按钮',
};
