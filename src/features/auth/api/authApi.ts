/** @format */

// src/features/auth/api/authApi.ts
import axios from "@/shared/api/axiosInstance";

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
    const res = await axios.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return res.data;
  },
};
