function isLength(value: unknown) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
}

/**
 * 类数组判断
 * @param value
 * @returns
 */
export function isArrayLike(value: unknown) {
  return value != null && isLength((value as any).length) && !parseTypes(value, 'function');
}

/**
 * 判断类型
 * @param obj
 * @param type
 * @returns
 */
export function parseTypes(obj: unknown, type: string) {
  return Object.prototype.toString.call(obj) === `[object ${type.charAt(0).toUpperCase() + type.slice(1)}]`;
}

/**
 * 判断是否为空
 * @param value
 * @returns
 */
export function isEmpty(value: unknown) {
  if (value == null || value == undefined) {
    return true;
  }
  if (isArrayLike(value)) {
    return !(value as string | Array<unknown>).length;
  } else if (parseTypes(value, 'object')) {
    for (let key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  // 数字不可能为空
  return false;
}

/**
 * Generates a random integer between the specified lower and upper bounds (inclusive).
 *
 * @param {number} lower - The lower bound of the range.
 * @param {number} upper - The upper bound of the range.
 * @return {number} A random integer between the specified lower and upper bounds (inclusive).
 */
export function getRandomRangNum(lower: number, upper: number): number {
  return Math.floor(Math.random() * (upper - lower) + lower);
}

/**
 * Generates a random hexadecimal color code.
 *
 * @return {string} The generated color code in the format #xxxxxx.
 */
export function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

/**
 * 格式化url地址
 * @param url
 * @returns
 */
export const formatterUrl = (url: string, context?: Window): string => {
  const win = context || getWindows();
  const hostMap: Record<string, string> = {
    'https://': '//',
    'http://': '//',
    localhost: win.location.hostname,
  };
  const regStr: string =
    '(' +
    Object.keys(hostMap)
      .map((it) => '\\' + it)
      .join('|') +
    ')';
  const reg = new RegExp(regStr, 'g');
  return url && url.replace(reg, (it: string) => hostMap[it]);
};

export const getPort = (url: string): string | number | null => {
  const res = url.match(/:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/g);
  return res && res[0].substr(1);
};

/**
 * 获取当前window对象
 * @returns
 */
export const getWindows = (): Window => (window.__WUJIE_RAW_WINDOW__ ? window.__WUJIE_RAW_WINDOW__ : window);
/**获取顶层对象 */
export const getSuperWindows = () => window.top as Window;

/**
 * 是否在微服务的情况下
 * @returns bool
 */
export const isMonorepo: boolean = !!getWindows().__POWERED_BY_WUJIE__;

export function formatterModule<T>(modules: Record<string, { default: T }>): T[] {
  const modulesList: T[] = [];
  Object.keys(modules).map((item) => {
    const component = modules[item].default;
    if (component) {
      modulesList.push(component);
    } else {
      throw new Error(`模块${item}解析错误`);
    }
  });
  return modulesList;
}
