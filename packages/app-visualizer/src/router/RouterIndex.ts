import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: () => import('@/pages/DashBoard.vue'),
      meta: {
        name: 'Dashboard',
        requiresAuth: true,
        title: '首页',
        icon: '',
      },
      children: [],
    },
  ],
});

export default router;
