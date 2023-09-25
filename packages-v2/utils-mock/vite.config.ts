import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

export default ({ command, mode }: ConfigEnv) => {
  return defineConfig({
    plugins: [
      // mock数据模拟
      viteMockServe({
        mockPath: './src',
        // 开发开启，打包关闭
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve',
        supportTs: true,
      }),
    ],

    server: {
      port: 7700,
      cors: true,
      proxy: {
        '/mock': {
          target: '/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\\mock/, ''),
        },
      },
    },
  });
};
