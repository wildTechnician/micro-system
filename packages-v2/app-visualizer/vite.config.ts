import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import { resolve } from 'path';
import { vitePlugins, viteBuild, viteServer } from '../../build/';
import { name } from './package.json';

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    plugins: vitePlugins(mode),
    css: {
      postcss: resolve(__dirname, '../../', 'postcss.config.js'),
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@packages/utils-common/styles/theme.scss" as *;
          @use "@packages/utils-common/styles/init.scss";
          @use "@packages/utils-common/styles/variable.scss" as *;
          @use "@packages/utils-common/styles/mixin.scss" as *;
          `,
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, 'src'),
      },
    },
    build: viteBuild(name),
    server: viteServer(7788, mode, env.VITE_BASE_URL),
  });
};
