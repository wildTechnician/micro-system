declare module '*.json';
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_HTTP_PROXY?: 'Y' | 'N';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'element-plus/dist/locale/zh-cn.mjs';
