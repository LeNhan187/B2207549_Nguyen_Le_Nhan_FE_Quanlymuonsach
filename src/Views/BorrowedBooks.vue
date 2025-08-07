<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File lịch xử mượn sách của người dùng.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<template>
  <div class="max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fade-in-up">
    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center relative">
      <span class="relative z-10">Sách Đã Mượn</span>
      <span class="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full z-0"></span>
    </h1>
    <p class="text-lg text-gray-600 text-center mb-10">Theo dõi lịch sử và trạng thái mượn sách của bạn.</p>

    <div v-if="borrows.length === 0" class="text-gray-500 italic text-center py-10">
      <p class="text-xl mb-4">Bạn chưa mượn cuốn sách nào từ thư viện của chúng tôi.</p>
      <p class="text-gray-600">Hãy ghé thăm <router-link to="/books" class="text-gray-800 font-semibold hover:underline">Thư viện sách</router-link> để bắt đầu khám phá!</p>
    </div>

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
      <li
        v-for="item in borrows"
        :key="item._id"
        class="bg-white rounded-xl shadow-lg border border-gray-100 p-5 flex gap-5 
               transform transition-all duration-300 hover:scale-[1.005] hover:shadow-xl hover:border-gray-200"
      >
        <div class="flex-shrink-0">
          <img
            :src="item.bookId?.hinhAnh || defaultImg"
            :alt="`Bìa sách ${item.bookId?.tenSach || 'N/A'}`"
            class="w-28 h-36 object-cover rounded-md shadow-md"
          />
        </div>

        <div class="flex-1 flex flex-col justify-between">
          <div>
            <h3 class="text-xl font-extrabold text-gray-900 mb-1 line-clamp-2">{{ item.bookId?.tenSach || 'Sách không tồn tại' }}</h3>
            <p class="text-sm text-gray-600 mb-0.5">Mã sách: <span class="font-mono text-gray-700">{{ item.bookId?.maSach || 'N/A' }}</span></p>
            <p class="text-sm text-gray-700 mb-0.5">Tác giả: <span class="font-medium">{{ item.bookId?.tacGia || 'N/A' }}</span></p>
            <p class="text-sm text-gray-700 mb-0.5">Ngày mượn: <span class="font-medium">{{ formatDate(item.ngayMuon) }}</span></p>
            <p v-if="item.ngayTra" class="text-sm text-gray-700">Ngày trả dự kiến: <span class="font-medium">{{ formatDate(item.ngayTra) }}</span></p>
            <p v-if="item.ngayThucTra && item.status === 'Đã trả'" class="text-sm text-gray-700">Ngày trả thực tế: <span class="font-medium">{{ formatDate(item.ngayThucTra) }}</span></p>
          </div>

          <div class="mt-3">
            <span 
              :class="getHanStatusInfo(item).class" 
              class="inline-flex items-center px-3 py-1.5 rounded-full font-semibold text-xs md:text-sm tracking-wide"
            >
              <template v-if="getHanStatusInfo(item).icon">
                <svg :class="getHanStatusInfo(item).iconColor" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="getHanStatusInfo(item).icon" />
                </svg>
              </template>
              {{ getHanStatusInfo(item).text }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiClient from '../services/apiService'
const defaultImg = 'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
const borrows = ref([])
const userId = localStorage.getItem('userId') 

async function fetchBorrows() {
  try {
    const res = await apiClient.get(`/borrows/me/${userId}`)
    borrows.value = res.data
  } catch (err) {
    console.error('Lỗi khi lấy lịch sử mượn:', err)
  }
}

onMounted(fetchBorrows)

function formatDate(dateStr) {
  if (!dateStr) return 'N/A'; 
  const date = new Date(dateStr)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function getHanStatusInfo(item) {
  if (item.status === 'Đã trả') {
    const returnDateText = item.ngayThucTra ? ` ngày ${formatDate(item.ngayThucTra)}` : '';
    return { text: `Đã trả${returnDateText}`, class: 'bg-green-100 text-green-800', icon: 'M5 13l4 4L19 7', iconColor: 'text-green-600' };
  }
  
  if (item.status === 'Đang chờ duyệt') {
    return { text: 'Đang chờ duyệt', class: 'bg-blue-100 text-blue-800', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', iconColor: 'text-blue-600' };
  }

  if (!item.ngayTra) {
      return { text: 'Chưa có hạn trả', class: 'bg-gray-100 text-gray-600', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', iconColor: 'text-gray-500' };
  }
  
  const today = new Date();
  const traDate = new Date(item.ngayTra);
  today.setHours(0, 0, 0, 0);
  traDate.setHours(0, 0, 0, 0);

  const diffTime = traDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
      return { text: 'Quá hạn trả', class: 'bg-red-100 text-red-800', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', iconColor: 'text-red-600' };
  }
  if (diffDays <= 3) {
      return { text: `Sắp hết hạn (${diffDays} ngày)`, class: 'bg-yellow-100 text-yellow-800', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', iconColor: 'text-yellow-600' };
  }
  return { text: `Còn ${diffDays} ngày`, class: 'bg-gray-100 text-gray-800', icon: 'M8 7V3m8 4V3m-9 8h4m-4 4h4m6-4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1m-3 7H6a2 2 0 00-2 2v1a2 2 0 002 2h4a2 2 0 002-2v-1a2 2 0 00-2-2z', iconColor: 'text-gray-600' };
}
</script>