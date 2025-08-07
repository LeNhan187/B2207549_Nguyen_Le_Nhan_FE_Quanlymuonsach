// <!-- /**
//  * ---------------------------------------------------------------------------------------------
//  * Tên dự án: Website Quản lý Thư viện Trực tuyến
//  * ---------------------------------------------------------------------------------------------
//  * Mô tả: File Pinia quản lí thông tin người dùng toàn cục.
//  *
//  * @author  Nguyễn Nhật Hồng Phước
//  * @mssv    B2308385
//  * @date    27/07/2025
//  *
//  * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
//  * ---------------------------------------------------------------------------------------------
//  */ -->

import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        username: '',
        userId: '',
        token: '',
        role: '',
        isLoggedIn: false,
    }),

    actions: {
        login(data) {
            this.token = data.token;
            this.role = data.role;
            this.userId = data.userInfo.userId; 
            this.username = data.userInfo.hoTenNV || data.userInfo.fullName || 'Người dùng';
            this.isLoggedIn = true;

            localStorage.setItem('token', this.token);
            localStorage.setItem('role', this.role);
            localStorage.setItem('userId', this.userId);
            localStorage.setItem('username', this.username);
        },

        logout() {
            this.username = '';
            this.userId = '';
            this.token = '';
            this.role = '';
            this.isLoggedIn = false;

            localStorage.clear();
        },
        
        initFromStorage() {
            const token = localStorage.getItem('token');
            if (token) {
                this.token = token;
                this.isLoggedIn = true;
                this.role = localStorage.getItem('role') || '';
                this.userId = localStorage.getItem('userId') || ''; 
                this.username = localStorage.getItem('username') || '';
            }
        }
    }
});