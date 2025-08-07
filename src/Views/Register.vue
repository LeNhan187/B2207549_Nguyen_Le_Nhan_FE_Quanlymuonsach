<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File xây dựng form đăng ký 2 bước, bắt một số lỗi nhập ký tự.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<template>
  <div class="w-full">
    <h2 class="text-3xl font-extrabold text-center text-gray-900 mb-2">
      Tạo tài khoản mới
    </h2>
    <p class="text-center text-gray-600 mb-6">
      Chỉ với 2 bước đơn giản để tham gia cộng đồng.
    </p>

    <div class="flex items-center justify-center mb-6">
      <div 
        class="flex items-center" 
        :class="step === 1 ? 'text-indigo-600' : 'text-green-500'"
      >
        <div class="rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center font-bold border-2"
             :class="step === 1 ? 'border-indigo-600' : 'border-green-500 bg-green-500 text-white'">
          1
        </div>
        <div class="ml-2 font-semibold">Tài khoản</div>
      </div>
      <div class="flex-auto border-t-2 transition duration-500 ease-in-out mx-4"
           :class="step === 2 ? 'border-green-500' : 'border-gray-300'">
      </div>
      <div 
        class="flex items-center"
        :class="step === 2 ? 'text-indigo-600' : 'text-gray-500'"
      >
        <div class="rounded-full transition duration-500 ease-in-out h-8 w-8 flex items-center justify-center font-bold border-2"
             :class="step === 2 ? 'border-indigo-600' : 'border-gray-300'">
          2
        </div>
        <div class="ml-2 font-semibold">Cá nhân</div>
      </div>
    </div>
    
    <form @submit.prevent="handleRegister" class="space-y-6">
      <div v-if="step === 1" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">Email <span class="text-red-500">*</span></label>
          <input v-model="email" type="email" id="email" required placeholder="Ví dụ: ban@example.com" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <p v-if="errorEmail" class="text-red-600 text-sm mt-1">{{ errorEmail }}</p>
        </div>
        <div>
          <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">Mật khẩu <span class="text-red-500">*</span></label>
          <input v-model="password" type="password" id="password" required placeholder="Tối thiểu 6 ký tự" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <p v-if="errorPassword" class="text-red-600 text-sm mt-1">{{ errorPassword }}</p>
        </div>
        <div>
          <label for="confirm" class="block text-sm font-semibold text-gray-700 mb-2">Xác nhận mật khẩu <span class="text-red-500">*</span></label>
          <input v-model="confirm" type="password" id="confirm" required placeholder="Nhập lại mật khẩu" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <p v-if="errorConfirm" class="text-red-600 text-sm mt-1">{{ errorConfirm }}</p>
        </div>
      </div>

      <div v-if="step === 2" class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <label for="hoLot" class="block text-sm font-semibold text-gray-700 mb-2">Họ lót <span class="text-red-500">*</span></label>
          <input v-model="hoLot" type="text" id="hoLot" required placeholder="Ví dụ: Nguyễn Văn" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <p v-if="errorHoLot" class="text-red-600 text-sm mt-1">{{ errorHoLot }}</p>
        </div>
        <div>
          <label for="ten" class="block text-sm font-semibold text-gray-700 mb-2">Tên <span class="text-red-500">*</span></label>
          <input v-model="ten" type="text" id="ten" required placeholder="Ví dụ: A" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <p v-if="errorTen" class="text-red-600 text-sm mt-1">{{ errorTen }}</p>
        </div>
        <div class="sm:col-span-2">
          <label for="ngaySinh" class="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
          <input v-model="ngaySinh" type="date" id="ngaySinh" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div class="sm:col-span-2">
          <label for="diaChi" class="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
          <input v-model="diaChi" type="text" id="diaChi" placeholder="Ví dụ: 123 Đường ABC, Quận XYZ" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div class="sm:col-span-2">
          <label for="dienThoai" class="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
          <input v-model="dienThoai" type="tel" id="dienThoai" placeholder="Ví dụ: 0901234567" class="w-full border border-gray-300 rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
      </div>

      <div class="pt-6">
        <div v-if="step === 1" class="flex justify-end">
          <button @click="nextStep" type="button" class="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-1">
            Tiếp tục
          </button>
        </div>
        <div v-if="step === 2" class="flex flex-col sm:flex-row gap-4">
          <button @click="prevStep" type="button" class="w-full sm:w-1/3 bg-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-300 transition">
            Quay lại
          </button>
          <button type="submit" class="w-full sm:w-2/3 bg-gray-800 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-gray-700 transition transform hover:-translate-y-1">
            Đăng ký tài khoản
          </button>
        </div>
      </div>

      <p v-if="message" :class="message.includes('thành công') ? 'text-green-600' : 'text-red-600'" class="text-center font-medium mt-4">
        {{ message }}
      </p>

      <p class="text-center text-sm text-gray-600 mt-6">
        Đã có tài khoản?
        <router-link to="/auth/login" class="text-indigo-600 font-semibold hover:underline">
          Đăng nhập ngay
        </router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../services/apiService'

// State để quản lý các bước
const step = ref(1);

// Info cá nhân
const hoLot = ref('');
const ten = ref('');
const ngaySinh = ref('');
const diaChi = ref('');
const dienThoai = ref('');

// Tài khoản
const email = ref('');
const password = ref('');
const confirm = ref('');
const message = ref('');

// Các biến báo lỗi
const errorHoLot = ref('');
const errorTen = ref('');
const errorEmail = ref('');
const errorPassword = ref('');
const errorConfirm = ref('');

const router = useRouter();

// Hàm kiểm tra lỗi cho từng bước
const validateStep1 = () => {
  errorEmail.value = '';
  errorPassword.value = '';
  errorConfirm.value = '';
  let hasError = false;

  if (!email.value) { errorEmail.value = 'Vui lòng nhập email.'; hasError = true; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { errorEmail.value = 'Email không hợp lệ.'; hasError = true; }
  
  if (!password.value) { errorPassword.value = 'Vui lòng nhập mật khẩu.'; hasError = true; }
  else if (password.value.length < 6) { errorPassword.value = 'Mật khẩu phải từ 6 ký tự.'; hasError = true; }

  if (password.value !== confirm.value) { errorConfirm.value = 'Mật khẩu không khớp.'; hasError = true; }

  return !hasError;
};

const validateStep2 = () => {
  errorHoLot.value = '';
  errorTen.value = '';
  let hasError = false;

  if (!hoLot.value) { errorHoLot.value = 'Vui lòng nhập họ lót.'; hasError = true; }
  if (!ten.value) { errorTen.value = 'Vui lòng nhập tên.'; hasError = true; }

  return !hasError;
};

// Hàm chuyển bước
const nextStep = () => {
  if (validateStep1()) {
    step.value = 2;
  }
};

const prevStep = () => {
  step.value = 1;
};

// Hàm đăng ký cuối cùng
const handleRegister = async () => {
  if (step.value === 1) {
      if(validateStep1()) step.value = 2;
      return;
  }
  
  if (!validateStep2()) {
    message.value = 'Vui lòng kiểm tra lại các trường bị lỗi.';
    return;
  }
  
  message.value = 'Đang xử lý...';

  try {
    const userRes = await apiClient.post('/users', {
      hoLot: hoLot.value,
      ten: ten.value,
      ngaySinh: ngaySinh.value,
      diaChi: diaChi.value,
      dienThoai: dienThoai.value
    });

    const refId = userRes.data._id;

    await apiClient.post('/account/register', {
      email: email.value,
      password: password.value,
      role: 'user',
      refId,
      refModel: 'User'
    });

    message.value = 'Tạo tài khoản thành công 🎉';
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  } catch (err) {
    message.value = err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký.';
  }
};
</script>