import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { ClockPlugin } from "@/plugins/clock.js";
import {useTimeStore} from "@/stores/time.js";

const app = createApp(App)

const store = createPinia();
store.use(ClockPlugin)

app.use(store)
app.use(router)

app.mount('#app')

const time = useTimeStore();