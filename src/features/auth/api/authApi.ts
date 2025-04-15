/** @format */

import axios from "@/shared/api/axiosInstance";
import Cookies from "js-cookie";

export const authApi = {
  login: async (data: {
    email: string;
    password: string;
  }) => {
    const res = await axios.post("/auth/login", data, {
      withCredentials: true,
    });
    return res.data;
  },

  register: async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    const res = await axios.post("/auth/register", data, {
      withCredentials: true,
    });
    return res.data;
  },

  me: async () => {
    const res = await axios.get("/auth/me", {
      withCredentials: true,
    });
    return res.data;
  },

  logout: async () => {
    // Сначала — запрос на backend
    await axios.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    // Потом — удаление cookies на клиенте (если нужно)
    Cookies.remove("SESSION_NAME"); // Укажи точное имя cookie (например, "connect.sid")
    Cookies.remove("token"); // если есть токен
    window.location.reload();
  },
};
