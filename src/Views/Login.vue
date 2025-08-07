<template>
  <form @submit.prevent="handleLogin" class="space-y-6">
    <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-8">
      Đăng nhập tài khoản
    </h2>

    <div>
      <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
        Email đăng nhập
      </label>
      <div class="relative">
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="email"
          required
          placeholder="Ví dụ: ban@example.com"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm"
        />
        <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
        </svg>
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
        Mật khẩu
      </label>
      <div class="relative">
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Mật khẩu của bạn"
          class="peer w-full border border-gray-300 rounded-xl px-5 py-3 text-gray-800 placeholder-gray-400 
                 focus:outline-none focus:ring-3 focus:ring-indigo-300 focus:border-transparent 
                 transition-all duration-300 ease-in-out shadow-sm"
        />
        <svg class="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 peer-focus:text-indigo-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2v5a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h6zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
    </div>

    <button
      type="submit"
      class="w-full bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg 
             hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 
             transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
    >
      Đăng nhập
    </button>
    
    <p v-if="error" class="text-red-600 text-center font-medium mt-4 flex items-center justify-center">
        <svg class="h-5 w-5 mr-1 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {{ error }}
    </p>

    <p class="text-center text-sm text-gray-600 mt-6">
      Chưa có tài khoản?
      <router-link to="/auth/register" class="text-indigo-600 font-semibold hover:underline hover:text-indigo-800 transition-colors duration-200">
        Đăng ký tài khoản mới
      </router-link>
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import apiClient from '../services/apiService'
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  try {
    const res = await apiClient.post('/account/login', {
      email: email.value,
      password: password.value
    });

    // Gọi store để lưu toàn bộ thông tin
    userStore.login(res.data);
    
    // Kiểm tra vai trò và chuyển hướng an toàn
    if (res.data.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 404)) {
      error.value = err.response.data.message || 'Email hoặc mật khẩu không chính xác.';
    } else {
      error.value = 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
      console.error('Lỗi đăng nhập không xác định:', err);
    }
  }
};
</script>