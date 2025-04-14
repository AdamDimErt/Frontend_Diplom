/** @format */

import axiosInstance from "@/shared/api/axiosInstance";

export const getBrands = async () => {
  const { data } = await axiosInstance.get("/brands");
  return data.map((brand: any) => ({
    id: brand.id,
    name: brand.name,
  }));
};
