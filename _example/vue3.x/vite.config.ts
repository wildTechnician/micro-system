import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import { resolve } from 'path';
import { vitePlugins } from '../../build/';

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');
  const serverName: string = `/${mode}`;

  return defineConfig({
    plugins: [...vitePlugins()],
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
    server: {
      port: 7792,
      cors: true,
      host: '0.0.0.0',
      proxy: {
        [serverName]: {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`/^\${serverName}/`), ''),
        },
      },
    },
  });
};
