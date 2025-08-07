// <!-- /**
//  * ---------------------------------------------------------------------------------------------
//  * Tên dự án: Website Quản lý Thư viện Trực tuyến
//  * ---------------------------------------------------------------------------------------------
//  * Mô tả: File dẫn link API giao tiếp với backend.
//  *
//  * @author  Nguyễn Nhật Hồng Phước
//  * @mssv    B2308385
//  * @date    27/07/2025
//  *
//  * @copyright (c) 2025 Nguyễn Nhật Hồng Phước. All rights reserved.
//  * ---------------------------------------------------------------------------------------------
//  */ -->

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default apiClient;

// import.meta.env.VITE_API_URL