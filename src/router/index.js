import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SettingsView from "@/views/SettingsView.vue";
import {startsWith} from "lodash";
import {useTimeStore} from "@/stores/time.js";

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
      path: '/settings/debug',
      component: () => import('@/views/DebugView.vue')
    },
  ]
})

router.afterEach(({ path }) => {
  const time = useTimeStore();

  time.pause = startsWith(path, '/settings');
});

export default router
