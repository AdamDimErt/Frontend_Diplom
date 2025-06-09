/** @format */
"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/features/auth/api/authApi";
import { AdminSidebar } from "@/features/adminProductCreate/ui/AdminSidebar";

interface IUser {
  id: string;
  email: string;
  role: "ADMIN" | "REGULAR";
}

export default function AdminLayout({
  children,
}: PropsWithChildren) {
  const router = useRouter();
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: () => authApi.me(),
    retry: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (isError) router.replace("/auth/login");
      else if (user?.role !== "ADMIN") alert("asdasd");
    }
  }, [isLoading, isError, user, router]);

  if (isLoading)
    return (
      <p style={{ padding: 20 }}>Проверяем авторизацию…</p>
    );

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main>
    </div>
  );
}
