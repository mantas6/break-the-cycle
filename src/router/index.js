import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:category?',
      component: HomeView
    },
    {
      path: '/settings',
      component: () => import('@/views/SettingsView.vue')
    },
    {
      path: '/dev',
      component: () => import('@/views/DevView.vue')
    },
  ]
})

export default router
