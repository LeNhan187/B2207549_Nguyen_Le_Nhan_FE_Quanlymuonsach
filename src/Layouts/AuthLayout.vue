<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File layout trang đăng nhập và đăng ký.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
    
    <div class="relative z-10 flex flex-col lg:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full">

      <div class="relative lg:w-1/2 min-h-[300px] lg:min-h-[600px] bg-cover bg-center transition-all duration-500 transform hover:scale-105"
           :style="{ backgroundImage: 'url(\'https://images.unsplash.com/photo-1651519548696-8853b7b85af9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D\')' }">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
        <div class="absolute inset-0 flex flex-col items-center justify-center p-8 text-white text-center">
          <h2 class="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            Khám phá <br>Thế giới Tri Thức
          </h2>
          <p class="text-lg sm:text-xl font-light opacity-90 drop-shadow-md">
            Học hỏi, kết nối, và phát triển không ngừng.
          </p>
        </div>
      </div>

      <div class="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-white">
        
        <div class="mb-8 text-center">
          <router-link to="/" class="font-extrabold text-4xl sm:text-5xl tracking-tight text-gray-900 hover:text-gray-700 transition-colors duration-200">
            THƯ VIỆN TRỰC TUYẾN
          </router-link>
          </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  // Không cần import gì nếu chỉ dùng router-view
</script>

<style scoped>
/* Tailwind CSS được sử dụng trực tiếp trong template.
   Nếu bạn muốn thêm các tùy chỉnh CSS rất cụ thể không thể làm bằng Tailwind,
   thì có thể thêm vào đây, nhưng mục tiêu là tối thiểu hóa. */
</style>