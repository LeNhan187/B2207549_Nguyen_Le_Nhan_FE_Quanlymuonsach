// <!-- /**
//  * ---------------------------------------------------------------------------------------------
//  * Tên dự án: Website Quản lý Thư viện Trực tuyến
//  * ---------------------------------------------------------------------------------------------
//  * Mô tả: File khai báo và sử dụng.
//  *
//  * @author  Nguyễn Nhật Hồng Phước
//  * @mssv    B2308385
//  * @date    27/07/2025
//  *
//  * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
//  * ---------------------------------------------------------------------------------------------
//  */ -->
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