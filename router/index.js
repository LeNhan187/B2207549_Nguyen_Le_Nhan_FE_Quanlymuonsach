// /**
//  * ---------------------------------------------------------------------------------------------
//  * Tên dự án: Website Quản lý Thư viện Trực tuyến
//  * ---------------------------------------------------------------------------------------------
//  * Mô tả: File này chứa router xử lý điều hướng trang.
//  *
//  * @author  Nguyễn Nhật Hồng Phước
//  * @mssv    B2308385
//  * @date    27/07/2025
//  *
//  * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
//  * ---------------------------------------------------------------------------------------------
//  */
import { createRouter, createWebHistory } from "vue-router";


// import duong dan trang web 
import Home from "../src/Views/Home.vue";
import NotFound from "../src/Views/NotFound.vue";
import Register from "../src/Views/Register.vue";
import Login from "../src/Views/Login.vue";

// import GenreBookList from "../src/Views/GenreBookList.vue";
import BookList from "../src/Views/BookList.vue"
import BookDetail from "../src/Views/BookDetail.vue";
import BorrowedBooks from "../src/Views/BorrowedBooks.vue";

import Dashboard from "../src/Views/Admin/Dashboard.vue";
import ManageContent from "../src/Views/Admin/ManageContent.vue"
import ManageUsers from "../src/Views/Admin/ManageUsers.vue"
import ManageBorrow from "../src/Views/Admin/ManageBorrow.vue"

import MainLayout from "../src/Layouts/MainLayout.vue";
import AuthLayout from "../src/Layouts/AuthLayout.vue";
import AdminLayout from "../src/Layouts/AdminLayout.vue";



const routes = [
    {
        path: '/',
        component: MainLayout,
        children:[
            { path: '', component: Home, name: 'Home' },
            { path: 'books', component: BookList, name: 'BookList'},
            { path: 'books/masach/:maSach', component: BookDetail, name: 'BookDetail', meta: { requiresAuth: true } },
            { path: 'borrowed', component: BorrowedBooks, name: 'BorrowedBooks', meta: { requiresAuth: true } }
        ],
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {path: 'login', component: Login, name: 'Login'},
            {path: 'register', component: Register, name: 'Register'}
        ]
    },

    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true }, 
        children: [
            {
                path: '',
                redirect: '/admin/dashboard',
            },
            {
                path: 'dashboard',
                name: 'AdminDashboard',
                component: Dashboard,
            },
            {
            path: 'manage-content',
            name: 'AdminManageContent',
            component: ManageContent,
            },
            {
            path: 'manage-users',
            name: 'AdminManageUsers',
            component: ManageUsers,
            },
            {
                path: 'manage-borrow',
                name: 'AdminManageBorrow',
                component: ManageBorrow,
            }
        ]
    },

    {
        path: '/:catchAll(.*)',
        component: NotFound,
        name: 'NotFound'
    }
]

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        // Luôn cuộn lên đầu trang khi điều hướng
        return { top: 0 }
    },    
    routes,
})


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // 1. Kiểm tra route yêu cầu đăng nhập
    if (to.meta.requiresAuth && !token) {
        // Nếu yêu cầu đăng nhập mà không có token -> về trang Login
        return next({ name: 'Login' });
    }

    // 2. Kiểm tra route yêu cầu quyền admin
    if (to.meta.requiresAdmin && role !== 'admin') {
        // Nếu yêu cầu quyền admin mà role không phải 'admin' -> cảnh báo và về trang Home
        alert('Bạn không có quyền truy cập vào trang này!');
        return next({ name: 'Home' }); 
    }

    // Nếu tất cả điều kiện đều qua, cho phép truy cập
    next();
});

export default router