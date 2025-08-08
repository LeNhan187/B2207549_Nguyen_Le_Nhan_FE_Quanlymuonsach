<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Quản lý Sách</h1>
      <p class="mt-1 text-slate-500">Thêm, sửa, xóa sách và nhà xuất bản trong hệ thống.</p>
    </div>

    <div class="border-b border-slate-200">
      <nav class="-mb-px flex space-x-6">
        <button 
          @click="activeTab = 'books'" 
          :class="['py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'books' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300']">
          Quản lý Sách
        </button>
        <button 
          @click="activeTab = 'publishers'" 
          :class="['py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'publishers' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300']">
          Quản lý Nhà xuất bản
        </button>
      </nav>
    </div>

    <div class="mt-6">
      <div v-if="activeTab === 'books'">
        <div class="flex flex-col md:flex-row gap-4 mb-4">
           <div class="relative flex-1">
             <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input v-model="bookSearchTerm" type="text" placeholder="Tìm theo tên sách hoặc tác giả..." class="w-full p-3 pl-10 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          </div>
          <button @click="openBookModal()" class="flex items-center justify-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-lg shadow font-semibold hover:bg-indigo-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <span>Thêm sách mới</span>
          </button>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
           <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50">
                <tr class="border-b border-slate-200">
                  <th class="p-4 text-sm font-semibold text-slate-600">Tên sách</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Tác giả</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Số lượng</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Hành động</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="book in filteredBooks" :key="book._id" class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td class="p-4 font-medium">{{ book.tenSach }}</td>
                  <td class="p-4">{{ book.tacGia }}</td>
                  <td class="p-4">{{ book.soQuyen }}</td>
                  <td class="p-4 space-x-2 flex items-center">
                    <button @click="openBookModal(book)" class="p-1.5 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg></button>
                    <button @click="deleteBook(book._id, book.tenSach)" class="p-1.5 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'publishers'">
        <div class="flex flex-col md:flex-row gap-4 mb-4">
          <input v-model="publisherSearchTerm" type="text" placeholder="Tìm theo tên hoặc địa chỉ NXB..." class="w-full md:w-1/3 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
          <div class="flex-grow"></div>
          <button @click="openPublisherModal()" class="flex items-center justify-center gap-2 bg-violet-600 text-white px-5 py-3 rounded-lg shadow font-semibold hover:bg-indigo-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <span>Thêm NXB mới</span>
          </button>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50">
                <tr class="border-b border-slate-200">
                  <th class="p-4 text-sm font-semibold text-slate-600">Tên Nhà xuất bản</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Địa chỉ</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Hành động</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="pub in filteredPublishers" :key="pub._id" class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td class="p-4">{{ pub.tenNXB }}</td>
                  <td class="p-4">{{ pub.diaChi }}</td>
                  <td class="p-4 space-x-2 flex items-center">
                    <button @click="openPublisherModal(pub)" class="p-1.5 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg></button>
                    <button @click="deletePublisher(pub._id, pub.tenNXB)" class="p-1.5 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showBookModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-2xl font-bold text-slate-800 mb-6">{{ editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới' }}</h2>
        <form @submit.prevent="saveBook">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold text-slate-600">Tên sách</label>
              <input v-model="bookForm.tenSach" type="text" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Mã sách</label>
              <input v-model.number="bookForm.maSach" type="number" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Tác giả</label>
              <input v-model="bookForm.tacGia" type="text" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Số lượng</label>
              <input v-model.number="bookForm.soQuyen" type="number" required min="0" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Đơn giá</label>
              <input v-model.number="bookForm.donGia" type="number" required min="0" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Năm xuất bản</label>
              <input v-model.number="bookForm.namXuatBan" type="number" placeholder="YYYY" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Nhà xuất bản</label>
              <select v-model="bookForm.maNXB" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition">
                <option disabled value="">-- Chọn nhà xuất bản --</option>
                <option v-for="pub in publishers" :key="pub._id" :value="pub._id">{{ pub.tenNXB }}</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="block mb-1 text-sm font-semibold text-slate-600">Link hình ảnh</label>
              <input v-model="bookForm.hinhAnh" type="url" placeholder="https://example.com/image.jpg" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button @click="showBookModal = false" type="button" class="bg-slate-200 px-6 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-slate-300 transition">Hủy</button>
            <button type="submit" class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow">Lưu</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPublisherModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 class="text-2xl font-bold text-slate-800 mb-6">{{ editingPublisher ? 'Chỉnh sửa NXB' : 'Thêm NXB mới' }}</h2>
        <form @submit.prevent="savePublisher">
          <div class="space-y-5">
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Mã Nhà xuất bản</label>
              <input v-model.number="publisherForm.maNXB" type="number" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Tên Nhà xuất bản</label>
              <input v-model="publisherForm.tenNXB" type="text" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
            <div>
              <label class="block mb-1 text-sm font-semibold text-slate-600">Địa chỉ</label>
              <input v-model="publisherForm.diaChi" type="text" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-4">
            <button @click="showPublisherModal = false" type="button" class="bg-slate-200 px-6 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-slate-300 transition">Hủy</button>
            <button type="submit" class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from '../../services/apiService'

// --- STATE MANAGEMENT ---
const activeTab = ref('books');
const books = ref([]);
const publishers = ref([]);
const bookSearchTerm = ref('');
const publisherSearchTerm = ref('');

const showBookModal = ref(false);
const editingBook = ref(null);
const bookForm = ref({
  maSach: null,
  tenSach: '',
  tacGia: '',
  soQuyen: 1,
  maNXB: '',
  hinhAnh: '',
  donGia: 0,
  namXuatBan: null
});

const showPublisherModal = ref(false);
const editingPublisher = ref(null);
const publisherForm = ref({
  maNXB: null,
  tenNXB: '',
  diaChi: ''
});



// --- DATA FETCHING ---
async function fetchData() {
  try {
    const [booksRes, publishersRes] = await Promise.all([
      apiClient.get('/books'),
      apiClient.get('/publishers')
    ]);
    books.value = booksRes.data;
    publishers.value = publishersRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    alert("Không thể tải dữ liệu từ máy chủ.");
  }
}

onMounted(fetchData);

// --- SEARCH LOGIC ---
const filteredBooks = computed(() => {
  if (!bookSearchTerm.value) {
    return books.value;
  }
  const query = bookSearchTerm.value.toLowerCase();
  return books.value.filter(book =>
    book.tenSach.toLowerCase().includes(query) ||
    book.tacGia.toLowerCase().includes(query)
  );
});

const filteredPublishers = computed(() => {
  if (!publisherSearchTerm.value) {
    return publishers.value;
  }
  const query = publisherSearchTerm.value.toLowerCase();
  return publishers.value.filter(pub =>
    pub.tenNXB.toLowerCase().includes(query) ||
    (pub.diaChi && pub.diaChi.toLowerCase().includes(query))
  );
});


// --- BOOK MODAL LOGIC ---
function openBookModal(book = null) {
  if (book) {
    editingBook.value = book;
    bookForm.value = { ...book, maNXB: book.maNXB?._id || book.maNXB };
  } else {
    editingBook.value = null;
    bookForm.value = { maSach: null, tenSach: '', tacGia: '', soQuyen: 1, maNXB: '', hinhAnh: '', donGia: 0, namXuatBan: null };
  }
  showBookModal.value = true;
}

async function saveBook() {
  try {
    if (editingBook.value) {
      await apiClient.put(`/books/${editingBook.value._id}`, bookForm.value);
    } else {
      await apiClient.post('/books', bookForm.value);
    }
    showBookModal.value = false;
    await fetchData();
    alert('Lưu sách thành công!');
  } catch (error) {
    console.error("Lỗi khi lưu sách:", error);
    alert(error.response?.data?.message || 'Lưu sách thất bại.');
  }
}

// --- DELETE BOOK LOGIC ---
async function deleteBook(bookId, bookTitle) {
  if (!window.confirm(`Bạn có chắc chắn muốn xóa sách "${bookTitle}" không?`)) {
    return;
  }
  try {
    await apiClient.delete(`/books/${bookId}`);
    await fetchData();
    alert('Xóa sách thành công!');
  } catch (error) {
    console.error("Lỗi khi xóa sách:", error);
    alert(error.response?.data?.message || 'Xóa sách thất bại.');
  }
}

// --- PUBLISHER MODAL LOGIC ---
function openPublisherModal(publisher = null) {
  if (publisher) {
    editingPublisher.value = publisher;
    publisherForm.value = { ...publisher };
  } else {
    editingPublisher.value = null;
    publisherForm.value = { maNXB: null, tenNXB: '', diaChi: '' };
  }
  showPublisherModal.value = true;
}

async function savePublisher() {
  try {
    if (editingPublisher.value) {
      await apiClient.put(`/publishers/${editingPublisher.value._id}`, publisherForm.value);
    } else {
      await apiClient.post('/publishers', publisherForm.value);
    }
    showPublisherModal.value = false;
    await fetchData();
    alert('Lưu nhà xuất bản thành công!');
  } catch (error)
 {
    console.error("Lỗi khi lưu nhà xuất bản:", error);
    alert(error.response?.data?.message || 'Lưu nhà xuất bản thất bại.');
  }
}

// --- DELETE PUBLISHER LOGIC ---
async function deletePublisher(publisherId, publisherName) {
  if (!window.confirm(`Bạn có chắc chắn muốn xóa nhà xuất bản "${publisherName}" không?`)) {
    return;
  }
  try {
    await apiClient.delete(`/publishers/${publisherId}`);
    await fetchData();
    alert('Xóa nhà xuất bản thành công!');
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
    alert(error.response?.data?.message || 'Xóa nhà xuất bản thất bại.');
  }
}
</script>