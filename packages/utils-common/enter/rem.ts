import { getWindows } from '../utils';
/**
 * 不同微应用框架取window对象方式不同
 */
const baseSize: number = 16;
const win = getWindows();
const remHandle = () => {
  const scale: number = win.document.documentElement.clientWidth / 1920;
  win.document.documentElement.style.fontSize = baseSize * scale + 'px';
};

export const setupRem = () => {
  remHandle();
  win.addEventListener('resize', remHandle);
};
export const disposeRem = () => win.removeEventListener('resize', remHandle);
