import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ClockPlugin } from "@/plugins/clock.js";
import { SerializationPlugin } from "@/plugins/serialization.js";
import {useNervousStore} from "@/stores/body/nervous.js";

const app = createApp(App)

const store = createPinia();
store.use(ClockPlugin)
store.use(SerializationPlugin)

app.use(store)
app.use(router)

app.mount('#app')


const nervous = useNervousStore();