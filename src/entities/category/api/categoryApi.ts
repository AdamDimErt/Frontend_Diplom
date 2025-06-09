/** @format */
import axiosInstance from "@/shared/api/axiosInstance";

export interface ICategory {
  id: string;
  name: string;
}

export const getCategories = async (): Promise<
  ICategory[]
> => {
  const { data } = await axiosInstance.get("/categories");
  // предполагаем, что бэкенд возвращает массив объектов { id, name, … }
  return data.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
  }));
};
