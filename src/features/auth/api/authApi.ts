/** @format */

import axios from "@/shared/api/axiosInstance";
import Cookies from "js-cookie";
import {
  AUTH_COOKIE_NAME,
  AUTH_TOKEN_NAME,
} from "@/shared/config/auth";

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
    try {
      await axios.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
    } finally {
      Cookies.remove(AUTH_COOKIE_NAME);
      Cookies.remove(AUTH_TOKEN_NAME);
    }
  },
};
