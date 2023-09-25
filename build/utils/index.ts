export function outFiles(name: string) {
  return {
    outDir: `../../dist/${name.replace('/', '_')}`,
  };
}
