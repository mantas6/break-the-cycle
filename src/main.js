import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { initializeDynamicModules } from '@/stores/modules'
import { loadGame, saveGame } from "@/routines/persistence.js";
import { vHover } from "@/directives/hover";
import {vFormat} from "@/directives/format.js";
import {setupPlugins} from "@/hooks.js";

const app = createApp(App)

const store = createPinia();
setupPlugins(store);

app.use(store)
app.use(router)

initializeDynamicModules();

setTimeout(() => loadGame(), 500)

const devSaveInterval = 5_000;
const prodSaveInterval = 60_000;
setInterval(() => saveGame(), import.meta.env.PROD ? prodSaveInterval : devSaveInterval);

app.directive('hover', vHover);
app.directive('format', vFormat);

app.mount('#app')