/** @format */

// src/entities/brand/api/brandApi.ts
/** @format */
import axiosInstance from "@/shared/api/axiosInstance";

export interface IBrand {
  id: string;
  name: string;
}

export const getBrands = async (): Promise<IBrand[]> => {
  const { data } = await axiosInstance.get("/brands");
  return data.map((brand: any) => ({
    id: brand.id,
    name: brand.name,
  }));
};
