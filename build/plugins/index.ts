import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import type { PluginOption } from 'vite';
export function vitePlugins(env: string): PluginOption[] {
  return [
    vue(),
    // esLint 错误直接在浏览器上显示
    eslint(),
    // API自动导入
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
      dts: 'src/typings/auto-imports.d.ts',
    }),
    // setup name
    VueSetupExtend(),
    // 组件按需加载
    Components({
      dts: 'src/typings/components.d.ts',
      dirs: ['./src/components', '../utils-common/components/*'],
      resolvers: [ElementPlusResolver({ importStyle: 'sass' })],
    }),
  ];
}
