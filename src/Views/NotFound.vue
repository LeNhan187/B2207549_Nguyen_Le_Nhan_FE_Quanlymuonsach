<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File NotFound xử lý bắt lỗi đường dẫn sai.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<template>
    <div class="flex items-center justify-center flex-col">
        <h1 class="text-6xl p-10 font-bold gap-4">404 Page Not Found</h1>
        <p>Không tìm thấy trang</p>
        <router-link to="/" class="text-blue-600 border-b-2">Quay về trang chủ</router-link>
    </div>
</template>

<script>
    export default{
        name: 'NotFound'
    }
</script>