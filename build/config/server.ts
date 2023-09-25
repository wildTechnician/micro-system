import type { ServerOptions } from 'vite';

export function viteServer(port: number, mode: string, url: string): ServerOptions {
  const serverName: string = `/${mode}`;
  return {
    host: '0.0.0.0',
    port: port,
    cors: true,
    proxy: {
      [serverName]: {
        target: url,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`${serverName}`), ''),
      },
    },
  };
}
