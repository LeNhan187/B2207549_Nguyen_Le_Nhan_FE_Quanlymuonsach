<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File component này chứa Footer bao gồm trang Home, BookList, BookDetail, link facebook dẫn đến trang chủ của tôi.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->


<template>
  <footer class="relative bg-gray-900 text-slate-300 pt-16 pb-6">
    <div 
      class="absolute inset-0 bg-cover bg-center z-0" 
      style="background-image: url('https://images.unsplash.com/photo-1525307932909-fd14b501d8d3?w=1920&auto=format&fit=crop&q=80');"
    ></div>
    <div class="absolute inset-0 bg-gray-900 opacity-80 z-10"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="flex flex-col items-center md:items-start">
          <div class="flex items-center gap-3 mb-4">
            <img src="/favicon.ico" alt="Logo" class="h-10 w-10">
            <span class="font-bold text-white text-xl">Thư Viện Online</span>
          </div>
          <p class="text-center md:text-left text-slate-400">
            Nơi tri thức được chia sẻ và lan tỏa.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-white transition-colors">Trang chủ</router-link></li>
            <li><router-link to="/books" class="hover:text-white transition-colors">Tất cả sách</router-link></li>
            <li><router-link to="/auth/login" class="hover:text-white transition-colors">Đăng nhập</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Theo dõi chúng tôi</h3>
          <div class="flex space-x-4">
            <a href="https://www.facebook.com/hongphuocne" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
            </a>
            <a href="https://www.facebook.com/hongphuocne" class="text-slate-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
            </a>
          </div>
        </div>

      </div>

      <div class="mt-12 border-t border-slate-700"></div>

      <div class="mt-8 text-center text-sm text-slate-400">
        <p>&copy; {{ new Date().getFullYear() }} Thư Viện Online by Nguyễn Nhật Hồng Phước. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
</template>

