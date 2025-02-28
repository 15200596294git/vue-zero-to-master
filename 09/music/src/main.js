// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VeeValidatePlugin from '@/includes/validation'

import App from './App.vue'
import router from './router'
import './includes/firebase'

import './assets/base.css'
import './assets/main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router) 
app.use(VeeValidatePlugin)

app.mount('#app')
