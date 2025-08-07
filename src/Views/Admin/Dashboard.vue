<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../../services/apiService'
import { useUserStore } from "../../stores/userStore";

const userStore = useUserStore(); // Dùng để chào mừng admin


// --- STATE ---
const loading = ref(true);
const error = ref(null);
const stats = ref({
  totalBookTitles: 0,
  totalUsers: 0,
  currentlyBorrowed: 0,
  overdueBooks: 0,
});
const overdueList = ref([]);
const outOfStockBooks = ref([]);

// --- DATA FETCHING ---
async function fetchDashboardData() {
  loading.value = true;
  error.value = null;
  try {
    const [booksRes, usersRes, borrowsRes, outOfStockRes] = await Promise.all([
      apiClient.get('/books'),
      apiClient.get('/users'),
      apiClient.get('/borrows'),
      apiClient.get('/books/out-of-stock'),
    ]);

    stats.value.totalBookTitles = booksRes.data?.length || 0;
    stats.value.totalUsers = usersRes.data?.length || 0;
    outOfStockBooks.value = outOfStockRes.data;

    if (borrowsRes.data) {
      const allBorrows = borrowsRes.data;
      const now = new Date();
      
      const activeBorrows = allBorrows.filter(b => b.status === 'Đang mượn');
      stats.value.currentlyBorrowed = activeBorrows.length;

      overdueList.value = activeBorrows.filter(b => new Date(b.ngayTra) < now);
      stats.value.overdueBooks = overdueList.value.length;
    }

  } catch (err) {
    error.value = "Không thể tải dữ liệu từ máy chủ.";
    console.error("Lỗi khi tải dữ liệu cho dashboard:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchDashboardData);

// --- HELPER FUNCTIONS ---
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('vi-VN', options);
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Bảng điều khiển</h1>
      <p class="mt-1 text-slate-500">Chào mừng trở lại, {{ userStore.username }}! Đây là tổng quan hệ thống của bạn.</p>
    </div>

    <div v-if="loading" class="text-center text-slate-500">Đang tải dữ liệu...</div>
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
      <strong class="font-bold">Lỗi!</strong>
      <span class="block sm:inline"> {{ error }}</span>
    </div>

    <div v-if="!loading && !error">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div class="p-3 bg-indigo-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <div>
            <p class="text-sm text-slate-500">Tổng số đầu sách</p>
            <span class="text-2xl font-bold text-slate-800">{{ stats.totalBookTitles }}</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div class="p-3 bg-indigo-100 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1.78-4.125a4 4 0 00-6.44-6.44m0 0l-1.06-1.06a4 4 0 00-5.657 5.657l1.06 1.06" /></svg>
          </div>
          <div>
            <p class="text-sm text-slate-500">Tổng số độc giả</p>
            <span class="text-2xl font-bold text-slate-800">{{ stats.totalUsers }}</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div class="p-3 bg-indigo-100 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p class="text-sm text-slate-500">Sách đang mượn</p>
            <span class="text-2xl font-bold text-slate-800">{{ stats.currentlyBorrowed }}</span>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
           <div class="p-3 bg-red-100 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
           </div>
          <div>
            <p class="text-sm text-slate-500">Sách quá hạn trả</p>
            <span class="text-2xl font-bold text-slate-800">{{ stats.overdueBooks }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Danh sách sách quá hạn</h2>
          <div v-if="overdueList.length > 0" class="overflow-y-auto max-h-80">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-slate-600 uppercase bg-slate-50 sticky top-0">
                <tr>
                  <th scope="col" class="px-4 py-3">Tên sách</th>
                  <th scope="col" class="px-4 py-3">Người mượn</th>
                  <th scope="col" class="px-4 py-3">Ngày hẹn trả</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="item in overdueList" :key="item._id" class="border-b hover:bg-slate-50">
                  <td class="px-4 py-3 font-medium">{{ item.bookId?.tenSach }}</td>
                  <td class="px-4 py-3">{{ item.borrowerId ? (item.borrowerId.hoTenNV || `${item.borrowerId.hoLot} ${item.borrowerId.ten}`) : 'Không rõ' }}</td>
                  <td class="px-4 py-3 text-red-600 font-semibold">{{ formatDate(item.ngayTra) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8 text-slate-500">
            <p> Không có sách nào bị quá hạn.</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-md">
          <h2 class="text-xl font-bold text-slate-800 mb-4">Danh sách sách đã hết</h2>
          <div v-if="outOfStockBooks.length > 0" class="overflow-y-auto max-h-80">
            <table class="w-full text-sm text-left">
              <thead class="text-xs text-slate-600 uppercase bg-slate-50 sticky top-0">
                <tr>
                  <th scope="col" class="px-4 py-3">Tên sách</th>
                  <th scope="col" class="px-4 py-3">Tác giả</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="book in outOfStockBooks" :key="book._id" class="border-b hover:bg-slate-50">
                  <td class="px-4 py-3 font-medium">{{ book.tenSach }}</td>
                  <td class="px-4 py-3">{{ book.tacGia }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8 text-slate-500">
            <p> Không có sách nào bị hết.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>