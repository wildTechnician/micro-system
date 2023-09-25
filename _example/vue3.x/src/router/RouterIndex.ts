import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';

// const { VITE_BASE_URL } = import.meta.env;

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/DashBoard.vue'),
      meta: {
        title: '首页',
        icon: '',
        name: 'Dashboard',
        requiresAuth: true,
      },
      name: 'Dashboard',
      children: [],
    },
  ],
});

export default router;
