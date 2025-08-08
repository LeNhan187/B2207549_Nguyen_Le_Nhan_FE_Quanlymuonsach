<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '../../services/apiService'

const borrows = ref([]);
const searchTerm = ref('');
const filterStatus = ref('Tất cả');



async function fetchData() {
  try {
    const res = await apiClient.get('/borrows');
    borrows.value = res.data;
  } catch (error) {
    console.error("Lỗi khi tải lịch sử mượn:", error);
  }
}

onMounted(fetchData);

const filteredBorrows = computed(() => {
  let filtered = borrows.value;

  if (filterStatus.value !== 'Tất cả') {
    if (filterStatus.value === 'Quá hạn') {
      filtered = filtered.filter(b => b.status === 'Đang mượn' && new Date(b.ngayTra) < new Date());
    } else {
      filtered = filtered.filter(b => b.status === filterStatus.value);
    }
  }

  if (searchTerm.value) {
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    filtered = filtered.filter(b => 
      b.bookId?.tenSach.toLowerCase().includes(lowerCaseSearch) ||
      getBorrowerName(b.borrowerId).toLowerCase().includes(lowerCaseSearch)
    );
  }

  return filtered;
});

async function deleteBorrow(borrowId) {
  if (!window.confirm("Bạn có chắc chắn muốn XÓA VĨNH VIỄN phiếu mượn này không?")) return;
  try {
    await apiClient.delete(`/borrows/${borrowId}`);
    await fetchData();
    alert("Xóa phiếu mượn thành công!");
  } catch (error) {
    alert("Xóa thất bại.");
  }
}

async function markAsReturned(borrowId) {
  if (!window.confirm("Bạn có chắc chắn muốn đánh dấu phiếu mượn này là đã trả không?")) return;
  try {
    await apiClient.patch(`/borrows/return/${borrowId}`);
    await fetchData();
    alert("Cập nhật thành công!");
  } catch (error) {
    alert("Cập nhật thất bại.");
  }
}

// --- Helper Functions ---
function getBorrowerName(borrower) {
  if (!borrower) return 'Không rõ';
  return borrower.hoTenNV || `${borrower.hoLot} ${borrower.ten}`;
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('vi-VN');
}

function getStatusText(item) {
  if (item.status === 'Đã trả') return 'Đã trả';
  if (new Date(item.ngayTra) < new Date()) return 'Quá hạn';
  return 'Đang mượn';
}

function getStatusClass(item) {
  const status = getStatusText(item);
  if (status === 'Đã trả') return 'bg-green-100 text-green-800';
  if (status === 'Quá hạn') return 'bg-red-100 text-red-800';
  return 'bg-yellow-100 text-yellow-800';
}

function getFilterClass(status) {
  return [
    'px-4 py-2 rounded-md text-sm font-semibold transition-colors',
    filterStatus.value === status ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-600 hover:bg-slate-200'
  ];
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Quản lý Mượn/Trả</h1>
      <p class="mt-1 text-slate-500">Theo dõi và quản lý tất cả các hoạt động mượn trả sách trong hệ thống.</p>
    </div>

    <!-- Controls: Search and Filters -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <!-- Search Input with Icon -->
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Tìm theo tên sách hoặc người mượn..." 
          class="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
      <!-- Filter Buttons -->
      <div class="flex items-center bg-slate-200 rounded-lg p-1 space-x-1">
        <button @click="filterStatus = 'Tất cả'" :class="getFilterClass('Tất cả')">Tất cả</button>
        <button @click="filterStatus = 'Đang mượn'":class="getFilterClass('Đang mượn')">Đang mượn</button>
        <button @click="filterStatus = 'Quá hạn'" :class="getFilterClass('Quá hạn')">Quá hạn</button>
        <button @click="filterStatus = 'Đã trả'" :class="getFilterClass('Đã trả')">Đã trả</button>
      </div>
    </div>

    <!-- Borrow Table -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-slate-50">
            <tr class="border-b border-slate-200">
              <th class="p-4 text-sm font-semibold text-slate-600">Tên sách</th>
              <th class="p-4 text-sm font-semibold text-slate-600">Người mượn</th>
              <th class="p-4 text-sm font-semibold text-slate-600">Ngày mượn</th>
              <th class="p-4 text-sm font-semibold text-slate-600">Ngày hẹn trả</th>
              <th class="p-4 text-sm font-semibold text-slate-600">Trạng thái</th>
              <th class="p-4 text-sm font-semibold text-slate-600">Hành động</th>
            </tr>
          </thead>
          <tbody class="text-slate-700">
            <tr v-for="item in filteredBorrows" :key="item._id" class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
              <td class="p-4 font-medium">{{ item.bookId?.tenSach || 'Sách đã bị xóa' }}</td>
              <td class="p-4">{{ getBorrowerName(item.borrowerId) }}</td>
              <td class="p-4">{{ formatDate(item.ngayMuon) }}</td>
              <td class="p-4">{{ formatDate(item.ngayTra) }}</td>
              <td class="p-4">
                <span :class="getStatusClass(item)" class="px-2.5 py-1 text-xs font-bold rounded-full">
                  {{ getStatusText(item) }}
                </span>
              </td>
              <td class="p-4 space-x-2 flex items-center">
                <button 
                  v-if="item.status !== 'Đã trả'"
                  @click="markAsReturned(item._id)"
                  class="p-1.5 text-green-500 rounded-full hover:bg-green-100 hover:text-green-700 transition"
                  title="Đánh dấu đã trả"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                </button>
                <button
                  @click="deleteBorrow(item._id)"
                  class="p-1.5 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition"
                  title="Xóa phiếu mượn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>