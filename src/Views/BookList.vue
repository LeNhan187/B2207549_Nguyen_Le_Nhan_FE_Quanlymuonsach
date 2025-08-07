<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File xây dựng danh sách sản phẩm.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<template>
  <div class="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in-up">
    <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center relative">
      <span class="relative z-10">Thư Viện Sách</span>
      <span class="absolute bottom-[-8px] left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full z-0"></span>
    </h1>
    <p class="text-lg text-gray-600 text-center mb-10">Khám phá bộ sưu tập sách đa dạng của chúng tôi.</p>

    <div class="mb-12 max-w-2xl mx-auto">
      <div class="flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-2 group focus-within:ring-2 focus-within:ring-gray-300 transition-all duration-300">
        <input
          v-model="search"
          type="text"
          placeholder="Tìm sách theo tiêu đề hoặc tác giả..."
          class="flex-1 bg-transparent px-5 py-3 text-gray-800 placeholder-gray-500 focus:outline-none text-lg"
          @keyup.enter="fetchBooks"
        />
        <button
          @click="fetchBooks"
          class="bg-gray-800 text-white p-3.5 rounded-full hover:bg-gray-700 transition-all duration-300 transform group-hover:scale-105 active:scale-95 shadow-md flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center text-gray-500 py-10">
      <p class="text-xl mb-4">Đang tải danh sách sách...</p>
      <svg class="animate-spin h-8 w-8 text-gray-500 mx-auto" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
    <div v-else-if="filteredBooks.length === 0" class="text-center text-gray-700 py-10">
      <p class="text-xl font-medium mb-4">Không tìm thấy sách nào phù hợp.</p>
      <p class="text-gray-500">Hãy thử từ khóa khác hoặc kiểm tra lại.</p>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 animate-staggered-fade-in">
      <BookCard
        v-for="(book, index) in filteredBooks"
        :key="book._id"
        :book="book"
        :style="{ animationDelay: `${index * 0.05}s` }"
        class="animate-item-fade-in"
      />
    </div>

  </div>
</template>
 
<script setup>
import { ref, computed, onMounted } from 'vue';
import BookCard from '../components/BookCard.vue';

import apiClient from '../services/apiService'
import { useRoute } from 'vue-router'; 

const books = ref([]);
const search = ref('');
const isLoading = ref(true); 

const route = useRoute(); 

// --- DATA FETCHING ---
async function fetchBooks() {
  isLoading.value = true; 
  try {
    const res = await apiClient.get('/books');
    books.value = res.data;
  } catch (err) {
    console.error('Lỗi khi tải sách:', err);
  } finally {
    isLoading.value = false; 
  }
}

onMounted(() => {
  if (route.query.q) {
    search.value = route.query.q;
  }
  fetchBooks();
});

// --- SEARCH LOGIC ---
const filteredBooks = computed(() => {
  if (!search.value) {
    return books.value;
  }
  const query = search.value.toLowerCase();
  return books.value.filter(book =>
    book.tenSach.toLowerCase().includes(query) ||
    book.tacGia.toLowerCase().includes(query)
  );
});
</script>

<style>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
}


@keyframes itemFadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-item-fade-in {
  opacity: 0; 
  animation: itemFadeIn 0.6s ease-out forwards;
}

</style>