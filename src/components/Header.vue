<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File component này chứa Header bao gồm trang Home, BookList, BookDetail.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->

<template>
  <header class="sticky top-0 z-50 w-full bg-gray-900/90 backdrop-blur-md shadow-lg text-slate-200 border-b border-gray-700 animate-fade-in-down-header">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <router-link to="/" class="flex-shrink-0 group">
          <div class="flex items-center gap-3">
            <img src="/favicon.ico" alt="Logo Thư Viện Online" class="h-9 w-9 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <span class="font-extrabold text-2xl tracking-wider text-white relative
                         transition-colors duration-300 hover:text-gray-300 text-glow">
              Thư Viện Online
            </span>
          </div>
        </router-link>

        <nav class="hidden md:flex items-center gap-8">
          <router-link to="/" class="font-semibold relative nav-link hover:text-white transition-colors duration-300">Trang chủ</router-link>
          <router-link to="/books" class="font-semibold relative nav-link hover:text-white transition-colors duration-300">Sách</router-link>

          <template v-if="user.isLoggedIn">
            <div class="relative" ref="dropdownRef">
              <button @click="toggleDropdown" class="flex items-center gap-2 font-semibold text-white
                                                    hover:text-gray-300 transition-colors duration-300 
                                                    px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600">
                <span>{{ user.username }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-4 h-4 transition-transform duration-200" 
                     :class="{ 'rotate-180': dropdownOpen }" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                   <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <transition
                enter-active-class="transition ease-out duration-100 transform"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75 transform"
                leave-from-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
              >
                <div v-if="dropdownOpen" class="absolute right-0 mt-2 bg-gray-800 border border-gray-700 shadow-xl rounded-lg py-2 w-56 z-10 text-slate-200 overflow-hidden">
                  <router-link
                    v-if="user.role === 'admin'"
                    to="/admin"
                    @click="dropdownOpen = false"
                    class="flex items-center gap-3 px-4 py-2 font-semibold text-white hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Trang quản lý</span>
                  </router-link>

                  <router-link to="/borrowed" @click="dropdownOpen = false" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 hover:text-white transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <span>Sách đã mượn</span>
                  </router-link>
                  
                  <button @click="handleLogout" class="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </transition>
            </div>
          </template>

          <template v-else>
            <router-link 
              to="/auth/login" 
              class="font-medium bg-gray-700 px-5 py-2 rounded-full hover:bg-gray-600 transition-all duration-300 shadow-lg 
                     hover:shadow-xl transform hover:-translate-y-0.5 relative overflow-hidden group">
              <span class="relative z-10 text-white">Đăng nhập</span>
              <span class="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </router-link>
          </template>
        </nav>

        </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

const user = useUserStore()
const router = useRouter()

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLogout = () => {
  user.logout()
  dropdownOpen.value = false
  // Dùng window.location để đảm bảo trang thái được reset hoàn toàn
  window.location.href = '/auth/login';
}

// Khởi tạo lại khi reload trang
onMounted(() => {
  user.initFromStorage?.()
})

// Xử lý click ra ngoài để đóng dropdown
const onClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style>
@keyframes fadeInDownHeader {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down-header {
  animation: fadeInDownHeader 0.6s ease-out forwards;
}


.text-glow {
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.4), 0 0 10px rgba(255, 255, 255, 0.2);
}


.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ffffff; 
  transition: width 0.3s ease-out;
}

.nav-link:hover::after {
  width: 100%;
}
</style>