/** @format */

// src/features/auth/model/useAuthUser.ts

import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useAuthUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    retry: false,
  });

  return { user, isLoading };
};
