/** @format */

// src/entities/favorite/hooks/useFavorite.ts
/** @format */
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  FavoriteItem,
} from "../api/favoriteApi";

export function useFavorite(productId: string) {
  const qc = useQueryClient();

  // 1) Загружаем список избранного
  const favQuery = useQuery<FavoriteItem[]>({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    // enabled: !!userId  — если нужно ждать авторизации
  });

  // 2) Вычисляем, есть ли этот товар в избранном
  const isFavorited =
    favQuery.data?.some(
      (i) => i.product.id === productId,
    ) ?? false;

  // 3) Мутация: добавить
  const add = useMutation({
    mutationFn: () => addToFavorites(productId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["favorites"] }),
  });

  // 4) Мутация: удалить
  const remove = useMutation({
    mutationFn: () => removeFromFavorites(productId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["favorites"] }),
  });

  return {
    isFavorited,
    loading: favQuery.isLoading,
    add,
    remove,
  };
}
