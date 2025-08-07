<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-800">Quản lý Người dùng</h1>
      <p class="mt-1 text-slate-500">Quản lý tài khoản độc giả và nhân viên trong hệ thống.</p>
    </div>

    <div class="border-b border-slate-200">
      <nav class="-mb-px flex space-x-6">
        <button 
          @click="activeTab = 'users'" 
          :class="['py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'users' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300']">
          Độc giả
        </button>
        <button 
          @click="activeTab = 'staff'" 
          :class="['py-4 px-1 border-b-2 font-medium text-sm', activeTab === 'staff' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300']">
          Nhân viên & Admin
        </button>
      </nav>
    </div>

    <div class="mt-6">
      <div v-if="activeTab === 'users'">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50">
                <tr class="border-b border-slate-200">
                  <th class="p-4 text-sm font-semibold text-slate-600">Họ và Tên</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Điện thoại</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Hành động</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="user in users" :key="user._id" class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td class="p-4 font-medium">{{ user.hoLot }} {{ user.ten }}</td>
                  <td class="p-4">{{ user.dienThoai }}</td>
                  <td class="p-4">
                    <button @click="deleteUser(user._id, `${user.hoLot} ${user.ten}`)" class="p-1.5 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'staff'">
        <div class="flex justify-end mb-4">
          <button @click="openStaffModal()" class="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-lg shadow font-semibold hover:bg-indigo-700 transition">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            <span>Thêm Admin mới</span>
          </button>
        </div>
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-slate-50">
                <tr class="border-b border-slate-200">
                  <th class="p-4 text-sm font-semibold text-slate-600">Họ và Tên</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Chức vụ</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Điện thoại</th>
                  <th class="p-4 text-sm font-semibold text-slate-600">Hành động</th>
                </tr>
              </thead>
              <tbody class="text-slate-700">
                <tr v-for="person in staff" :key="person._id" class="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td class="p-4 font-medium">{{ person.hoTenNV }}</td>
                  <td class="p-4">{{ person.chucVu }}</td>
                  <td class="p-4">{{ person.soDienThoai }}</td>
                  <td class="p-4 space-x-2 flex items-center">
                    <button @click="openStaffModal(person)" class="p-1.5 text-yellow-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700 transition" title="Sửa">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                    </button>
                    <button v-if="person._id !== userStore.userId" @click="deleteStaff(person._id, person.hoTenNV)" class="p-1.5 text-red-500 rounded-full hover:bg-red-100 hover:text-red-700 transition" title="Xóa">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showStaffModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
        <div class="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 class="text-2xl font-bold text-slate-800 mb-6">{{ editingStaff ? 'Chỉnh sửa Nhân viên' : 'Thêm Admin mới' }}</h2>
            <form @submit.prevent="saveStaff">
                <div class="space-y-5">
                    <div>
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Họ tên nhân viên</label>
                        <input v-model="staffForm.hoTenNV" type="text" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Chức vụ</label>
                        <input v-model="staffForm.chucVu" type="text" required class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div v-if="!editingStaff">
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Email</label>
                        <input v-model="staffForm.email" type="email" :required="!editingStaff" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div v-if="!editingStaff">
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Mật khẩu</label>
                        <input v-model="staffForm.password" type="password" :required="!editingStaff" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Địa chỉ</label>
                        <input v-model="staffForm.diaChi" type="text" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                    <div>
                        <label class="block mb-1 text-sm font-semibold text-slate-600">Số điện thoại</label>
                        <input v-model="staffForm.soDienThoai" type="text" class="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"/>
                    </div>
                </div>
                <div class="mt-8 flex justify-end space-x-4">
                    <button @click="showStaffModal = false" type="button" class="bg-slate-200 px-6 py-2.5 rounded-lg font-semibold text-slate-700 hover:bg-slate-300 transition">Hủy</button>
                    <button type="submit" class="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow">Lưu</button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../../services/apiService'
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore();
// --- STATE MANAGEMENT ---
const activeTab = ref('users');
const users = ref([]);
const staff = ref([]);

const showStaffModal = ref(false);
const editingStaff = ref(null);
const staffForm = ref({
  hoTenNV: '',
  chucVu: '',
  email: '',
  password: '',
  diaChi: '',
  soDienThoai: ''
});



// --- DATA FETCHING ---
async function fetchData() {
  try {
    const [usersRes, staffRes] = await Promise.all([
      apiClient.get('/users'),
      apiClient.get('/staff')
    ]);
    console.log('Kiểm tra userStore:', userStore);
    users.value = usersRes.data;
    staff.value = staffRes.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu người dùng:", error);
    alert("Không thể tải dữ liệu người dùng.");
  }
}

onMounted(fetchData);

// --- USER LOGIC ---
async function deleteUser(userId, userName) {
  if (!window.confirm(`Bạn có chắc muốn xóa độc giả "${userName}" không? Hành động này sẽ xóa cả tài khoản đăng nhập.`)) return;
  try {
    await apiClient.delete(`/users/${userId}`);
    await fetchData();
    alert('Xóa độc giả thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Xóa độc giả thất bại.');
  }
}

// --- STAFF/ADMIN LOGIC ---
function openStaffModal(person = null) {
  if (person) {
    editingStaff.value = person;
    staffForm.value = { ...person };
  } else {
    editingStaff.value = null;
    staffForm.value = { hoTenNV: '', chucVu: '', email: '', password: '', diaChi: '', soDienThoai: '' };
  }
  showStaffModal.value = true;
}

async function saveStaff() {
  try {
    if (editingStaff.value) {
      await apiClient.put(`/staff/${editingStaff.value._id}`, staffForm.value);
    } else {
      await apiClient.post('/staff/admin', staffForm.value);
    }
    showStaffModal.value = false;
    await fetchData();
    alert('Lưu thông tin nhân viên thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Lưu thông tin thất bại.');
  }
}

async function deleteStaff(staffId, staffName) {
  if (!window.confirm(`Bạn có chắc muốn xóa nhân viên "${staffName}" không? Hành động này sẽ xóa cả tài khoản admin.`)) return;
  try {
    await apiClient.delete(`/staff/${staffId}`);
    await fetchData();
    alert('Xóa nhân viên thành công!');
  } catch (error) {
    alert(error.response?.data?.message || 'Xóa nhân viên thất bại.');
  }
}

</script>
