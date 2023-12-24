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
import { vButton } from "@/directives/button";

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
setInterval(() => saveGame(), 5000);

app.directive('button', vButton);

app.mount('#app')