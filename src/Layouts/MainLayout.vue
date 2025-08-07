<!-- /**
 * ---------------------------------------------------------------------------------------------
 * Tên dự án: Website Quản lý Thư viện Trực tuyến
 * ---------------------------------------------------------------------------------------------
 * Mô tả: File layout tổng thể có Header và Footer.
 *
 * @author  Nguyễn Nhật Hồng Phước
 * @mssv    B2308385
 * @date    27/07/2025
 *
 * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
 * ---------------------------------------------------------------------------------------------
 */ -->
<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';
</script>
<template>
    <div>
        <Header />
        <main>
            <router-view />
        </main>
        <Footer />
    </div>
</template>
