import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/style.css' 
import App from './App.vue'

import router from '../router'
import { useUserStore } from './stores/userStore' 

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) 

const userStore = useUserStore()
userStore.initFromStorage()

app.use(router)

app.mount('#app')