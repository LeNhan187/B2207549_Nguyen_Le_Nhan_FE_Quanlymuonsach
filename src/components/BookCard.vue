<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File component này chứa thẻ chi tiết một quyển sách.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->


<template>
  <div class="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden flex flex-col min-h-[400px]
              transform transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl hover:border-gray-200">
    
    <img
      :src="book.hinhAnh || defaultImg"
      :alt="`Bìa sách ${book.tenSach}`"
      class="w-full h-56 object-cover mb-4 rounded-t-xl" 
    />

    <div class="p-4 flex flex-col flex-grow">
      <h3 class="font-bold text-lg md:text-xl text-gray-900 mb-2 line-clamp-2 leading-snug">
        {{ book.tenSach }}
      </h3>

      <p class="text-sm text-gray-700 mb-1">
        Tác giả: <span class="font-medium">{{ book.tacGia }}</span>
      </p>
      <p class="text-sm text-gray-800 font-semibold mb-3">
        Giá: {{ book.donGia ? book.donGia.toLocaleString() + '₫' : 'Chưa cập nhật' }}
      </p>
      <router-link
        :to="`/books/masach/${book.maSach}`"
        class="mt-auto inline-flex items-center justify-center 
               px-6 py-3.5 bg-gray-800 text-white rounded-lg font-semibold text-base 
               hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
        Xem chi tiết 
        <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const defaultImg = 'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';
defineProps({
  book: Object
});
</script>
