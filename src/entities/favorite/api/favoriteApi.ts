/** @format */

// src/entities/favorite/api/favoriteApi.ts
/** @format */
import axios from "@/shared/api/axiosInstance";

export interface FavoriteItem {
  id: string;
  product: {
    id: string;
    images: string[];
    translations: { title: string }[];
    priceTenge: number;
  };
}

/** Получить все избранные товары */
export async function getFavorites(): Promise<
  FavoriteItem[]
> {
  const res = await axios.get<FavoriteItem[]>("/favorites");
  return res.data;
}

/** Добавить товар в избранное по его ID */
export async function addToFavorites(
  productId: string,
): Promise<void> {
  await axios.post(`/favorites/products/${productId}`);
}

/** Удалить товар из избранного по его ID */
export async function removeFromFavorites(
  productId: string,
): Promise<void> {
  await axios.delete(`/favorites/products/${productId}`);
}
