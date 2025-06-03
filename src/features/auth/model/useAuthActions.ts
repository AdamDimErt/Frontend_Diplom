/** @format */

// src/features/auth/model/useAuthActions.ts

"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";

export const useAuthActions = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
  });

  const register = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/");
    },
  });

  const logout = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.push("/login");
    },
  });

  return { login, register, logout };
};
