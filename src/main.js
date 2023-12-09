import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ClockPlugin } from "@/plugins/clock";
import { SerializationPlugin} from "@/plugins/serialization";
import { ActionsPlugin } from "@/plugins/actions.js";

import { initializeActions } from './stores/actions/init'
import { loadGame, saveGame } from "@/routines/persistence.js";

const app = createApp(App)

const store = createPinia();
store.use(ClockPlugin)
store.use(SerializationPlugin)
store.use(ActionsPlugin)

app.use(store)
app.use(router)

initializeActions();

setTimeout(() => loadGame(), 500)
setInterval(() => saveGame(), 5000);

app.mount('#app')