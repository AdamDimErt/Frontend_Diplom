/** @format */

// src/features/adminProductCreate/hooks/useCreateProduct.ts
"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "@/shared/api/axiosInstance";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<
    any, // ответ сервера
    Error, // тип ошибки
    FormData // входной аргумент
  >({
    mutationFn: (formData: FormData) =>
      axios.post("/products", formData),
    onSuccess: () => {
      toast.success("Продукт успешно создан!");
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (error: Error) => {
      console.error("Ошибка создания продукта:", error);
      toast.error(`Ошибка: ${error.message}`);
    },
  });
}
