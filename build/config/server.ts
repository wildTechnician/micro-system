import { loadEnv } from 'vite';

import type { ServerOptions, ProxyOptions } from 'vite';

export function viteServer(port: number, mode: string, other: Record<string, string | ProxyOptions> = {}): ServerOptions {
  const serverName: string = `/${mode}`;
  const env = loadEnv(mode, process.cwd(), '');
  return {
    host: '0.0.0.0',
    port: port,
    cors: true,
    proxy: {
      [serverName]: {
        target: env.VITE_BASE_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(new RegExp(`${serverName}`), ''),
      },
      ...other,
    },
  };
}
