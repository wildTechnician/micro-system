/**
 * 动态引入静态资源
 * @param dir
 * @returns
 */
export function getStatic(dir: string): Function {
  return function returnFile(fileName: string): string {
    return new URL(dir + fileName, import.meta.url).href;
  };
}
