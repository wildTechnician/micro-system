import { formatterModule } from '@packages/utils-common/utils';

const modules = import.meta.glob<{ default: MenuRoute.Route }>('./**/*.ts', { eager: true });

const root = [
  {
    path: '/',
    redirect: 'container',
  },
];

export default [...root, ...formatterModule<MenuRoute.Route>(modules)];
