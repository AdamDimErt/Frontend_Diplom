/** @format */
// Файл: getColors.ts

import axiosInstance from "@/shared/api/axiosInstance";
import { IColorItem } from "../types/types";

export const getColors = async (): Promise<
  IColorItem[]
> => {
  const { data } = await axiosInstance.get("/colors");

  return data.map((color: any) => ({
    id: color.id,
    code: color.hex,
    label: color.name,
    disabled: false,
  }));
};
