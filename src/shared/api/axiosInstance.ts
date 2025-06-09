/** @format */

// src/shared/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "https://d932-37-99-46-83.ngrok-free.app", // Используйте NEXT_PUBLIC_API_URL в Next.js
  withCredentials: true, // Отправляем cookie для авторизации через backend
});

export default axiosInstance;
