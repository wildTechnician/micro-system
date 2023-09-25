import { outFiles } from '../utils';
import type { BuildOptions } from 'vite';
export function viteBuild(packageName: string): BuildOptions {
  return {
    cssCodeSplit: false,
    manifest: true,
    reportCompressedSize: false,
    ...outFiles(packageName),
  };
}
