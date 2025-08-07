<template>
  <div class="max-w-5xl mx-auto px-4 py-8 md:py-12 animate-fade-in-up">
    <button 
      @click="$router.back()" 
      class="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-8 
             font-medium group"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2 transform transition-transform duration-200 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span class="border-b border-transparent group-hover:border-gray-700 transition-colors">Quay lại</span>
    </button>

    <div v-if="isLoading" class="text-center text-gray-500 py-10">
      <p class="text-lg">Đang tải thông tin sách...</p>
      </div>
    
    <div v-else-if="book?._id" class="flex flex-col md:flex-row gap-8 lg:gap-12 bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-8">
      
      <div class="flex-shrink-0 flex justify-center md:justify-start">
        <img
          :src="book.hinhAnh || defaultImg"
          :alt="`Bìa sách ${book.tenSach}`"
          class="w-64 h-96 object-cover rounded-lg shadow-lg border border-gray-200"
        />
      </div>

      <div class="flex-1 flex flex-col pt-4 md:pt-0">
        <div>
          <h1 class="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{{ book.tenSach }}</h1>
          <p class="text-gray-600 text-sm mb-1">Mã sách: <span class="font-mono text-gray-700">{{ book.maSach }}</span></p>
          <p class="text-gray-700 mt-1 mb-1">Tác giả: <span class="font-semibold">{{ book.tacGia }}</span></p>
          <p class="text-gray-700 mt-1 mb-4">
            NXB: <span class="font-medium">{{ book.maNXB?.tenNXB || 'Chưa rõ' }}</span> (Năm: <span class="font-medium">{{ book.namXuatBan }}</span>)
          </p>
          
          <div class="flex items-baseline gap-2 text-2xl text-green-700 font-bold mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V3m0 9v3m0-3c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ book.donGia?.toLocaleString() }}₫</span>
          </div>

          <p class="text-gray-600 mt-4 text-sm">
            Số quyển còn: <span class="font-bold" :class="{ 'text-red-500': book.soQuyen <= 5, 'text-green-600': book.soQuyen > 5 }">{{ book.soQuyen }}</span>
          </p>
        </div>

        <div class="mt-auto pt-6 border-t border-gray-100">
            <button
              @click="handleBorrowBook"
              :disabled="isBorrowing || book.soQuyen <= 0"
              class="w-full text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              :class="{
                'bg-gray-800 hover:bg-gray-700': book.soQuyen > 0,
                'bg-gray-400 text-gray-700 cursor-not-allowed': book.soQuyen <= 0,
                'opacity-75 cursor-wait': isBorrowing
              }"
            >
              <span v-if="isBorrowing">
                <svg class="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Đang xử lý...
              </span>
              <span v-else-if="book.soQuyen > 0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Yêu cầu mượn sách
              </span>
              <span v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Đã hết sách
              </span>
            </button>
        </div>
      </div>
    </div>
    
    <div v-else class="text-center text-red-500 py-10">
      <p class="text-lg">Không thể tải thông tin sách. Vui lòng thử lại sau.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import apiClient from '../services/apiService'
import { useUserStore } from '../stores/userStore';

// --- KHỞI TẠO ---
const defaultImg = 'https://th.bing.com/th/id/OIP.10sq7MYhXknhpLcEvDY11QHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3';
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const book = ref({});
const isLoading = ref(true);
const isBorrowing = ref(false);

// --- LẤY DỮ LIỆU SÁCH ---
onMounted(async () => {
  const maSach = route.params.maSach;
  try {
    const res = await apiClient.get(`/books/masach/${maSach}`);
    book.value = res.data;
  } catch (err) {
    console.error('Lỗi khi lấy chi tiết sách:', err);
  } finally {
    isLoading.value = false;
  }
});

// --- HÀM MƯỢN SÁCH ĐÃ SỬA LẠI HOÀN CHỈNH ---
async function handleBorrowBook() {
  // 1. Kiểm tra đăng nhập
  if (!userStore.isLoggedIn) {
    alert('Bạn cần đăng nhập để mượn sách.');
    router.push({ name: 'Login' });
    return;
  }
  
  // 2. Kiểm tra sách còn không
  if (book.value.soQuyen <= 0) {
      alert('Sách này đã hết, không thể mượn.');
      return;
  }

  isBorrowing.value = true;
  
  try {
    // 3. Chuẩn bị payload đúng cho API
    const borrowerId = userStore.userId;
    const onModel = userStore.role === 'admin' ? 'Staff' : 'User';
    const bookId = book.value._id;
    const ngayTra = new Date();
    ngayTra.setDate(ngayTra.getDate() + 7);

    // 4. Gọi API
    await apiClient.post('/borrows', {
      borrowerId,
      onModel,
      bookId,
      ngayTra: ngayTra.toISOString()
    });

    alert(`Yêu cầu mượn sách "${book.value.tenSach}" thành công!\nHạn trả: ${ngayTra.toLocaleDateString('vi-VN')}`);
    
    // 5. Cập nhật giao diện ngay lập tức
    book.value.soQuyen--; 

  } catch (err) {
    console.error('Lỗi khi tạo phiếu mượn:', err);
    alert(err.response?.data?.message || 'Không thể gửi yêu cầu mượn sách.');
  } finally {
    isBorrowing.value = false;
  }
}
</script>

<style>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}

/* Spinner for loading button */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>