import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SettingsView from "@/views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:category?',
      component: HomeView
    },
    {
      path: '/settings',
      component: SettingsView
    },
    {
      path: '/dev',
      component: () => import('@/views/DevView.vue')
    },
  ]
})

export default router
