import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { DiffPlugin } from "@/plugins/diff";
import { SerializationPlugin} from "@/plugins/serialization";
import { ActionsPlugin } from "@/plugins/actions.js";
import { ResetPlugin } from "@/plugins/reset.js";

import { initializeDynamicModules } from '@/stores/modules'
import { loadGame, saveGame } from "@/routines/persistence.js";
import { vHover } from "@/directives/hover";
import {vFormat} from "@/directives/format.js";

const app = createApp(App)

const store = createPinia();
store.use(DiffPlugin)
store.use(SerializationPlugin)
store.use(ActionsPlugin)
store.use(ResetPlugin)

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