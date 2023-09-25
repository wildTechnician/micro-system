import { resolve } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
const glob = require('fast-glob');
import { format } from 'prettier';
import type { BuiltInParserName } from 'prettier';
import { pathComponents, svgPath } from './config';

const getSvgFile = async () => {
  return glob('*.svg', { cwd: svgPath, absolute: true });
};

const getName = (file: string) => {
  const filename: string[] | null = file.match(/[a-zA-Z_-]*\.svg/);

  if (!filename) return { filename: '', componentName: '' };

  const componentName = filename[0].replace(/-(\w){1}/g, function (str) {
    return str.substring(1).toUpperCase();
  });
  return { filename: filename[0].replace(/.svg$/, ''), componentName: componentName.replace(/.svg$/, '') };
};

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
  format(code, {
    parser,
    semi: false,
    singleQuote: true,
  });

const transformToVueComponent = async (file: string) => {
  const { filename, componentName } = getName(file);
  if (!filename || !componentName) return;

  let content = await readFile(file, 'utf-8');
  /**只针对iconPark SVG图标 */
  content = content.replace('<?xml version="1.0" encoding="UTF-8"?>', '');
  content = content.replace(/fill="#333"/g, 'fill="currentColor"');
  content = content.replace(/stroke="#333"/g, 'stroke="currentColor"');

  const vue = formatCode(
    `
  <template>
  ${content}
  </template>
  <script lang="ts">
  import type { DefineComponent } from 'vue'
  export default ({
    name: "${componentName}",
  }) as DefineComponent
  </script>`,
    'vue'
  );
  writeFile(resolve(pathComponents, `${filename}.vue`), vue, 'utf-8');
};

const generateEntry = async (files: string[]) => {
  const code = formatCode(
    files
      .map((file) => {
        const { filename, componentName } = getName(file);
        return `export { default as ${componentName} } from './${filename}.vue'`;
      })
      .join('\n')
  );

  await writeFile(resolve(pathComponents, 'index.ts'), code, 'utf-8');
};

/**creating */
getSvgFile().then((res) => {
  generateEntry(res);
  res.forEach((svg: string) => {
    transformToVueComponent(svg);
  });
});
