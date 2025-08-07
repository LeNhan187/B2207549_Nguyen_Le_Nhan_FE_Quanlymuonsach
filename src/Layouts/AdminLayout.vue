<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleLogout = () => {
  dropdownOpen.value = false;
  userStore.logout();
  window.location.href = '/auth/login';
};

const onClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

onMounted(() => {
  // `initFromStorage` đã được gọi ở main.js nên không cần ở đây nữa
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="flex h-screen bg-slate-100 font-sans">
    <aside class="w-64 flex-shrink-0 bg-slate-800 text-slate-300 flex flex-col">
      <div class="h-16 flex items-center justify-center flex-shrink-0 px-4 border-b border-slate-700">
        <router-link to="/admin" class="flex items-center gap-3">
          <img src="/favicon.ico" alt="Logo" class="h-8 w-8">
          <span class="font-bold text-white text-lg">Admin Panel</span>
        </router-link>
      </div>
      
      <nav class="flex-grow p-4">
        <router-link 
          to="/admin/dashboard" 
          class="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
          active-class="bg-indigo-600 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          <span>Bảng điều khiển</span>
        </router-link>
        <router-link 
          to="/admin/manage-content" 
          class="flex items-center gap-3 mt-2 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
          active-class="bg-indigo-600 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          <span>Quản lý Nội dung</span>
        </router-link>
        <router-link 
          to="/admin/manage-users" 
          class="flex items-center gap-3 mt-2 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
          active-class="bg-indigo-600 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125a4 4 0 00-6.44-6.44m0 0l-1.06-1.06a4 4 0 00-5.657 5.657l1.06 1.06" /></svg>
          <span>Quản lý Người dùng</span>
        </router-link>
        <router-link 
          to="/admin/manage-borrow" 
          class="flex items-center gap-3 mt-2 px-3 py-2 rounded-md hover:bg-slate-700 transition-colors"
          active-class="bg-indigo-600 text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          <span>Quản lý Mượn/Trả</span>
        </router-link>
      </nav>
      
      <div class="p-4 mt-auto border-t border-slate-700">
        <router-link to="/" class="flex items-center gap-3 text-sm hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
          <span>Quay về trang chủ</span>
        </router-link>
      </div>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-16 flex-shrink-0 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <div>
          </div>
        <div class="relative" ref="dropdownRef">
          <button @click="toggleDropdown" class="flex items-center gap-2">
            <span class="font-semibold text-slate-700">{{ userStore.username }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-10 text-slate-700">
            <button @click="handleLogout" class="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-slate-100 text-red-500 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>
      </header>
      
      <main class="flex-1 overflow-y-auto">
        <div class="p-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>